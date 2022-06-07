import Fastify from "fastify";

export class WebServer{
  #server;

  constructor(dbClient) {
    this.#server = Fastify({
      logger: true,
    });
    
    this.#server.get('/games/:id', async (request, reply) => {
      const id = parseInt(request.params.id);
      const response = await dbClient.getOneGameById(id);
      return response;
    })
  }

  async start() {
    console.log("Starting server...");
    try {
      await this.#server.listen(3000)
    } catch (err) {
      this.#server.log.error(err)
      process.exit(1)
    }
  }

  async stop() {
    console.log("Stopping server...");
    try {
      this.#server.close();
    } catch(err) {
      console.log("Caught error while attempting to stop server.")
    }
  }
}