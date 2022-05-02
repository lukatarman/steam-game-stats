import { getCurrentPlayers } from "./current.players.receive.utils";
import { addCurrentPlayersToGames } from "./current.players.updater";

export class SteamPlayerProcessor {
  #steamClient;
  #databaseClient;

  constructor(steamClient, databaseClient, options) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
    this.#options = options;
  }

  run() {
    this.#addSteamchartsPlayerInfo();
    this.#addCurrentPlayerCounts;
  }

  async #addSteamchartsPlayerInfo() {
    const games = await this.#databaseClient.getXidentifiedGames(this.#options.batchSize);

    while(games) {
      
    }
  }

  async #addCurrentPlayerCounts() {
    const gamesNoPlayers = await this.#databaseClient.getAll("games");
    const currentPlayers = getCurrentPlayers(gamesNoPlayers, this.#steamClient);
    const games = addCurrentPlayersToGames(gamesNoPlayers, currentPlayers);
    this.#databaseClient.insertMany("games", games);
  }

  //
}
