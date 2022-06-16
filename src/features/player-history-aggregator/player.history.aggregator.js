import {
  addCurrentPlayersFromSteam,
  addPlayerHistoriesFromSteamcharts
} from "./services/player.history.service.js";
import { delay } from "../../shared/time.utils.js";
import { HistoryCheck } from "../../models/history.check.js";

export class PlayerHistoryAggregator {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
    this.#options = options;
  }

  /**
   * - we want to decouple the player history in the game class from the knowledge that we have performed a check on steamcharts and
   *   found(or not) a player history
   * - the game class should keep information about the game and not information about where it got its data from - the latter is a seperate
   *   concern
   * - keeping the check on the game class brings no additional value to if from the standpoint of the user, it is only usefull for the
   *   application so it can perform the player history collection operatons correctly
   * - for every game, we store in a seperate collection if we checked the player history in a specific source(steamcharts in that case) and
   *   if we found something
   * - for this we use the HistoryCheck class
   * - we record the steamcharts history checks after we got all the steamcharts details pages
   * - we persist the checks in a separate collection as mentioned above and use it later in XXXaddCurrentPlayers
   */
  async addPlayerHistoryFromSteamcharts() {
    const uncheckedGames = await this.#databaseClient.getXgamesWithUncheckedPlayerHistory(this.#options.batchSize);
    if(uncheckedGames.length === 0) {
      await delay(this.#options.batchDelay);
      return;
    }

    const gamesPagesMap = await this.#getGameHtmlDetailsPagesFromSteamcharts(uncheckedGames);

    const historyChecks = HistoryCheck.manyFromSteamchartsPages(gamesPagesMap);
    await this.#databaseClient.updateHistoryChecks(historyChecks);

    const games = addPlayerHistoriesFromSteamcharts(gamesPagesMap);
    await this.#databaseClient.updatePlayerHistoriesById(games);
  }

  async #getGameHtmlDetailsPagesFromSteamcharts(games) {
    const gamesPagesMap = new Map();

    for (let i = 0; i < games.length; i++) {
      await delay(this.#options.unitDelay);

      try {
        const page = await this.#steamClient.getSteamchartsGameHtmlDetailsPage(games[i].id);
        gamesPagesMap.set(games[i], page);
      } catch(error) {
        gamesPagesMap.set(games[i], "");
      }
    }

    return gamesPagesMap;
  }

  async addCurrentPlayers() {
    const games = await this.#databaseClient.getXgamesCheckedMoreThanYmsAgo(
      this.#options.batchSize,
      this.#options.currentPlayersUpdateIntervalDelay,
    );

    if (games.length === 0) return;

    const players = await this.#steamClient.getAllCurrentPlayersConcurrently(games);

    const gamesWithCurrentPlayers = addCurrentPlayersFromSteam(players, games);

    await this.#databaseClient.updatePlayerHistoriesById(gamesWithCurrentPlayers);
  }
}
