import { parsePlayerHistory } from "./services/player.history.service.js";
import { delay } from "../shared/time.utils.js";

export class PlayerHistoryAggregator {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
    this.#options = options;
  }

  async run() {
    this.#addSteamchartsPlayerHistory();

    this.#addCurrentPlayers();
  }

  async #addSteamchartsPlayerHistory() {
    const gamesWithoutPlayerHistories = await this.#databaseClient.getXgamesWithoutPlayerHistory(this.#options.batchSize);
    if(gamesWithoutPlayerHistories.length === 0) {
      await delay(this.#options.batchDelay)
      return;
    }

    const steamChartsHtmlDetailsPages = await this.#getGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistories);

    const games = this.#addPlayerHistories(steamChartsHtmlDetailsPages, gamesWithoutPlayerHistories);

    await this.#persist(games);
  }

  async #getGameHtmlDetailsPagesFromSteamcharts(games) {
    const pages = [];
    for (let i = 0; i < games.length; i++) {
      await delay(this.#options.unitDelay);

      try{
        pages.push(
          await this.#steamClient.getSteamchartsGameHtmlDetailsPage(games[i].id)
        );
      } catch(error) {
        if (error.status !== 500 && error.status !== 404) pages.push("");
      }
    }
    return pages;
  }

  #addPlayerHistories(pages, games) {
    return games.map((game, i) => {
      if(pages[i] !== "") game.playerHistory = parsePlayerHistory(pages[i]);
      game.checkedSteamchartsHistory = true;

      return game;
    });
  }

  async #persist(games) {
    games.forEach(game => this.#databaseClient.updatePlayerHistoryById(game));
  }

  async #addCurrentPlayers() {
    const games = await this.#databaseClient.getXgamesWithCheckedSteamchartsHistory(this.#options.batchSize);

    const players = this.#steamClient.getAllCurrentPlayersConcurrently(games);

    const gamesWithCurrentPlayers = this.#addCurrentPlayersToEachGame(players, games);

    await this.#databaseClient.updatePlayerHistoryById(gamesWithCurrentPlayers);
  }

  async #addCurrentPlayersToEachGame(players, games) {
    return games.map((game, i) => {
      game.playerHistory.date = new Date();
      game.playerHistory.players = players[i];
      return game;
    });
  }
}