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

  async updateOne(collectionName, filter, data) {
    const updateResults = await this.#collections
      .get(collectionName)
      .updateOne(filter, data);
    console.log("Matched document =>", updateResults.matchedCount);
  }

  async deleteMany(collectionName, filter) {
    const deletedResults = await this.#collections
      .get(collectionName)
      .deleteMany(filter);
  }

  getXunidentifiedSteamApps( amount ) {
    return this.#collections.get("steam_apps")
                            .find({ identified: { $eq: false }})
                            .limit(amount);
  }

  identifySteamAppById(id) {
    this.#collections.get("steam_apps")
                     .updateOne(
                       { appid : { $eq : id }},
                       { $set: {identified: true}},
                      );
  }

  getXidentifiedGamesNoSteamchartsPlayerHistory( amount ) {
    return this.#collections.get("games")
                            .find({ $and: [{ identified: { $eq: true }}, {playerHistory : { $eq: false }}]})
                            .limit(amount);
  }

  updatePlayerHistoryById(id) {
    this.#collections.get("games")
                     .updateOne(
                       { appid : { $eq : id }},
                      );
  }
}
