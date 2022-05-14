import {
  filterSteamAppsByName,
  discoverGamesFromSteamHtmlDetailsPages,
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
      const steamApps = await this.#databaseClient.getXunidentifiedSteamApps(this.#options.batchSize);
      if (steamApps.length === 0) {
        await delay(this.#options.noAppsFoundDelay);
        continue;
      }

      this.#identifyGames(steamApps);
      await delay(this.#options.batchDelay);
    }
  }

  async #identifyGames(steamApps) {
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    if (filteredSteamApps.length === 0) {
      steamApps.forEach((steamApp) =>
        this.#databaseClient.identifySteamAppById(steamApp.appid)
      );
      return;
    }

    const games = await this.#filterSteamAppsByAppType(filteredSteamApps);
    if (games.length !== 0) {
      this.#databaseClient.insertMany("games", games);
    }

    steamApps.forEach((steamApp) =>
      this.#databaseClient.identifySteamAppById(steamApp.appid)
    );
  }

  async #filterSteamAppsByAppType(steamApps) {
    //TODO: this is being returned as an array of unresolved promises - needs fixing
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, discoveredGamePages] = discoverGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);

    games.push(...this.#discoverGamesFromSteamchartsHtmlDetailsPages(steamApps, discoveredGamePages));

    return games;
  }

  async #getSteamAppsHtmlDetailsPages(steamApps) {
    return Promise.all(steamApps.map(async (steamApp) => {
      await delay(this.#options.unitDelay);
      return this.#steamClient.getSteamAppHtmlDetailsPage(steamApp.appid);
    }));
  }

  #discoverGamesFromSteamchartsHtmlDetailsPages(steamApps, discoveredGamePages) {
    return steamApps.map(async (steamApp, index) => {
      if (discoveredGamePages[index] === 'discovered') return;

      await delay(this.#options.unitDelay);

      try {
        await this.#steamClient.getSteamAppHtmlDetailsPageFromSteamcharts(steamApps[index].appid);
        return new Game(steamApp);
      } catch (error) {
        if (error.status !== 500) throw error;
      }
    }).filter(game => !!game);
  }
}
