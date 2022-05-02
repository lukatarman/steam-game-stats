import {
  filterSteamAppsByName,
  steamAppIsGame,
} from "./services/game.service.js";
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

  async run() {
    while (true) {
      const steamApps = await this.#databaseClient.getXunidentifiedSteamApps(
        this.#options.batchSize
      );
      if (steamApps.length === 0) {
        await delay(this.#options.noAppsFoundDelay);
        continue;
      }

      await this.#identifyGames(steamApps);
      await delay(this.#options.batchDelay);
    }
  }

  async #identifyGames(steamApps) {
    const filteredSteamApps = filterSteamAppsByName(steamApps);

    const games = this.#filterSteamAppsByAppType(filteredSteamApps);
    if (games.length !== 0) {
      this.#databaseClient.insertMany("games", games);
    }

    steamApps.forEach((steamApp) =>
      this.#databaseClient.identifySteamAppById(steamApp.appid)
    );
  }

  async #filterSteamAppsByAppType(steamApps) {
    if (steamApps.length === 0) return [];

    const httpDetailsPages = this.#getHttpDetailsPages(steamApps);

    const games = this.#addIdentifiedGamesToList(steamApps, httpDetailsPages);

    await delay(this.#options.unitDelay);

    return games;
  }

  async #getHttpDetailsPages(steamApps) {
    const httpDetailsPages = [];
    for (let steamApp in steamApps) {
      httpDetailsPages.push(
        await this.#steamClient.getAppHttpDetailsSteam(steamApp)
      );
      await delay(this.#options.unitDelay);
    }

    return httpDetailsPages;
  }

  #addIdentifiedGamesToList(steamApps, httpDetailsPages) {
    const games = [];

    for (let i = 0; i < steamApps.length; i++) {
      if (steamAppIsGame(httpDetailsPages[i])) {
        games.push(new Game(steamApps[i]));
        continue;
      }

      try {
        await this.#steamClient.getAppHttpDetailsSteamcharts(steamApps[i]);
      } catch (error) {
        if (error.status === 500) continue;
        throw error;
      }
      games.push(new Game(steamApp));
    }

    return games;
  }
}
