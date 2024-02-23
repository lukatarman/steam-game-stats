import {
  updateMissingReleaseDates,
  getGamesIds,
  recordAttemptsViaSource,
  updateGamesMissingDetails,
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
  // check if anything else to change in game identifier checkIfGameViaSource method
  // remove all usage of manyFromX from game and steamApp datamodels
  // adjust usage

  checkIfGameViaSource = async (source) => {
    this.#logger.debugc(`identifying games via ${source}`);

    const steamApps = await this.#steamAppsRepository.getSourceUntriedFilteredSteamApps(
      this.#options.batchSize,
      source,
    );

    if (steamApps.checkIfEmpty(this.#options.globalIterationDelay)) return;

    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps, source);

    const games = steamApps.checkForGames(htmlDetailsPages, source);

    await this.#persistGameCheckUpdates(games, steamApps);
  };

  async #getSteamAppsHtmlDetailsPages(steamApps, source) {
    const detailsPages = [];

    for (let steamApp of steamApps.apps) {
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
    await this.#steamAppsRepository.updateSteamAppsById(steamApps.apps);
  }

  updateGamesWithoutDetails = async () => {
    this.#logger.debugc("updating games without details");

    const games = await this.#gamesRepository.getGamesWithoutDetails(
      this.#options.batchSize,
    );

    if (games.checkIfEmpty(this.#options.globalIterationDelay, "details")) return;

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(
      getGamesIds(games.games),
    );

    const [updatedGames, updatedSteamApps] = await this.#updateMissingDetails(
      games.games,
      steamApps,
    );

    this.#persistUpdatedDetails(updatedGames, updatedSteamApps);
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

    if (games.checkIfEmpty(this.#options.globalIterationDelay, "release dates")) return;

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(
      getGamesIds(games.games),
    );

    const [updatedGames, updatedSteamApps] = await this.#updateMissingReleaseDates(
      games.games,
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
