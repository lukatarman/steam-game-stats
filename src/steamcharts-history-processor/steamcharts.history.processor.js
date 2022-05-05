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
    let continueLoop = true;

    while(continueLoop) {
      const gamesWithoutPlayerHistory = await this.#databaseClient.getXgamesWithoutPlayerHistory(this.#options.batchSize);
      if(!gamesWithoutPlayerHistory) continueLoop = false;

      const games = this.#collectPlayerHistory(gamesWithoutPlayerHistory);

      this.#persist(games);
    }
    delay(this.#options.batchDelay);
  }

  #collectPlayerHistory(gamesWithoutPlayerHistory) {
    const games = [...gamesWithoutPlayerHistory];

    games.forEach((game) => {
      const pageHttpDetails = await this.#steamClient.getAppHttpDetailsSteamcharts(game);

      const playerHistory = parsePlayerHistory(pageHttpDetails.data);

      game.playerHistory = playerHistory;

      delay(this.#options.unitDelay);
    })

    return games;
  }

  #persist(games) {
    games.forEach((game) => {
      this.#databaseClient.updatePlayerHistoryById(game);
    })
  }
}