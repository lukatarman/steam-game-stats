import { addCurrentPlayersFromSteam, addPlayerHistoriesFromSteamcharts, recordSteamchartPlayerHisotryCheck, XXXaddPlayerHistoriesFromSteamcharts } from "./services/player.history.service.js";
import { delay, moreThanXhoursPassedSince } from "../shared/time.utils.js";

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
   * @deprecated
   */
  async addPlayerHistoryFromSteamcharts() {
    const gamesWithoutPlayerHistories = await this.#databaseClient.getXgamesWithoutPlayerHistory(this.#options.batchSize);
    if(gamesWithoutPlayerHistories.length === 0) {
      await delay(this.#options.batchDelay);
      return;
    }

    const steamChartsHtmlDetailsPages = await this.#getGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistories);

    const games = addPlayerHistoriesFromSteamcharts(steamChartsHtmlDetailsPages, gamesWithoutPlayerHistories);

    await this.#persistGames(games);
  }

  /**
   * @deprecated
   */
   async #getGameHtmlDetailsPagesFromSteamcharts(games) {
    const pages = [];
    for (let i = 0; i < games.length; i++) {
      await delay(this.#options.unitDelay);

      try {
        pages.push(
          await this.#steamClient.getSteamchartsGameHtmlDetailsPage(games[i].id)
        );
      } catch(error) {
        pages.push("");
      }
    }
    return pages;
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
  async XXXaddPlayerHistoryFromSteamcharts() {
    const gamesWithoutPlayerHistories = await this.#databaseClient.getXgamesWithoutPlayerHistory(this.#options.batchSize);
    if(gamesWithoutPlayerHistories.length === 0) {
      await delay(this.#options.batchDelay);
      return;
    }

    const gamesPagesMap = await this.#XXXgetGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistories);

    const historyChecks = recordSteamchartPlayerHisotryCheck(gamesPagesMap);
    await this.#persistHistoryChecks(historyChecks);

    const games = XXXaddPlayerHistoriesFromSteamcharts(gamesPagesMap);
    await this.#persistGames(games);
  }

  async #XXXgetGameHtmlDetailsPagesFromSteamcharts(games) {
    const gamesPagesMap = new Map();

    for (let i = 0; i < games.length; i++) {
      await delay(this.#options.unitDelay);

      try {
        const page = await this.#steamClient.getSteamchartsGameHtmlDetailsPage(games[i].id);
        gamesPagesMap.set(game[i], page);
      } catch(error) {
        gamesPagesMap.set(game[i], "");
      }
    }

    return gamesPagesMap;
  }

  async #persistHistoryChecks(historyChecks) {
    await Promise.all(
      historyChecks.forEach(
        historyCheck => this.#databaseClient.insertManyHistoryChecks(historyCheck)
      )
    );
  }

  async #persistGames(games) {
    await Promise.all(
      games.forEach(
        game => this.#databaseClient.updatePlayerHistoryById(game)
      )
    );
  }

  async addCurrentPlayers() {
    const games = await this.#databaseClient.XXXXXXgetXgamesWithCheckedSteamchartsHistory(this.#options.batchSize);

    if(lessThanXhoursPassedSinceTheLastUpdate()) return;

    const players = await this.#steamClient.getAllCurrentPlayersConcurrently(games);

    const gamesWithCurrentPlayers = addCurrentPlayersFromSteam(players, games);

    await this.#persistGames(gamesWithCurrentPlayers);

    function lessThanXhoursPassedSinceTheLastUpdate() {
      return !moreThanXhoursPassedSince(this.#options.currentPlayersUpdateIntervalDelay, games[0].lastUpdate);
    }
  }
}