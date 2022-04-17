import { diffMOCK } from "./services/diff.service";
import { tagNonIdentified } from "./services/tag.service";
import { delay } from "./services/time.service";

export class SteamDataAggregator {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  run() {
    // @todo: extract to initalUpdate
    const lastUpdate = this.#databaseClient.getLast('update_timestamps');
    if (moreThanXhoursPassedSince(24, lastUpdate)) this.#updateList();

    // @todo: extract into startUpdateIntervall
    // @todo: pass updater
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
    const steamApps = tagNonIdentified(diffMOCK(steamAppsApi, steamAppsDb));
    await this.#databaseClient.insertManySteamApps(steamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
