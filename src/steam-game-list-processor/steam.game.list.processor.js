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

  async #filterSteamAppsByAppTypeXXX(steamApps) {
    if (steamApps.length === 0) return [];

    const htmlDetailsPages = this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, identifiedPages] = this.#identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);

    games.push(...this.#identifyGamesFromSteamchartsHtmlDetailsPages(steamApps, identifiedPages));

    return games;
  }

  #getSteamAppsHtmlDetailsPages(steamApps) {
    return steamApps.map(async (steamApp) => {
      await delay(this.#options.unitDelay);
      return await this.#steamClient.getAppHttpDetailsSteam(steamApp);
    });
  }

  #identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages) {
    const games = [];
    const identifiedPages = [...htmlDetailsPages];

    for (let i = 0; i < steamApps.length; i++) {
      if (steamAppIsGame(htmlDetailsPages[i])) {
        games.push(new Game(steamApps[i]));
        identifiedPages[i] = 'identified';
      }
    }

    return [games, identifiedPages];
  }

  #identifyGamesFromSteamchartsHtmlDetailsPages(steamApps, identifiedPages) {
    const games = [];

    for (let i = 0; i < steamApps.length; i++) {
      if (identifiedPages[i] === 'identified') {
        continue;
      }

      try {
        await this.#steamClient.getAppHttpDetailsSteamcharts(steamApps[i]);
      } catch (error) {
        if (error.status === 500) continue;
        throw error;
      }
      games.push(new Game(steamApp));

      await delay(this.#options.unitDelay);
    }

    return games;
  }
}
