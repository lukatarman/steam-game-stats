import {
  filterSteamAppsByName,
  discoverGamesFromSteamHtmlDetailsPages,
} from "./services/game.service.js";
import { Game } from "../../models/game.js";
import { delay } from "../../utils/time.utils.js";
import { HistoryCheck } from "../../models/history.check.js";

export class GameIdentifier {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
    this.#options = options;
  }

  async run() {
    const steamApps = await this.#databaseClient.getXunidentifiedSteamApps(this.#options.batchSize);
    if (steamApps.length === 0) {
      return;
    }

    await this.#identifyGames(steamApps);
  }

  async #identifyGames(steamApps) {
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    if (filteredSteamApps.length === 0) {
      await this.#databaseClient.identifySteamAppsById(steamApps);
      return;
    }

    const games = await this.#filterSteamAppsByAppType(filteredSteamApps);
    if (games.length !== 0) {
      await this.#databaseClient.insertManyGames(games);
      await this.#databaseClient.insertManyHistoryChecks(HistoryCheck.manyFromGames(games));
    }

    await this.#databaseClient.identifySteamAppsById(steamApps);
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
        return Game.fromSteamApp(steamApp);
      } catch (error) {
        /**
         * @TODO - https://github.com/lukatarman/steam-game-stats/issues/31
         */
        if (error.status !== 500 && error.status !== 404) return;
      }
    }))).filter(games => !!games);
  }
}

