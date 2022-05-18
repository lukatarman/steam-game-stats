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
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    if (!lastUpdate) {
      await delay(this.#options.batchDelay);
      return;
    }

    this.#identifyGames(steamApps);
    
    await delay(this.#options.batchDelay);
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

    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, discoveredGamePages] = discoverGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);

    games.push(...(await this.#discoverGamesFromSteamchartsHtmlDetailsPages(steamApps, discoveredGamePages)));

    return games;
  }

  async #getSteamAppsHtmlDetailsPages(steamApps) {
    return (await Promise.all(steamApps.map(async (steamApp) => {

      await delay(this.#options.unitDelay);
      
      return this.#steamClient.getSteamAppHtmlDetailsPage(steamApp.appid);
    }))).map(response => response.data);
  }

  async #discoverGamesFromSteamchartsHtmlDetailsPages(steamApps, discoveredGamePages) {
    
    return (await Promise.all(steamApps.map(async (steamApp, index) => {
      if (discoveredGamePages[index] === 'discovered') return;

      await delay(this.#options.unitDelay);

      try {
        await this.#steamClient.getSteamAppHtmlDetailsPageFromSteamcharts(steamApps[index].appid);
        return new Game(steamApp);
      } catch (error) {
        // TODO: think about returning undefined here - could be changed
        // potential idea: if steamcharts returns error try other API to check for game
        if (error.status !== 500 && error.status !== 404) return;
      }
    }))).filter(games => !!games);
  }
}

