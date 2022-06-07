import Fastify from "fastify";

export class WebServer {
  #server;

  constructor(gameQueriesRouter) {
    this.#server = Fastify({
      logger: true,
    });

    this.#server.register(gameQueriesRouter.routes);
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