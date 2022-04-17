import { diffMOCK } from "./steam.data.aggregator.utils";

export class SteamDataAggregator {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  run() {
    const lastUpdate = this.#databaseClient.getLast('update_timestamps');
    const now = new Date();
    const milliseconds = Math.abs(now - lastUpdate);
    const hours = milliseconds / 36e5;
    if (hours > 24) this.#updateList();

    let firstRunSinceStart = true;
    while(true) {
      if (firstRunSinceStart) {
        firstRunSinceStart = false;
        const tillNextUpdate = hours > 24 ? hours - 24 : 24 - hours;
        await delay(tillNextUpdate * 36e5);
      }

      this.#updateList();

      await delay(24 * 36e5);
    }
  }

  #updateList() {
    const steamAppsApi = await this.#steamClient.getAppList();
    const steamAppsDb = await this.#databaseClient.getAllSteamApps();
    const steamAppsDiff = diffMOCK(steamAppsApi, steamAppsDb);
    const steamAppsDiffNonIdentified = steamAppsDiff.map(app => { return {...app, identified:false }});

    await this.#databaseClient.insertManySteamApps(steamAppsDiffNonIdentified);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}

// extract
function delay(ms) {
  ms = ms || 2000;
  return new Promise(done => setTimeout(done, ms));
}