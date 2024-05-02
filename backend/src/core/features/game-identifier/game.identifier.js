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

  checkIfGameViaSteamWeb = async () => {
    this.#logger.debugc(`identifying games via Steam web`);

    const steamApps = await this.#steamAppsRepository.getSteamWebUntriedFilteredSteamApps(
      this.#options.batchSize,
    );

    if (steamApps.isEmpty) {
      this.#logger.debugc(
        `no steam apps in db, retry in: ${this.#options.globalIterationDelay} ms`,
      );

      return;
    }

    const htmlDetailsPages = await this.#getSteamWebHtmlDetailsPages(steamApps.content);

    steamApps.identifyTypesViaSteamWeb(htmlDetailsPages);

    const games = steamApps.extractGames(htmlDetailsPages);

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

  updateGamesWithoutReleaseDates = async () => {
    const source = ValidDataSources.validDataSources.steamDb;
    this.#logger.debugc(`updating games without release dates via ${source}`);

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

    const htmlDetailsPages = await this.#getSteamAppsHtmlDetailsPages(
      steamApps.content,
      source,
    );

    steamApps.recordAttemptsViaSource(htmlDetailsPages, source);

    games.extractReleaseDatesFrom(htmlDetailsPages);

    this.#persistReleaseDates(games.content, steamApps.content);
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

  async #persistReleaseDates(games, steamApps) {
    this.#logger.debugc(`persisting ${steamApps.length} apps with updated html attempts`);
    this.#logger.debugc(`persisting ${games.length} games with updated release dates`);

    await this.#steamAppsRepository.updateSteamAppsById(steamApps);
    await this.#gamesRepository.updateReleaseDates(games);
  }
}
