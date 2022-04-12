import {
  filterSteamAppsByName,
  steamAppIsAgameMOCK,
} from "./steam.app.utils.js";
import { Game } from "../models/game.js";

export class SteamGameListProcessor {
  #steamClient;
  #databaseClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  async addGamesToCollection() {
    this.#getAllSteamApps();
    this.#identifyGames();
  }

  async #getAllSteamApps() {
    const steamApps = await this.#steamClient.getAppList();
    await this.#databaseClient.insertMany("steam_apps", steamApps);
  }

  async #identifyGames() {
    const steamApps = await this.#databaseClient.getAll("steam_apps");
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    const games = this.#filterSteamAppsByAppType(filteredSteamApps);

    this.#databaseClient.insertMany("games", games);
  }

  async #filterSteamAppsByAppType(steamApps) {
    const games = [];

    for (steamApp in steamApps) {
      const steamAppDetailPageAsString = this.#steamClient.getAppDetailsPage(
        steamApp.appid
      );

      if (steamAppIsAgameMOCK(steamAppDetailPageAsString)) games.push(new Game(steamApp));
    }

    return games;
  }
}
