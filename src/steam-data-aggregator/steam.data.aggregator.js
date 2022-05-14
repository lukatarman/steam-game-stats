import { diff } from "./services/diff.service.js";
import { labelAsNotIdentified } from "./services/label.service.js";
import { 
  runFuncInLoopWithDelayOfXmsFromDate, 
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
    await this.#initialUpdate();

    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();

    runFuncInLoopWithDelayOfXmsFromDate(
      this.#updateSteamApps.bind(this), 
      this.#options.updateIntervalDelay, 
      lastUpdate,
    );
  }

  async #initialUpdate() {
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    if (!lastUpdate) {
      await this.#firstUpdate();
      return;
    }

    if (moreThanXhoursPassedSince(this.#options.updateIntervalDelay, lastUpdate)) this.#updateSteamApps();
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
    const steamApps    = diff(steamAppsApi, steamAppsDb);
    if (steamApps.length === 0) return;
    const enrichedSteamApps = labelAsNotIdentified(steamApps);
    await this.#databaseClient.insertManySteamApps(enrichedSteamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
