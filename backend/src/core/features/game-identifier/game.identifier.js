import {
  discoverGamesFromSteamWeb,
  updateTypeSideEffectFree,
  identifyGames,
  assignType,
  updateMissingDetails,
  updateMissingReleaseDates,
  recordAttemptsViaSteamDb,
  recordHtmlAttempts,
  getGames,
} from "./services/game.service.js";
import { delay } from "../../utils/time.utils.js";
import { HistoryCheck } from "../../models/history.check.js";
import { ValidDataSources } from "../../models/valid.data.sources.js";

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

  tryIfGameViaSource = async (source) => {
    this.#logger.debugc(`identifying games via ${source}`);

    const steamApps = await this.#steamAppsRepository.getSourceUntriedFilteredSteamApps(
      this.#options.batchSize,
      source,
    );

    if (this.#steamAppsIsEmpty(steamApps)) return;

    const [games, updatedSteamApps] = await this.#identifyTypes(steamApps, source);

    await this.#persistGameCheckUpdates(games, updatedSteamApps);
  };

  #steamAppsIsEmpty(steamApps) {
    if (steamApps.length === 0) return true;

    this.#logger.debugc(
      `no steam apps in db, retry in: ${this.#options.globalIterationDelay} ms`,
    );
    return false;
  }

  async #identifyTypes(steamApps, source) {
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPagesNR64(
      steamApps,
      source,
    );

    const updatedSteamApps = recordHtmlAttempts(steamApps, htmlDetailsPages, source);

    const games = getGames(updatedSteamApps, htmlDetailsPages, source);

    return [games, updatedSteamApps];
  }

  async #getSteamAppsHtmlDetailsPagesNR64(steamApps, source) {
    const detailsPages = [];

    for (let steamApp of steamApps) {
      // TODO https://github.com/lukatarman/steam-game-stats/issues/192
      detailsPages.push(
        await this.#steamClient.getSourceHtmlDetailsPage(steamApp.appid, source),
      );
      await delay(this.#options.unitDelay);
    }
    return detailsPages;
  }

  async #persistGameCheckUpdates(games, steamApps) {
    if (games.length !== 0) {
      this.#logger.debugc(`persiting ${games.length} identified games`);
      await this.#gamesRepository.insertManyGames(games);
      await this.#historyChecksRepository.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }
    await this.#steamAppsRepository.updateSteamAppsById(steamApps);
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
