import { delay } from "../../../common/time.utils.js";
import { HistoryCheck } from "../../models/history.check.js";

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

  checkIfGameViaSteamWeb = async () => {
    this.#logger.debugc(`identifying games via Steam web`);

    const steamApps = await this.#steamAppsRepository.getSteamWebUntriedFilteredSteamApps(
      this.#options.batchSize,
    );

    if (steamApps.isEmpty) {
      this.#logger.debugc(
        `no Steam web checkable steam apps in db, retry in: ${
          this.#options.globalIterationDelay
        } ms`,
      );

      return;
    }

    const htmlDetailsPages = await this.#getSteamWebHtmlDetailsPages(steamApps.content);

    steamApps.identifyTypesViaSteamWeb(htmlDetailsPages);

    const games = steamApps.extractGamesViaSteamWeb(htmlDetailsPages);

    await this.#persistGameCheckUpdates(games, steamApps.content);
  };

  async #getSteamWebHtmlDetailsPages(steamApps) {
    const htmlDetailsPages = [];

    for (let steamApp of steamApps) {
      // TODO https://github.com/lukatarman/steam-game-stats/issues/192
      const htmlPage = await this.#steamClient.getSteamWebHtmlDetailsPage(steamApp.appid);

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

    await this.#steamAppsRepository.updateSteamAppsById(steamApps);
  }

  checkIfGameViaSteamApi = async () => {
    this.#logger.debugc(`identifying games via Steam API`);

    const steamApps = await this.#steamAppsRepository.getSteamApiUntriedFilteredSteamApps(
      this.#options.batchSize,
    );

    if (steamApps.isEmpty) {
      this.#logger.debugc(
        `no Steam API checkable steam apps in db, retry in: ${
          this.#options.globalIterationDelay
        } ms`,
      );

      return;
    }

    const steamApiApps = await this.#getSteamAppsViaSteamApi(steamApps.ids);

    steamApps.identifyTypesViaSteamApi(steamApiApps);

    const games = steamApps.extractGamesViaSteamApi(steamApiApps);

    this.#persistGameCheckUpdates(games, steamApps.content);
  };

  async #getSteamAppsViaSteamApi(steamAppsIds) {
    const steamAppsApiRaw = [];

    for (let id of steamAppsIds) {
      const steamApiApp = await this.#steamClient.getSteamAppViaSteamApi(id);

      steamAppsApiRaw.push(steamApiApp);

      await delay(this.#options.unitDelay);
    }

    return steamAppsApiRaw;
  }

  updateGamesWithoutReleaseDates = async () => {
    this.#logger.debugc(`updating games without release dates via Steam API`);

    const games = await this.#gamesRepository.getGamesWithoutReleaseDates(
      this.#options.batchSize,
    );

    if (games.isEmpty) {
      this.#logger.debugc(
        `no games without release dates in db, retry in: ${
          this.#options.globalIterationDelay
        } ms`,
      );

      return;
    }

    const steamApps = await this.#steamAppsRepository.getSteamAppsById(games.ids);

    const steamApiApps = await this.#getSteamAppsViaSteamApi(steamApps.ids);

    steamApps.recordAttemptsViaSteamApi(steamApiApps);

    games.extractReleaseDatesViaSteamApi(steamApiApps);

    this.#persistReleaseDates(games.content, steamApps.content);
  };

  async #persistReleaseDates(games, steamApps) {
    this.#logger.debugc(`persisting ${steamApps.length} apps with updated html attempts`);
    this.#logger.debugc(`persisting ${games.length} games with updated release dates`);

    await this.#steamAppsRepository.updateSteamAppsById(steamApps);
    await this.#gamesRepository.updateReleaseDates(games);
  }
}
