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

      await this.#identifyGames(steamApps);
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

    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, discoveredGamePages] = discoverGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);

    games.push(...(await this.#discoverGamesFromSteamchartsHtmlDetailsPages(steamApps, discoveredGamePages)));

    return games;
  }

  async #getSteamAppsHtmlDetailsPages(steamApps) {
    const detailsPages = [];
    for(let i = 0; i < steamApps.length; i++) {
      detailsPages.push(
        await this.#steamClient.getSteamAppHtmlDetailsPage(steamApps[i].appid)
      );
      await delay(this.#options.unitDelay);
    }
    return detailsPages;
  }

  async #discoverGamesFromSteamchartsHtmlDetailsPages(steamApps, discoveredGamePages) {
    return (await Promise.all(steamApps.map(async (steamApp, index) => {
      if (discoveredGamePages[index] === 'discovered') return;

      await delay(this.#options.unitDelay);

      try {
        await this.#steamClient.getSteamAppHtmlDetailsPageFromSteamcharts(steamApps[index].appid);
        return new Game(steamApp);
      } catch (error) {
        /**
         * @TODO - currently the steamApp will wrongfully be marked as not a game, if steam needs an age verification before
         * showing the game info, AND there is an unexpected problem with steamcharts (either steamcharts if offline, or
         * the game just got released. Try to find a solution to this eventually.)
         * https://github.com/lukatarman/steam-game-stats/issues/31
         */
        if (error.status !== 500 && error.status !== 404) return;
      }
    }))).filter(games => !!games);
  }
}

