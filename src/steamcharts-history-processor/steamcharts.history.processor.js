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
      const gamesNoSteamchartsPlayerHistory = await this.#databaseClient.getXidentifiedGamesNoSteamchartsPlayerHistory(this.#options.batchSize);
      if(!gamesNoSteamchartsPlayerHistory) breakCondition = false;

      const games = this.#processData(gamesNoSteamchartsPlayerHistory);

      games.forEach(game => this.#databaseClient.updatePlayerHistoryById(game.id))
    }
    delay(this.#options.batchDelay);
  }

  #processData(gamesNoSteamchartsPlayerHistory) {
    let games = [];
    for(let game of gamesNoSteamchartsPlayerHistory) {
      const pageHttpDetails = await this.#steamClient.getAppHttpDetailsSteamcharts(game);

      const gamePlayerHistories = parsePlayerHistory(pageHttpDetails.data);

      game.playerHistory = gamePlayerHistories;

      games.push(game);

      delay(this.#options.unitDelay);
    }
    return games;
  }
}