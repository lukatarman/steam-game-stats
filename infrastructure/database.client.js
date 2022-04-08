import { MongoClient } from "mongodb";

export class DatabaseClient {
  #database;

  async init(
    options = {
      url: "mongodb://localhost:27017",
      databaseName: "game-stats",
    }
  ) {
    const mongodb = await MongoClient.connect(options.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.#database = mongodb.db(options.databaseName);
  }
}
