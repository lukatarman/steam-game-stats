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
    while(true) {
      const games = await this.#databaseClient.getXidentifiedGamesNoSteamchartsPlayerHistory(this.#options.batchSize);

      if(!games) break;

      for(let game of games) {
        const pageHttpDetails = await this.#steamClient.game.getAppHttpDetailsSteamcharts(game);

        const gamePlayerHistories = parsePlayerHistory(pageHttpDetails);

        game.playerHistory = gamePlayerHistories;

        this.#databaseClient.addSteamchartsPlayerHistoryById(game.id);

        delay(this.#options.unitDelay);
      }
    }
    delay(this.#options.batchDelay);
  }
}