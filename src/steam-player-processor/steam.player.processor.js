import { getCurrentPlayers } from "./current.players.receive.utils";
import { addCurrentPlayersToGames } from "./current.players.updater";
import { parsePlayerHistory } from "./services/player.history.service";
import { delay } from "../shared/time.utils.js";

export class SteamPlayerProcessor {
  #steamClient;
  #databaseClient;

  constructor(steamClient, databaseClient, options) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
    this.#options = options;
  }

  run() {
    this.#addSteamchartsPlayerHistory();
    this.#addCurrentPlayerCounts();
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

  async #addCurrentPlayerCounts() {
    const gamesNoPlayers = await this.#databaseClient.getAll("games");
    const currentPlayers = getCurrentPlayers(gamesNoPlayers, this.#steamClient);
    const games = addCurrentPlayersToGames(gamesNoPlayers, currentPlayers);
    this.#databaseClient.insertMany("games", games);
  }

  //
}
