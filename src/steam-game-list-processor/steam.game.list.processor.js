import { filterSteamAppsByName, steamAppIsGame } from "./steam.app.utils.js";
import { Game } from "../models/game.js";

export class SteamGameListProcessor {
  #steamClient;
  #databaseClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  async addGamesToCollection() {
    setInterval()
    this.#getAllSteamApps();
    this.#identifyGames();
    
  }

  async #getAllSteamApps() {
    const steamApps = await this.#steamClient.getAppList();
    await this.#databaseClient.insertMany("steam_apps", steamApps);
  }

  // feature/NR-1 - Add bulk identification
  // get 10 not identified games
  // handle case if filteredSteamApps is empty
  // handle if games is empty
  // update steamApps elements identified property with true
  // as last store the steamApps as identified: true
  // run identification process in a loop
  async #identifyGames() {
    const steamApps = await this.#databaseClient.getAppList();
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    const games = this.#filterSteamAppsByAppType(filteredSteamApps);

    this.#databaseClient.insertMany("games", games);
  }

  async #runIdentification() {
    while(true) {
      const steamApps = await this.#databaseClient.getXunidentifiedSteamApps(10);
      if(steamApps.length === 0) {
        // todo: implement delayHours()
        await delayHours(24);
        continue;
      }

      await this.#identifyGamesXXX(steamApps);
    }
  }
  
  async #identifyGamesXXX(steamApps) {
    const filteredSteamApps = filterSteamAppsByName(steamApps);
    if(filteredSteamApps.length) {
      const games = this.#filterSteamAppsByAppType(filteredSteamApps);
      if(games.length) {
        this.#databaseClient.insertMany("games", games);
      }
    }
    for(let steamApp of steamApps) {
      this.#databaseClient.updateOne("steam_apps", { appid : { $eq : steamApp.appid }}, { $set: {identified: true}} );
    }
  }

  async #filterSteamAppsByAppType(steamApps) {
    const games = [];

    for (let steamApp in steamApps) {
      const detailsPage = await this.#steamClient.getAppDetailsPage(steamApp);

      if (steamAppIsGame(detailsPage)) {
        games.push(new Game(steamApp));
        continue;
      }

      try {
        await this.#steamClient.getAppDetailsSteamcharts(steamApp);
      } catch (error) {
        if (error.status === 500) continue;
      }

      games.push(new Game(steamApp));
    }

    return games;
  }
}
