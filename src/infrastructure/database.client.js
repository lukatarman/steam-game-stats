import { MongoClient } from "mongodb";

export class DatabaseClient {
  #collections;

  async init(options) {
    const urlToDb = `${options.url}/${options.databaseName}`;
    const mongodb = await MongoClient.connect(urlToDb, {
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

  async insertOneUpdateTimestamp(date) {
    const updateTimestamp = { updatedOn: date };
    await this.insertOne("update_timestamps", updateTimestamp);
  }

  async insertOne(collectionName, data) {
    await this.#collections
      .get(collectionName)
      .insertOne(data);
  }

  async insertManySteamApps(data) {
    await this.insertMany("steam_apps", data);
  }

  async insertManyGames(data) {
    await this.insertMany("games", data);
  }

  async insertMany(collectionName, data) {
    const insertResult = await this.#collections
      .get(collectionName)
      .insertMany(data);
    console.log("Inserted documents =>", insertResult);
  }

  getAllSteamApps(filter = {}) {
    return this.getAll("steam_apps", filter);
  }

  async getAll(collectionName, filter = {}) {
            return await this.#collections
                             .get(collectionName)
                             .find(filter)
                             .toArray();
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

  async getLastUpdateTimestamp() {
    return this.getLast("update_timestamps");
  }

  async getLast(collectionName) {
    const result = await this.#collections
      .get(collectionName)
      .find()
      .limit(1)
      .sort({ $natural: -1 })
      .next();

      return result;
  }

  async getXunidentifiedSteamApps(amount) {
      return await this.#collections.get("steam_apps")
                                    .find({ identified: { $eq: false }})
                                    .limit(amount)
                                    .toArray();
  }

  identifySteamAppById(id) {
    this.#collections.get("steam_apps")
                     .updateOne(
                       { appid: { $eq: id }},
                       { $set: {identified: true}},
                      );
  }

  async getXgamesWithoutPlayerHistory(amount) {
      return await this.#collections.get("games")
                                    .find({ checkedSteamchartsHistory: { $eq: false }})
                                    .limit(amount)
                                    .toArray();
  }

  updatePlayerHistoryById(game) {
    this.#collections.get("games")
                     .updateOne(
                       { id: { $eq: game.id }},
                       { $set: 
                        {
                          playerHistory: game.playerHistory,
                          checkedSteamchartsHistory: game.checkedSteamchartsHistory,
                        }
                       }
                      );
  }

  async getXgamesWithCheckedSteamchartsHistory(amount) {
    return await this.#collections.get("games")
                                  .find({ checkedSteamchartsHistory: { $eq: true }})
                                  .limit(amount)
                                  .toArray();
}
}
