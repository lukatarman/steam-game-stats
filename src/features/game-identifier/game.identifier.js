import {
  discoverGamesFromSteamWeb,
  updateIdentificationStatusSideEffectFree,
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

    const htmlDetailsPages = this.#getSteamAppsHtmlDetailsPages(steamApps);

    const games = this.#identify(steamApps, htmlDetailsPages);

    const updatedSteamApps = updateIdentificationStatusSideEffectFree(
      steamApps,
      htmlDetailsPages,
    );

    this.#persist(games, updatedSteamApps);
  };

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

  async #identify(steamApps) {
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    return discoverGamesFromSteamWeb(steamApps, htmlDetailsPages);
  }

  async #persist(games, updatedSteamApps) {
    if (games.length !== 0) {
      await this.#databaseClient.insertManyGames(games);
      await this.#databaseClient.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }
    await this.#databaseClient.updateSteamAppsById(updatedSteamApps);
  }

  //todo: refactor identifyviaSteamchartsWeb

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
