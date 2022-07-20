import { SteamApp } from "../../models/steam.app.js";
import { moreThanXhoursPassedSince } from "../../utils/time.utils.js";

export class SteamAppsAggregator {
  #databaseClient;
  #steamClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
    this.#options = options;
  }

  collectSteamApps = async () => {
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
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

    await this.#databaseClient.insertManySteamApps(SteamApp.manyFromSteamApi(steamApps));
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }

  async #collectSteamApps() {
    const steamAppsApi = await this.#steamClient.getAppList();
    const steamAppsDb = await this.#databaseClient.getAllSteamApps();
    /**
     * @TODO https://github.com/lukatarman/steam-game-stats/issues/32
     */
    const steamApps = SteamApp.diff(steamAppsApi, steamAppsDb);
    if (steamApps.length === 0) {
      await this.#databaseClient.insertOneUpdateTimestamp(new Date());
      return;
    }
    await this.#databaseClient.insertManySteamApps(SteamApp.manyFromSteamApi(steamApps));
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
