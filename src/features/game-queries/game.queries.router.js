export class GameQueriesRouter {
  #controller;

  constructor(gameQueriesController) {
    this.#controller = gameQueriesController;
  }

  // I will approve and we will merge it. But there is one thing which we can't solve with the way our webserver routes and controllers are setup.
  //Unfortunately we can't test the route layer but its having logic which needs to be tested.
  //Can you create another PR for that and call it route layer refactoring?
  //You can think of how we have to refactor it to be able to test it but don't stress it, its not obvious. I also need to think a bit about it

  routes = async (server, options) => {
    server.get("/games", async (request, reply) => {
      const limit = request.query.limit ? request.query.limit : 10;

      if (request.query.sort) return await this.#controller.getTopXgames(parseInt(limit));

      return await this.#controller.getAllGames();
    });

    server.get("/games/:id", async (request, reply) => {
      const id = parseInt(request.params.id);

      return await this.#controller.getOneGameById(id);
    });
  };
}
