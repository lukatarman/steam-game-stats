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
    const steamApps = await this.#databaseClient.getXunidentifiedFilteredSteamApps(
      this.#options.batchSize,
    );

    if (steamApps.length === 0) return;

    await this.#identifyGames(steamApps);
  }

  async #identifyGames(steamApps) {
    const games = await this.#filterSteamAppsByAppType(steamApps);
    if (games.length !== 0) {
      await this.#databaseClient.insertManyGames(games);
      await this.#databaseClient.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }

    await this.#databaseClient.identifySteamAppsById(steamApps);
  }

  async #filterSteamAppsByAppType(steamApps) {
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, unidentifiedSteamApps] = discoverGamesFromSteamHtmlDetailsPages(
      steamApps,
      htmlDetailsPages,
    );

    games.push(
      ...(await this.#discoverGamesFromSteamchartsHtmlDetailsPages(
        unidentifiedSteamApps,
      )),
    );

    return games;
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

  async #discoverGamesFromSteamchartsHtmlDetailsPages(unidentifiedSteamApps) {
    const games = [];

    for (let unidentifiedSteamApp of unidentifiedSteamApps) {
      await delay(this.#options.unitDelay);

      try {
        await this.#steamClient.getSteamchartsGameHtmlDetailsPage(
          unidentifiedSteamApp.appid,
        );
        games.push(Game.fromSteamApp(unidentifiedSteamApp));
      } catch (error) {
        /**
         * @TODO - https://github.com/lukatarman/steam-game-stats/issues/31
         */
        continue;
      }
    }

    return games;
  }
}
