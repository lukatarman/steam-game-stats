export class GameQueriesController {
  #databaseClient;

  constructor(databaseClient) {
    this.#databaseClient = databaseClient;
  }

  async getOneGameById(id) {
    return await this.#databaseClient.getOneGameById(id);
  }

  async getAllGames() {
    return await this.#databaseClient.getAllGames();
  }

  async getTopXgames(amount) {
    return await this.#databaseClient.getXgamesSortedByCurrentPlayers(amount);
  }

  async getGamesBySearchTerm(term) {
    return await this.#databaseClient.getGameBySearchTerm(term);
  }
}
