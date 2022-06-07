export class GameQueriesRouter{
  #controller

  constructor(gameQueriesController) {
    this.#controller = gameQueriesController;
  }

  routes() {
    this.#server.get("/games", async (request, reply) => {
      

      return request?.query?.name ? 
      request.query.name :
      "all games";
    });

    this.#server.get("/games/:id", async (request, reply) => {
      const id = parseInt(request.params.id);

      return await this.#controller.getOneGameById(id);
    });
  }
}