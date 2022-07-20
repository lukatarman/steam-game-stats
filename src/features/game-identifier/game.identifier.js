import {
  discoverGamesFromSteamWeb,
  XXXdiscoverGamesFromSteamWeb,
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

  identifyViaSteamWeb = async () => {
    const steamApps = await this.#databaseClient.getSteamWebUntriedFilteredSteamApps(
      this.#options.batchSize,
    );

    if (steamApps.length === 0) return;

    await this.#identifyGames(steamApps);
  };

  async #identifyGames(steamApps) {
    const [games, unidentifiedSteamApps] = await this.#filterSteamAppsByAppType(
      steamApps,
    );

    if (games.length !== 0) {
      await this.#databaseClient.insertManyGames(games);
      await this.#databaseClient.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }

    if (unidentifiedSteamApps.length !== 0) {
      await this.#databaseClient.updateSteamAppsById(unidentifiedSteamApps);
    }
  }

  XXXidentifyViaSteamWeb = async () => {
    const steamApps = await this.#databaseClient.getSteamWebUntriedFilteredSteamApps(
      this.#options.batchSize,
    );
    if (steamApps.length === 0) return;

    const [games, updatedSteamApps] = this.#identify(steamApps);

    this.#persist(games, updatedSteamApps);
  };

  async #identify(steamApps) {
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    return XXXdiscoverGamesFromSteamWeb(steamApps, htmlDetailsPages);
  }

  async #persist(games, steamApps) {
    if (games.length !== 0) {
      await this.#databaseClient.insertManyGames(games);
      await this.#databaseClient.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }
    await this.#databaseClient.updateSteamAppsById(updatedSteamApps);
  }

  async #filterSteamAppsByAppType(steamApps) {
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, unidentifiedSteamApps] = discoverGamesFromSteamWeb(
      steamApps,
      htmlDetailsPages,
    );

    return [games, unidentifiedSteamApps];
  }

  async #getSteamAppsHtmlDetailsPages(steamApps) {
    const detailsPages = [];

    for (let steamApp of steamApps) {
      detailsPages.push(
        await this.#steamClient.getSteamAppHtmlDetailsPage(steamApp.appid),
      );
      await delay(this.#options.unitDelay);
    }
    return detailsPages;
  }

  //todo: remove instantiation in game.service.js - just push to array on object
  //change updateSteamAppsById db method
  //add to documentation - new best practice: transform data into appropriate format as soon as you get it

  identifyViaSteamchartsWeb = async () => {
    const steamApps = await this.#databaseClient.getSteamchartsUntriedFilteredSteamApps(
      this.#options.batchSize,
    );

    if (steamApps.length === 0) return;

    const games = await this.#discoverGamesFromSteamchartsHtmlDetailsPages(steamApps);

    if (games.length !== 0) {
      await this.#databaseClient.insertManyGames(games);
      await this.#databaseClient.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }
  };

  async #discoverGamesFromSteamchartsHtmlDetailsPages(steamApps) {
    const games = [];
    const unidentifiedSteamApps = [];

    for (let unidentifiedSteamApp of steamApps) {
      await delay(this.#options.unitDelay);

      try {
        await this.#steamClient.getSteamchartsGameHtmlDetailsPage(
          unidentifiedSteamApp.appid,
        );
        games.push(Game.fromSteamApp(unidentifiedSteamApp));
      } catch (error) {
        unidentifiedSteamApps.push(unidentifiedSteamApp.triedVia.push("steamcharts"));
      }
    }

    return games;
  }
}
