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
    let continueCondition = true;

    while(continueCondition) {
      const gamesWithoutPlayerHistory = await this.#databaseClient.getXgamesWithoutPlayerHistory(this.#options.batchSize);
      if(!gamesWithoutPlayerHistory) continueCondition = false;

      const [games, playerHistories] = this.#processData(gamesWithoutPlayerHistory);

      this.#addToDatabase(games, playerHistories);
    }
    delay(this.#options.batchDelay);
  }

  #processData(gamesWithoutPlayerHistory) {
    let games = [];
    let playerHistories = [];
    
    for(let game of gamesWithoutPlayerHistory) {
      const pageHttpDetails = await this.#steamClient.getAppHttpDetailsSteamcharts(game);

      const playerHistory = parsePlayerHistory(pageHttpDetails.data);

      playerHistories.push(playerHistory);

      delay(this.#options.unitDelay);
    }
    return [games, playerHistories];
  }

  #addToDatabase(games, playerHistories) {
    games.forEach((game, index) => {
      this.#databaseClient.updatePlayerHistoryById(game.id, playerHistories[index]);
    })
  }
}