import { discoverGamesFromSteamWeb } from "./services/game.service.js";
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
    //todo: change database query to look for steamapps without a "steamWeb" value in it's triedVia property
    const steamApps = await this.#databaseClient.getXunidentifiedFilteredSteamApps(
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

  identifyViaSteamchartsWeb = async () => {
    // get a batch of steamApps which are unidentified and tried via steamWeb
  };

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
