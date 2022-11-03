import {
  discoverGamesFromSteamWeb,
  updateTypeSideEffectFree,
  identifyGames,
  assignType,
} from "./services/game.service.js";
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

  tryViaSteamWeb = async () => {
    const steamApps = await this.#databaseClient.getSteamWebUntriedFilteredSteamApps(
      this.#options.batchSize,
    );
    if (steamApps.length === 0) return;

    const [games, updatedSteamApps] = await this.#identifyViaSteamWeb(steamApps);

    this.#persist(games, updatedSteamApps);
  };

  async #identifyViaSteamWeb(steamApps) {
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    const games = discoverGamesFromSteamWeb(steamApps, htmlDetailsPages);

    const updatedSteamApps = updateTypeSideEffectFree(steamApps, htmlDetailsPages);

    return [games, updatedSteamApps];
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

  async #persist(games, updatedSteamApps) {
    if (games.length !== 0) {
      await this.#databaseClient.insertManyGames(games);
      await this.#databaseClient.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }
    await this.#databaseClient.updateSteamAppsById(updatedSteamApps);
  }

  tryViaSteamchartsWeb = async () => {
    const steamApps = await this.#databaseClient.getSteamchartsUntriedFilteredSteamApps(
      this.#options.batchSize,
    );
    if (steamApps.length === 0) return;

    const updatedSteamApps = await this.#updateStatusViaSteamchartsWeb(steamApps);
    const games = identifyGames(updatedSteamApps);

    this.#persist(games, updatedSteamApps);
  };

  async #updateStatusViaSteamchartsWeb(steamApps) {
    const updatedSteamApps = steamApps
      .map((steamApp) => steamApp.copy())
      .map((steamApp) => {
        steamApp.triedViaSteamchartsWeb();
        return steamApp;
      });

    for (let steamApp of updatedSteamApps) {
      await delay(this.#options.unitDelay);

      try {
        const result = await this.#steamClient.getSteamchartsGameHtmlDetailsPage(
          steamApp.appid,
        );

        assignType(result, steamApp);
      } catch (error) {
        // The catch block is empty because in some cases we are expecting the request to return an error.
        // This just means that this app has no entry on steamcharts, so we don't do anything with it.
      }
    }

    return updatedSteamApps;
  }
}
