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
    this.#logger.info("identifying games via steam web");

    const steamApps = await this.#steamAppsRepository.getSteamWebUntriedFilteredSteamApps(
      this.#options.batchSize,
    );
    if (steamApps.length === 0) {
      this.#logger.info(
        `no steam apps in db, retry in: ${this.#options.iterationDelay} ms`,
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
        await this.#steamClient.getSteamAppHtmlDetailsPage(steamApp.appid),
      );
      await delay(this.#options.unitDelay);
    }
    return detailsPages;
  }

  async #persist(games, updatedSteamApps) {
    if (games.length !== 0) {
      this.#logger.info(`persiting ${games.length} identified games`);
      await this.#gamesRepository.insertManyGames(games);
      await this.#historyChecksRepository.insertManyHistoryChecks(
        HistoryCheck.manyFromGames(games),
      );
    }
    await this.#steamAppsRepository.updateSteamAppsById(updatedSteamApps);
  }

  tryViaSteamchartsWeb = async () => {
    this.#logger.info("identifying games via steamcharts web");

    const steamApps =
      await this.#steamAppsRepository.getSteamchartsUntriedFilteredSteamApps(
        this.#options.batchSize,
      );
    if (steamApps.length === 0) {
      this.#logger.info(
        `no steam apps in db, retry in: ${this.#options.iterationDelay} ms`,
      );
      return;
    }

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
      } catch (_) {
        // The catch block is empty because in some cases we are expecting the request to return an error.
        // This just means that this app has no entry on steamcharts, so we don't do anything with it.
        this.#logger.info(`no entry on steamcharts web for appid: ${steamApp.appid}`);
      }
    }

    return updatedSteamApps;
  }
}
