import { filterSteamAppsByName, steamAppIsGame } from "./steam.app.utils.js";
import { Game } from "../models/game.js";

export class SteamGameListProcessor {
  #steamClient;
  #databaseClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  run() {
    while(true) {
      const steamApps = await this.#databaseClient.getXunidentifiedSteamApps(10);
      if(steamApps.length === 0) {
        // todo: implement delayHours()
        await delayHours(24);
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
    }

    return games;
  }
}
