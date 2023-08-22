import Fastify from "fastify";
import cors from "@fastify/cors";

export class WebServer {
  #server;

  constructor(gameQueriesRouter, logger) {
    this.#server = Fastify({ logger: logger.config });

    this.#server.register(cors, gameQueriesRouter.routes);
  }

  async start() {
    this.#server.log.info("starting server...");
    try {
      await this.#server.listen(3000);
    } catch (err) {
      this.#server.log.error(err);
      process.exit(1);
    }
  }

  async stop() {
    this.#server.log.info("stopping server...");
    try {
      this.#server.close();
    } catch (err) {
      this.#server.log.error(err, "stopping server failed");
    }
  }
}
