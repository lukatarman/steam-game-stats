import { SteamApp } from "../../models/steam.app.js";
import { moreThanXhoursPassedSince } from "../../utils/time.utils.js";

export class SteamAppsAggregator {
  #SteamAppsUpdateTimestampsRepository;
  #steamAppsRepository;
  #steamClient;
  #options;

  constructor(
    steamClient,
    SteamAppsUpdateTimestampsRepository,
    steamAppsRepository,
    options,
  ) {
    this.#steamClient = steamClient;
    this.#SteamAppsUpdateTimestampsRepository = SteamAppsUpdateTimestampsRepository;
    this.#steamAppsRepository = steamAppsRepository;
    this.#options = options;
  }

  collectSteamApps = async () => {
    const lastUpdate =
      await this.#SteamAppsUpdateTimestampsRepository.getLastSteamAppsUpdateTimestamp();
    if (!lastUpdate) {
      await this.#collectFirstTime();
      return;
    }

    const x = this.#options.updateIntervalDelay;
    if (moreThanXhoursPassedSince(x, lastUpdate.updatedOn))
      await this.#collectSteamApps();
  };

  async #collectFirstTime() {
    const steamApps = await this.#steamClient.getAppList();

    await this.#steamAppsRepository.insertManySteamApps(steamApps);
    await this.#SteamAppsUpdateTimestampsRepository.insertOneSteamAppsUpdateTimestamp(
      new Date(),
    );
  }

  async #collectSteamApps() {
    const steamAppsApi = await this.#steamClient.getAppList();
    const steamAppsDb = await this.#steamAppsRepository.getAllSteamApps();
    /**
     * @TODO https://github.com/lukatarman/steam-game-stats/issues/32
     */
    const steamApps = SteamApp.diff(steamAppsApi, steamAppsDb);
    if (steamApps.length === 0) {
      await this.#SteamAppsUpdateTimestampsRepository.insertOneSteamAppsUpdateTimestamp(
        new Date(),
      );
      return;
    }
    await this.#steamAppsRepository.insertManySteamApps(steamApps);
    await this.#SteamAppsUpdateTimestampsRepository.insertOneSteamAppsUpdateTimestamp(
      new Date(),
    );
  }
}
