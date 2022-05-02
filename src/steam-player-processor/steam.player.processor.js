import { getCurrentPlayers } from "./current.players.receive.utils";
import { addCurrentPlayersToGames } from "./current.players.updater";

export class SteamPlayerProcessor {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
    this.#options = options;
  }

  run() {
    this.#addCurrentPlayerCounts();
  }

  async #addCurrentPlayerCounts() {
    const gamesNoPlayers = await this.#databaseClient.getAll("games");
    const currentPlayers = getCurrentPlayers(gamesNoPlayers, this.#steamClient);
    const games = addCurrentPlayersToGames(gamesNoPlayers, currentPlayers);
    this.#databaseClient.insertMany("games", games);
  }

  //
}
