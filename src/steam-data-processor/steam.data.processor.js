import { filterGamesByName } from "./game.filter.utils";
import { crawlWebsiteForMissingDataMOCK } from "./website.crawler";

// rename to GameData
export class SteamDataProcessor {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  async createGamesList() {
    this.#getAllSteamApps();

    const sanitizedGames = this.#sanitizeGamesListMOCK();
    await this.#updateSanitizedGamesWithDatabase(sanitizedGames);
  }

  async #getAllSteamApps() {
    // get all the steam apps
    // store them to the db into the new collection
    const steamApps = await this.#steamClient.getAppList();
    await this.#databaseClient.insertMany("steam_apps", steamApps);
  }

  async #identifyGames() {
    // get all steam apps from our db
    // one by one check is it a game
    // if its a game, store it in the games collection
    // and get missing data { imageUrl, image }
    const steamApps = await this.#databaseClient.getAll("steam_apps");
    const games = filterGamesByName(steamApps);
    await crawlWebsiteForMissingDataMOCK(games);

    await this.#databaseClient.insertMany("games", games);
  }

  async #sanitizeGamesListMOCK() {
    const games = await this.#databaseClient.getAll("games", {
      isGame: undefined,
    });
    // for each game call steamcharts and check if the game has a page - here we will need a page crawler
    games.forEach((game) => {
      if (runCrawlerAndValidate(game)) {
        game.isGame = false;
      } else {
        game.isGame = true;
      }
    });
    // update game object property "game" with true or false
    // store each game to the database
    return games;
  }

  async #updateSanitizedGamesWithDatabase(games) {
    games.forEach((game) => {
      await this.#databaseClient.updateOne(
        { appid: { $eq: game.appid } },
        { $set: { isGame: game.isGame } }
      );
    });
  }
}
