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
    await this.#addSteamchartsPlayerHistory();

    await delay(this.#options.batchDelay);
  }

  async #addSteamchartsPlayerHistory() {
    const gamesWithoutPlayerHistories = await this.#databaseClient.getxGamesWithoutPlayerHistory(this.#options.batchSize);
    if(gamesWithoutPlayerHistories.length === 0) {
      await delay(this.#options.batchDelay)
      return;
    }

    const steamChartsHtmlDetailsPages = await this.#getGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistories);

    const games = this.#addPlayerHistories(steamChartsHtmlDetailsPages, gamesWithoutPlayerHistories);

    await this.#persist(games);
  }

  async #getGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistory) {
    return (await Promise.all(gamesWithoutPlayerHistory.map(async game => {

      await delay(this.#options.unitDelay);

      try{
        return await this.#steamClient.getGameHtmlDetailsPageFromSteamcharts(game.id)
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

  async #persist(games) {
    games.forEach((game) => {
      this.#databaseClient.updatePlayerHistoryById(game);
    })
  }
}