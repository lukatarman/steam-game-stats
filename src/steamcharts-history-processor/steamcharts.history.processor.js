import { parsePlayerHistory } from "./services/player.history.service";
import { delay } from "../shared/time.utils.js";

export class SteamchartsHistoryProcessor {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
    this.#options = options;
  }

  run() {
    this.#addSteamchartsPlayerHistory();
  }

  async #addSteamchartsPlayerHistory() {
    let breakCondition = true;

    while(breakCondition) {
      const gamesWithoutPlayerHistory = await this.#databaseClient.getXidentifiedGamesNoSteamchartsPlayerHistory(this.#options.batchSize);
      if(!gamesWithoutPlayerHistory) breakCondition = false;

      const games = this.#processData(gamesWithoutPlayerHistory);

      games.forEach(game => this.#databaseClient.updatePlayerHistoryById(game.id))
    }
    delay(this.#options.batchDelay);
  }

  #processData(gamesWithoutPlayerHistory) {
    let games = [];
    for(let game of gamesWithoutPlayerHistory) {
      const pageHttpDetails = await this.#steamClient.getAppHttpDetailsSteamcharts(game);

      const playerHistory = parsePlayerHistory(pageHttpDetails.data);

      game.playerHistory = playerHistory;

      games.push(game);

      delay(this.#options.unitDelay);
    }
    return games;
  }
}