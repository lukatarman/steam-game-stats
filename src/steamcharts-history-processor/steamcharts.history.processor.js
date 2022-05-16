import { parsePlayerHistory } from "./services/player.history.service.js";
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
      const gamesWithoutPlayerHistory = await this.#databaseClient.getxGamesWithoutPlayerHistory(this.#options.batchSize);
      if(!gamesWithoutPlayerHistory) continueLoop = false;

      const games = this.#collectPlayerHistory(gamesWithoutPlayerHistory);

      this.#persist(games);
    }
    await delay(this.#options.batchDelay);
  }

  #collectPlayerHistory(gamesWithoutPlayerHistory) {
    const games = [...gamesWithoutPlayerHistory];

    games.forEach(async (game) => {
      const pageHttpDetails = await this.#steamClient.getAppHttpDetailsSteamcharts(game);

      game.playerHistory = parsePlayerHistory(pageHttpDetails.data);

      await delay(this.#options.unitDelay);
    })

    return games;
  }

  #persist(games) {
    games.forEach((game) => {
      this.#databaseClient.updatePlayerHistoryById(game);
    })
  }
}