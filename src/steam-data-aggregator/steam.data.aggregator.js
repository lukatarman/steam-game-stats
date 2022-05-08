import { diffMOCK } from "./services/diff.service";
import { runFuncInLoopWithDelayOfXhours, moreThanXhoursPassedSince } from "./services/time.service";

export class SteamDataAggregator {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  run() {
    this.#initialUpdate();
    // todo: refac to runFuncWithDelayOfXms
    runFuncInLoopWithDelayOfXhours(this.#updateSteamApps.bind(this), 24);
  }

  async #initialUpdate() {
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    if(!lastUpdate) return;
    if (moreThanXhoursPassedSince(24, lastUpdate)) this.#updateSteamApps();
  }

  async #updateSteamApps() {
    const steamAppsApi = await this.#steamClient.getAppList();
    const steamAppsDb = await this.#databaseClient.getAllSteamApps();
    const steamApps = diffMOCK(steamAppsApi, steamAppsDb);
    await this.#databaseClient.insertManySteamApps(steamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
