import { filterSteamAppsByName, steamAppIsGame } from "./steam.app.utils.js";
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

  // feature/NR-1 - Add bulk identification
  // get 10 not identified games
  // handle case if filteredSteamApps is empty
  // handle if games is empty
  // update steamApps elements identified property with true
  // as last store the steamApps as identified: true
  async #identifyGames() {
    const steamApps = await this.#databaseClient.getAll("steam_apps");
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    const games = this.#filterSteamAppsByAppType(filteredSteamApps);

    this.#databaseClient.insertMany("games", games);
  }

  async #filterSteamAppsByAppType(steamApps) {
    const games = [];

    for (let steamApp in steamApps) {
      const detailsPage = await this.#steamClient.getAppDetailsPage(steamApp);

      if (steamAppIsGame(detailsPage)) {
        games.push(new Game(steamApp));
        continue;
      }

      try {
        await this.#steamClient.getAppDetailsSteamcharts(steamApp);
      } catch (error) {
        if (error.status === 500) continue;
      }

      games.push(new Game(steamApp));
    }

    return games;
  }
}
