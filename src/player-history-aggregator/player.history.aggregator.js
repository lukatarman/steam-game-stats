import { addPlayerHistories } from "./services/player.history.service.js";
import { delay, moreThanXhoursPassedSince } from "../shared/time.utils.js";
import { Players } from "../models/players.js";

export class PlayerHistoryAggregator {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
    this.#options = options;
  }

  async addPlayerHistoryFromSteamcharts() {
    const gamesWithoutPlayerHistories = await this.#databaseClient.getXgamesWithoutPlayerHistory(this.#options.batchSize);
    if(gamesWithoutPlayerHistories.length === 0) {
      await delay(this.#options.batchDelay);
      return;
    }

    const steamChartsHtmlDetailsPages = await this.#getGameHtmlDetailsPagesFromSteamcharts(gamesWithoutPlayerHistories);

    const games = addPlayerHistories(steamChartsHtmlDetailsPages, gamesWithoutPlayerHistories);

    await this.#persist(games);
  }

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

  async #persist(games) {
    games.forEach(game => this.#databaseClient.updatePlayerHistoryById(game));
  }

  async addCurrentPlayers() {
    const games = await this.#databaseClient.XXXgetXgamesWithCheckedSteamchartsHistory(this.#options.batchSize);

    if(!moreThanXhoursPassedSince(this.#options.currentPlayersUpdateIntervalDelay, games[0].lastUpdate)) return;

    const players = await this.#steamClient.getAllCurrentPlayersConcurrently(games);

    const gamesWithCurrentPlayers = this.#addCurrentPlayersToEachGame(players, games);

    await this.#persist(gamesWithCurrentPlayers);
  }

  #addCurrentPlayersToEachGame(players, games) {
    return games.map((game, i) => {
      game.playerHistory.push(new Players(players[i]));
      return game;
    });
  }
}