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
    const filteredGames = this.#filterNonGamesMOCK(games);
    await this.#databaseClient.insertMany("games", filteredGames);
  }

  #filterNonGamesMOCK(games) {
    return games;
  }

  async sanitizeGamesListMOCK() {
    // const games = await this.#databaseClient.getAll("games", { game: [ 'true', 'undefined' ] });
    // for each game call steamcharts and check if the game has a page - here we will need a page crawler
    // update game object property "game" with true or false
    // store each game to the database
  }
}
