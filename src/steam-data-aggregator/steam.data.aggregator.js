import { delay } from "../shared/time.utils.js";
import { diff } from "./services/diff.service.js";
import { labelAsNotIdentified } from "./services/label.service.js";
import { 
  moreThanXhoursPassedSince ,
} from "./services/time.service.js";

export class SteamDataAggregator {
  #databaseClient;
  #steamClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
    this.#options = options;
  }

  async run() {
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    if (!lastUpdate) {
      await this.#firstUpdate();
      return;
    }

    if (moreThanXhoursPassedSince(this.#options.updateIntervalDelay, lastUpdate)) await this.#updateSteamApps();

    await delay(this.#options.updateIntervalDelay);
  }
  
  async #firstUpdate() {
    const steamApps = await this.#steamClient.getAppList();
    const enrichedSteamApps = labelAsNotIdentified(steamApps);
    await this.#databaseClient.insertManySteamApps(enrichedSteamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }

  async #updateSteamApps() {
    const steamAppsApi = await this.#steamClient.getAppList();
    const steamAppsDb  = await this.#databaseClient.getAllSteamApps();
    // TODO - sometimes there are more apps in steamAppsDb than in steamApps API.. Something is wrong, check
    const steamApps    = diff(steamAppsApi, steamAppsDb);
    if (steamApps.length === 0) {
      await this.#databaseClient.insertOneUpdateTimestamp(new Date());
      return
    };
    const enrichedSteamApps = labelAsNotIdentified(steamApps);
    await this.#databaseClient.insertManySteamApps(enrichedSteamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
