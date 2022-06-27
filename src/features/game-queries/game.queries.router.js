export class GameQueriesRouter {
  #controller;

  constructor(gameQueriesController) {
    this.#controller = gameQueriesController;
  }

  routes = async (server, options) => {
    server.get("/games", async (request, reply) => {
      return await this.#controller.getAllGames();
    });

    server.get("/games/:id", async (request, reply) => {
      const id = parseInt(request.params.id);

      return await this.#controller.getOneGameById(id);
    });
  };
}
