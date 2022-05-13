import { diff } from "./services/diff.service.js";
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
    this.#initialUpdate();

    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    // NEEDS FIXING - app still waiting for this function to keep repeating!
    runFuncInLoopWithDelayOfXmsFromDate(
      this.#updateSteamApps.bind(this), 
      this.#options.updateIntervalDelay, 
      lastUpdate,
    );
  }

  async #initialUpdate() {
    const lastUpdate = await this.#databaseClient.getLastUpdateTimestamp();
    if (!lastUpdate) this.#firstUpdate();
    if (moreThanXhoursPassedSince(this.#options.updateIntervalDelay, lastUpdate)) this.#updateSteamApps();
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
    if (steamApps.length === 0) return;
    await this.#databaseClient.insertManySteamApps(steamApps);
    await this.#databaseClient.insertOneUpdateTimestamp(new Date());
  }
}
