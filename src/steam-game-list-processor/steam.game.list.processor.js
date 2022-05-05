import {
  filterSteamAppsByName,
  identifyGamesFromSteamHtmlDetailsPages,
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

  run() {
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

  #identifyGames(steamApps) {
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    if (filteredSteamApps.length === 0) {
      steamApps.forEach((steamApp) =>
        this.#databaseClient.identifySteamAppById(steamApp.appid)
      );
      return;
    }

    const games = this.#filterSteamAppsByAppType(filteredSteamApps);
    if (games.length !== 0) {
      this.#databaseClient.insertMany("games", games);
    }

    steamApps.forEach((steamApp) =>
      this.#databaseClient.identifySteamAppById(steamApp.appid)
    );
  }

  #filterSteamAppsByAppType(steamApps) {
    const htmlDetailsPages = this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, identifiedGamePages] = identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);

    games.push(...this.#identifyGamesFromSteamchartsHtmlDetailsPages(steamApps, identifiedGamePages));

    return games;
  }

  #getSteamAppsHtmlDetailsPages(steamApps) {
    return steamApps.map(async (steamApp) => {
      await delay(this.#options.unitDelay);
      return await this.#steamClient.getSteamAppHtmlDetailsPage(steamApp);
    });
  }

  #identifyGamesFromSteamchartsHtmlDetailsPages(steamApps, identifiedGamePages) {
    return steamApps.map(async (steamApp, index) => {
      if (identifiedGamePages[index] === 'identified') return;

      await delay(this.#options.unitDelay);

      try {
        await this.#steamClient.getAppHttpDetailsSteamcharts(steamApps[i]);
        return new Game(steamApp);
      } catch (error) {
        if (error.status !== 500) throw error;
      }
    }).filter(game => !!game);
  }
}
