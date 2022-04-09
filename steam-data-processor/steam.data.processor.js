export class SteamDataProcessor {
  #databaseClient;
  #httpClient;

  constructor(httpClient, databaseClient) {
    this.#httpClient = httpClient;
    this.#databaseClient = databaseClient;
  }

  async createGamesList() {
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };
    const url = "https://api.steampowered.com/ISteamApps/GetAppList/v2";
    const games = await this.#httpClient.get(url, options).data.applist.apps;
    const filteredGames = this.#filterNonGames(games);
    await this.#databaseClient.insertMany("games", filteredGames);
    const sanitizedGames = this.#sanitizeGamesListMOCK();
    await this.#updateSanitizedGamesWithDatabase(sanitizedGames);
  }

  #filterNonGames(games) {
    for (let game of games) {
      if (this.#filterByGameName(game)) {
        game.isGame = false;
      }
    }
    return games;
  }

  //The names for non games is very inconsistent, only included ones that are for sure not games
  #filterByGameName(game) {
    if (game.isGame === undefined) {
      const lowercaseGameName = game.name.toLowerCase();

      if (lowercaseGameName.match(/dlc$/)) return true;

      if (lowercaseGameName.match(/soundtrack$/)) return true;

      return false;
    }
  }

  async #sanitizeGamesListMOCK() {
    const games = await this.#databaseClient.getAll("games", {
      game: undefined,
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
