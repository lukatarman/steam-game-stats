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

  async getTopTenGames() {
    return await this.#databaseClient.getCurrentTopTenPlayedGames();
  }
}
