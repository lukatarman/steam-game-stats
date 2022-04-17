import { MongoClient } from "mongodb";

export class DatabaseClient {
  #collections;

  async init(
    options = {
      url: "mongodb://localhost:27017",
      databaseName: "game-stats",
      collections: ["games"],
    }
  ) {
    const mongodb = await MongoClient.connect(options.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const database = mongodb.db(options.databaseName);

    this.#collections = new Map();
    options.collections.forEach((c) =>
      this.#collections.set(c, database.collection(c))
    );

    return this;
  }

  async insertMany(collectionName, data) {
    const insertResult = await this.#collections
      .get(collectionName)
      .insertMany(data);
    console.log("Inserted documents =>", insertResult);
  }

  async getAll(collectionName, filter = {}) {
    const getAllResults = await this.#collections
      .get(collectionName)
      .find(filter);
  }

  async updateOne(collectionName, filter, options) {
    const updateResults = await this.#collections
      .get(collectionName)
      .updateOne(filter, options);
    console.log("Matched document =>", updateResults.matchedCount);
  }

  async deleteMany(collectionName, filter) {
    const deletedResults = this.#collections
      .get(collectionName)
      .deleteMany(filter);
  }

  async getLast(collectionName) {
    const result = await this.collection
      .get(collectionName)
      .find()
      .limit(1)
      .sort({ $natural: -1 });

      return result;
  }
}
