import Fastify from "fastify";

export class WebServer{
  #server;

  constructor(dbClient) {
    this.#server = Fastify({
      logger: true,
    });
    
    this.#server.get('/', function (request, reply) {
      reply.send({ hello: 'world' })
    })
  }

  start() {
    this.#server.listen(3000, function (err, address) {
      if (err) {
        this.#server.log.error(err)
        process.exit(1)
      }
    })
  }

  stop() {
    
  }
}