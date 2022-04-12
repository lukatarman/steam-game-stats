import { getCurrentPlayers } from "./current.players.receive.utils";
import { addCurrentPlayersToGames } from "./current.players.updater";

export class SteamPlayerProcessor {
  #steamClient;
  #databaseClient;

  constructor(steamClient, databaseClient) {
    this.#databaseClient = databaseClient;
    this.#steamClient = steamClient;
  }

  addPlayerCounts() {
    this.#addPreviousPlayerCountsMOCK();
    this.#addCurrentPlayerCounts;
  }

  #addpreviousPlayerCountsMOCK() {
    console.log("use crawler");
  }

  async #addCurrentPlayerCounts() {
    const gamesNoPlayers = await this.#databaseClient.getAll("games");
    const currentPlayers = getCurrentPlayers(gamesNoPlayers, this.#steamClient);
    const games = addCurrentPlayersToGames(gamesNoPlayers, currentPlayers);
    this.#databaseClient.insertMany("games", games);
  }

  //
}
