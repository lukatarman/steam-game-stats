import {
  addCurrentPlayersFromSteam,
  addPlayerHistoriesFromSteamcharts,
} from "./services/player.history.service.js";
import { delay } from "../../utils/time.utils.js";
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

  addPlayerHistoryFromSteamcharts = async () => {
    const uncheckedGames = await this.#databaseClient.getXgamesWithUncheckedPlayerHistory(
      this.#options.batchSize,
    );
    if (uncheckedGames.length === 0) return;

    const gamesPagesMap = await this.#getGameHtmlDetailsPagesFromSteamcharts(
      uncheckedGames,
    );

    const historyChecks = HistoryCheck.manyFromSteamchartsPages(gamesPagesMap);
    await this.#databaseClient.updateHistoryChecks(historyChecks);

    const games = addPlayerHistoriesFromSteamcharts(gamesPagesMap);
    await this.#databaseClient.updatePlayerHistoriesById(games);
  };

  async #getGameHtmlDetailsPagesFromSteamcharts(games) {
    const gamesPagesMap = new Map();

    for (let game of games) {
      await delay(this.#options.unitDelay);

      try {
        const page = await this.#steamClient.getSteamchartsGameHtmlDetailsPage(game.id);
        gamesPagesMap.set(game, page);
      } catch (error) {
        gamesPagesMap.set(game, "");
      }
    }

    return gamesPagesMap;
  }

  addCurrentPlayers = async () => {
    const games = await this.#databaseClient.getXgamesCheckedMoreThanYmsAgo(
      this.#options.batchSize,
      this.#options.currentPlayersUpdateIntervalDelay,
    );

    if (games.length === 0) return;

    const players = await this.#steamClient.getAllCurrentPlayersConcurrently(games);

    const gamesWithCurrentPlayers = addCurrentPlayersFromSteam(players, games);

    await this.#databaseClient.updatePlayerHistoriesById(gamesWithCurrentPlayers);
  };
}
