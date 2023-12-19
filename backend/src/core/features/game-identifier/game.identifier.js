import {
  discoverGamesFromSteamWeb,
  updateTypeSideEffectFree,
  identifyGames,
  assignType,
  updateMissingDetails,
  updateMissingReleaseDates,
  recordAttemptsViaSteamDb,
} from "../../services/game.service.js";
import { delay } from "../../../common/time.utils.js";
import { HistoryCheck } from "../../models/history.check.js";

export class GameIdentifier {
  #steamClient;
  #steamAppsRepository;
  #gamesRepository;
  #historyChecksRepository;
  #logger;
  #options;

  constructor(
    steamClient,
    steamAppsRepository,
    gamesRepository,
    historyChecksRepository,
    logger,
    options,
  ) {
    this.#steamClient = steamClient;
    this.#steamAppsRepository = steamAppsRepository;
    this.#gamesRepository = gamesRepository;
    this.#historyChecksRepository = historyChecksRepository;
    this.#logger = logger;
    this.#options = options;
  }

  tryViaSteamWeb = async () => {
    this.#logger.debugc("identifying games via steam web");

    const steamApps = await this.#steamAppsRepository.getSteamWebUntriedFilteredSteamApps(
      this.#options.batchSize,
    );
    if (steamApps.length === 0) {
      this.#logger.debugc(
        `no steam apps in db, retry in: ${this.#options.globalIterationDelay} ms`,
      );
      return;
    }

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
        // TODO https://github.com/lukatarman/steam-game-stats/issues/192
        await this.#steamClient.getSteamAppHtmlDetailsPage(steamApp.appid),
      );
      await delay(this.#options.unitDelay);
    }
    return detailsPages;
  }

  async #persist(games, updatedSteamApps) {
    if (games.length !== 0) {
      this.#logger.debugc(`persiting ${games.length} identified games`);
      await this.#gamesRepository.insertManyGames(games);
      await this.#historyChecksRepository.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }
    await this.#steamAppsRepository.updateSteamAppsById(updatedSteamApps);
  }

  tryViaSteamchartsWeb = async () => {
    this.#logger.debugc("identifying games via steamcharts web");

    const steamApps =
      await this.#steamAppsRepository.getSteamchartsUntriedFilteredSteamApps(
        this.#options.batchSize,
      );
    if (steamApps.length === 0) {
      this.#logger.debugc(
        `no steam apps in db, retry in: ${this.#options.globalIterationDelay} ms`,
      );
      return;
    }

    const updatedSteamApps = await this.#updateStatusViaSteamchartsWeb(steamApps);
    const games = identifyGames(updatedSteamApps);

    this.#persist(games, updatedSteamApps);
  };

  // this method is a mess right now, including the tests. Will be fixed in issue: #198
  async #updateStatusViaSteamchartsWeb(steamApps) {
    const updatedSteamApps = [];

    for (let steamApp of steamApps) {
      const steamAppCopy = steamApp.copy();
      steamAppCopy.triedViaSteamchartsWeb();

      // TODO https://github.com/lukatarman/steam-game-stats/issues/192
      const result = await this.#steamClient.getSteamchartsGameHtmlDetailsPage(
        steamApp.appid,
      );

      if (result === "") {
        steamAppCopy.failedViaSteamchartsWeb();
        this.#logger.debugc(`no entry on steamcharts web for appid: ${steamApp.appid}`);
      }

      assignType(result, steamAppCopy);

      await delay(this.#options.unitDelay);
      updatedSteamApps.push(steamAppCopy);
    }

    return updatedSteamApps;
  }

  updateGamesWithoutDetails = async () => {
    this.#logger.debugc("updating games without details");

    const games = await this.#gamesRepository.getGamesWithoutDetails(
      this.#options.batchSize,
    );

    if (games.length === 0) {
      this.#logger.debugc(
        `no games without details in db, retrying in ${
          this.#options.globalIterationDelay
        } ms`,
      );
      return;
    }

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(
      games.map((game) => game.id),
    );

    const htmlDetailsPages = await this.#getSteamDbHtmlDetailsPages(games);

    const updatedApps = recordAttemptsViaSteamDb(steamApps, htmlDetailsPages);

    updateMissingDetails(games, htmlDetailsPages);

    this.#persistMissingProperties(games, updatedApps);
  };

  async #getSteamDbHtmlDetailsPages(games) {
    const htmlDetailsPages = [];

    for (let game of games) {
      // TODO https://github.com/lukatarman/steam-game-stats/issues/192
      const htmlPage = await this.#steamClient.getSteamDbHtmlDetailsPage(game.id);
      htmlDetailsPages.push({ page: htmlPage, id: game.id });

      await delay(this.#options.unitDelay);
    }

    return htmlDetailsPages;
  }

  async #persistMissingProperties(games, appsWithoutPages) {
    if (appsWithoutPages.length !== 0) {
      this.#logger.debugc(`persisting ${appsWithoutPages.length} apps without pages`);
      this.#steamAppsRepository.updateSteamAppsById(appsWithoutPages);
    }

    this.#logger.debugc(`persisting ${games.length} games with updated details`);
    await this.#gamesRepository.updateGameDetails(games);
  }

  updateGamesWithoutReleaseDates = async () => {
    this.#logger.debugc("updating games without details");

    const games = await this.#gamesRepository.getGamesWithoutReleaseDates(
      this.#options.batchSize,
    );

    if (games.length === 0) {
      this.#logger.debugc(
        `no games without release dates in db, retrying in ${
          this.#options.iterationDelay
        } ms`,
      );
      return;
    }

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(
      games.map((game) => game.id),
    );

    const htmlDetailsPages = await this.#getSteamDbHtmlDetailsPages(games);

    const updatedApps = recordAttemptsViaSteamDb(steamApps, htmlDetailsPages);

    updateMissingReleaseDates(games, htmlDetailsPages);

    this.#persistReleaseDates(games, updatedApps);
  };

  #persistReleaseDates = async (games, appsWithoutPages) => {
    if (appsWithoutPages.length !== 0) {
      this.#logger.debugc(`persisting ${appsWithoutPages.length} apps without pages`);
      this.#steamAppsRepository.updateSteamAppsById(appsWithoutPages);
    }

    this.#logger.debugc(`persisting ${games.length} games with updated release dates`);

    await this.#gamesRepository.updateReleaseDates(games);
  };
}
