import { diffMOCK } from "./services/diff.service";
import { tagNonIdentified } from "./services/tag.service";
import { runFuncWithDelayOfXhours } from "./services/time.service";

export class SteamDataAggregator {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  run() {
    this.#initialUpdate();
    runFuncWithDelayOfXhours(this.#updateList.bind(this), 24);
  }

  async #initialUpdate() {
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    if (moreThanXhoursPassedSince(24, lastUpdate)) this.#updateList();
  }

  async #updateList() {
    const steamAppsApi = await this.#steamClient.getAppList();
    const steamAppsDb = await this.#databaseClient.getAllSteamApps();
    const steamApps = tagNonIdentified(diffMOCK(steamAppsApi, steamAppsDb));
    await this.#databaseClient.insertManySteamApps(steamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
