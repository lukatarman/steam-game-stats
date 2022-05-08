import { diff } from "./services/diff.service";
import { runFuncInLoopWithDelayOfXhoursFromDate, moreThanXhoursPassedSince } from "./services/time.service";

export class SteamDataAggregator {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  run() {
    this.#initialUpdate();

    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();

    // todo: refac to runFuncWithDelayOfXms
    runFuncInLoopWithDelayOfXhoursFromDate(this.#updateSteamApps.bind(this), 24, lastUpdate);
  }

  async #initialUpdate() {
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    if (!lastUpdate) this.#firstUpdate();
    if (moreThanXhoursPassedSince(24, lastUpdate)) this.#updateSteamApps();
  }

  async #firstUpdate() {
    const steamApps = await this.#steamClient.getAppList();
    await this.#databaseClient.insertManySteamApps(steamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }

  async #updateSteamApps() {
    const steamAppsApi = await this.#steamClient.getAppList();
    const steamAppsDb  = await this.#databaseClient.getAllSteamApps();
    const steamApps    = diff(steamAppsApi, steamAppsDb);
    await this.#databaseClient.insertManySteamApps(steamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
