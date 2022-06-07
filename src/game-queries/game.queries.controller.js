export class GameQueriesController{
  #databaseClient

  constructor(databaseClient) {
    this.#databaseClient = databaseClient;
  }

  async getOneGameById(id) {
    return await this.#databaseClient.getOneGameById(id);
  }

  async 

}