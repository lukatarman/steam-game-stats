import {
  updateMissingReleaseDates,
  getGames,
  getGamesIds,
  recordAttemptsViaSource,
  updateGamesMissingDetails,
  identifySteamAppTypes,
} from "../../services/game.service.js";
import { delay } from "../../../common/time.utils.js";
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

  //todo: checK PR

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
    if (steamApps.length > 0) return false;

    this.#logger.debugc(
      `no steam apps in db, retry in: ${this.#options.globalIterationDelay} ms`,
    );

    return true;
  }

  async #identifyTypes(steamApps, source) {
    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps, source);

    const updatedSteamApps = identifySteamAppTypes(steamApps, htmlDetailsPages, source);

    const games = getGames(updatedSteamApps, htmlDetailsPages, source);

    return [games, updatedSteamApps];
  }

  async #getSteamAppsHtmlDetailsPages(steamApps, source) {
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

    if (this.#gamesIsEmpty(games, "details")) return;

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(
      getGamesIds(games),
    );

    const [updatedGames, updatedSteamApps] = await this.#updateMissingDetails(
      games,
      steamApps,
    );

    this.#persistUpdatedDetails(updatedGames, updatedSteamApps);
  };

  #gamesIsEmpty = (games, message) => {
    if (games.length > 0) return false;

    this.#logger.debugc(
      `no games without ${message} in db, retrying in ${
        this.#options.globalIterationDelay
      } ms`,
    );

    return true;
  };

  async #updateMissingDetails(games, steamApps) {
    const source = ValidDataSources.validDataSources.steamDb;

    const htmlDetailsPages = await this.#getGamesHtmlDetailsPages(games, source);

    const updatedSteamApps = recordAttemptsViaSource(steamApps, htmlDetailsPages, source);

    const updatedGames = updateGamesMissingDetails(games, htmlDetailsPages);

    return [updatedGames, updatedSteamApps];
  }

  async #getGamesHtmlDetailsPages(games, source) {
    const htmlDetailsPages = [];

    for (let game of games) {
      // TODO https://github.com/lukatarman/steam-game-stats/issues/192
      const htmlPage = await this.#steamClient.getSourceHtmlDetailsPage(game.id, source);
      htmlDetailsPages.push({ page: htmlPage, id: game.id });

      await delay(this.#options.unitDelay);
    }

    return htmlDetailsPages;
  }

  async #persistUpdatedDetails(games, updatedApps) {
    this.#logger.debugc(
      `persisting ${updatedApps.length} apps with updated html attempts`,
    );
    this.#steamAppsRepository.updateSteamAppsById(updatedApps);

    this.#logger.debugc(`persisting ${games.length} games with updated details`);
    await this.#gamesRepository.updateGameDetails(games);
  }

  updateGamesWithoutReleaseDates = async () => {
    this.#logger.debugc("updating games without details");

    const games = await this.#gamesRepository.getGamesWithoutReleaseDates(
      this.#options.batchSize,
    );

    if (this.#gamesIsEmpty(games, "release dates")) return;

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(
      getGamesIds(games),
    );

    const [updatedGames, updatedSteamApps] = await this.#updateMissingReleaseDates(
      games,
      steamApps,
    );

    this.#persistReleaseDates(updatedGames, updatedSteamApps);
  };

  async #updateMissingReleaseDates(games, steamApps) {
    const source = ValidDataSources.validDataSources.steamDb;

    const htmlDetailsPages = await this.#getGamesHtmlDetailsPages(games, source);

    const updatedSteamApps = recordAttemptsViaSource(steamApps, htmlDetailsPages, source);

    const updatedGames = updateMissingReleaseDates(games, htmlDetailsPages);

    return [updatedGames, updatedSteamApps];
  }

  async #persistReleaseDates(games, steamApps) {
    this.#logger.debugc(`persisting ${steamApps.length} apps with updated html attempts`);
    this.#steamAppsRepository.updateSteamAppsById(steamApps);

    this.#logger.debugc(`persisting ${games.length} games with updated release dates`);
    await this.#gamesRepository.updateReleaseDates(games);
  }
}
