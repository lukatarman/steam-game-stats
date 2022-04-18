import { filterSteamAppsByName, steamAppIsGame } from "./services/game.service.js";
import { Game } from "../models/game.js";
import { delay } from "../shared/time.utils.js";

export class SteamGameListProcessor {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
    this.#options = options;
  }

  run() {
    while(true) {
      const steamApps = await this.#databaseClient.getXunidentifiedSteamApps(this.#options.batchSize);
      if(steamApps.length === 0) {
        await delay(this.#options.batchDelay);
        continue;
      }

      await this.#identifyGames(steamApps);
    }
  }

  async #identifyGames(steamApps) {
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    
    const games = this.#filterSteamAppsByAppType(filteredSteamApps);
    if(games.length !== 0) {
      this.#databaseClient.insertMany("games", games);
    }

    steamApps.forEach(steamApp => this.#databaseClient.identifySteamAppById(steamApp.appid));
  }

  async #filterSteamAppsByAppType(steamApps) {
    const games = [];

    if(steamApps.length === 0) return games;

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

      await delay(this.#options.unitDelay);
    }

    return games;
  }
}
