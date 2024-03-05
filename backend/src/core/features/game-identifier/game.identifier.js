import {
  updateMissingReleaseDates,
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
  #htmlParser;

  constructor(
    steamClient,
    steamAppsRepository,
    gamesRepository,
    historyChecksRepository,
    logger,
    options,
    htmlParser,
  ) {
    this.#steamClient = steamClient;
    this.#steamAppsRepository = steamAppsRepository;
    this.#gamesRepository = gamesRepository;
    this.#historyChecksRepository = historyChecksRepository;
    this.#logger = logger;
    this.#options = options;
    this.#htmlParser = htmlParser;
  }

  //todo: checK PR
  // take out parseHTML from methods, parse it in identifier before providing
  // take out delay + logger from steam apps aggregate - back to game identifier
  // put steam apps identify types into game identifier
  // Check & adjust update details/release date methods
  // remove all usage of manyFromX from game and steamApp datamodels
  // adjust usage

  checkIfGameViaSource = async (source) => {
    this.#logger.debugc(`identifying games via ${source}`);

    const steamApps = await this.#steamAppsRepository.getSourceUntriedFilteredSteamApps(
      this.#options.batchSize,
      source,
    );

    if (steamApps.checkIfEmpty(this.#options.globalIterationDelay)) return;

    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(
      steamApps.apps,
      source,
    );

    steamApps.identifyTypes(htmlDetailsPages, source);

    const games = steamApps.extractGames(htmlDetailsPages, source);

    await this.#persistGameCheckUpdates(games, steamApps);
  };

  async #getSteamAppsHtmlDetailsPages(steamApps, source) {
    const htmlDetailsPages = [];

    for (let steamApp of steamApps) {
      // TODO https://github.com/lukatarman/steam-game-stats/issues/192
      const htmlPage = await this.#steamClient.getSourceHtmlDetailsPage(
        steamApp.appid,
        source,
      );

      htmlDetailsPages.push({
        page: this.#htmlParser(htmlPage).document,
        id: steamApp.appid,
      });

      await delay(this.#options.unitDelay);
    }

    return htmlDetailsPages;
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

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(games.getIds());

    const [updatedGames, updatedSteamApps] = await this.#updateMissingDetails(
      games.games,
      steamApps,
    );

    this.#persistUpdatedDetails(updatedGames, updatedSteamApps);
  };

  async #updateMissingDetails(games, steamApps) {
    const source = ValidDataSources.validDataSources.steamDb;

    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps, source);

    const updatedSteamApps = recordAttemptsViaSource(steamApps, htmlDetailsPages, source);

    const updatedGames = updateGamesMissingDetails(games, htmlDetailsPages);

    return [updatedGames, updatedSteamApps];
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

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(games.getIds());

    const [updatedGames, updatedSteamApps] = await this.#updateMissingReleaseDates(
      games.games,
      steamApps,
    );

    this.#persistReleaseDates(updatedGames, updatedSteamApps);
  };

  async #updateMissingReleaseDates(games, steamApps) {
    const source = ValidDataSources.validDataSources.steamDb;

    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(steamApps, source);

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
