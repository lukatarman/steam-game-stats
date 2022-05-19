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
      const gamesWithoutPlayerHistories = await this.#databaseClient.getXgamesWithoutPlayerHistory(this.#options.batchSize);
      if(!gamesWithoutPlayerHistories) continueLoop = false;

      const steamChartsHtmlDetailsPages = await this.#getGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistories);

      const games = this.#addPlayerHistories(steamChartsHtmlDetailsPages, gamesWithoutPlayerHistories);

      this.#persist(games);
    }
    await delay(this.#options.batchDelay);
  }

  async #getGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistory) {
    return (await Promise.all(gamesWithoutPlayerHistory.map(async game => {

      await delay(this.#options.unitDelay);

      try{
        return await this.#steamClient.getSteamchartsGameHtmlDetailsPage(game.id)
      } catch(error) {
        if (error.status !== 500 && error.status !== 404) return { data: undefined};
      }
    }))).map(game => game.data);
  }

  #addPlayerHistories(steamChartsHtmlDetailsPages, gamesWithoutPlayerHistory) {
    return gamesWithoutPlayerHistory.map((game, i) => {
      game.playerHistory = parsePlayerHistory(steamChartsHtmlDetailsPages[i]);
      return game;
    })

  }

  #persist(games) {
    games.forEach((game) => {
      this.#databaseClient.updatePlayerHistoryById(game);
    })
  }
}