import { MongoClient } from "mongodb";
import { Game } from "../models/game.js";
import { SteamApp } from "../models/steam.app.js";

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
    options.collections.forEach((c) => this.#collections.set(c, database.collection(c)));

    return this;
  }

  // low level
  async insertOne(collectionName, data) {
    await this.#collections.get(collectionName).insertOne(data);
  }

  async insertMany(collectionName, data) {
    await this.#collections.get(collectionName).insertMany(data);
  }

  async getAll(collectionName, filter = {}) {
    return await this.#collections.get(collectionName).find(filter).toArray();
  }

  async get(collectionName) {
    return await this.#collections.get(collectionName);
  }

  async updateOne(collectionName, filter, data) {
    await this.#collections.get(collectionName).updateOne(filter, data);
  }

  async deleteMany(collectionName, filter) {
    await this.#collections.get(collectionName).deleteMany(filter);
  }

  async getLast(collectionName) {
    return await this.#collections
      .get(collectionName)
      .find()
      .limit(1)
      .sort({ $natural: -1 })
      .next();
  }

  // [x] timestamp
  async insertOneUpdateTimestamp(date) {
    const updateTimestamp = { updatedOn: date };
    await this.insertOne("update_timestamps", updateTimestamp);
  }

  async getLastUpdateTimestamp() {
    return this.getLast("update_timestamps");
  }

  // [x] history checks
  async insertManyHistoryChecks(data) {
    await this.insertMany("history_checks", data);
  }

  async updateHistoryChecks(historyChecks) {
    await Promise.all(
      historyChecks.map((historyCheck) =>
        this.#collections.get("history_checks").updateOne(
          { gameId: { $eq: historyCheck.gameId } },
          {
            $set: {
              checked: historyCheck.checked,
              found: historyCheck.found,
              source: historyCheck.source,
            },
          },
        ),
      ),
    );
  }

  // steam apps
  async insertManySteamApps(data) {
    await this.insertMany("steam_apps", data);
  }

  async getAllSteamApps() {
    const response = await this.getAll("steam_apps");
    return SteamApp.manyFromDbEntries(response);
  }

  async getXunidentifiedFilteredSteamApps(amount) {
    return await this.#collections
      .get("steam_apps")
      .find({
        $and: [
          { name: { $not: { $regex: /soundtrack$/, $options: "i" } } },
          { name: { $not: { $regex: /dlc$/, $options: "i" } } },
        ],
      })
      .limit(amount)
      .toArray();
  }

  async identifySteamAppsById(steamApps) {
    await Promise.all(
      steamApps.map((steamApp) => this.identifySteamAppById(steamApp.appid)),
    );
  }

  async identifySteamAppById(id) {
    await this.#collections
      .get("steam_apps")
      .updateOne({ appid: { $eq: id } }, { $set: { identified: true } });
  }

  // games
  async insertManyGames(data) {
    await this.insertMany("games", data);
  }

  async getOneGameById(id) {
    return await this.#collections.get("games").findOne({ id });
  }

  async getAllGames() {
    return await this.getAll("games");
  }

  async getXgamesWithoutPlayerHistory(amount) {
    return (
      await this.#collections
        .get("games")
        .find({ playerHistory: { $eq: [] } })
        .limit(amount)
        .toArray()
    ).map((dbEntry) => Game.fromDbEntry(dbEntry));
  }

  async getXgamesWithUncheckedPlayerHistory(amount) {
    return (
      await this.#collections
        .get("history_checks")
        .aggregate([
          {
            $lookup: {
              from: "games",
              localField: "gameId",
              foreignField: "id",
              as: "game",
            },
          },
          { $match: { checked: false } },
          { $unwind: "$game" },
          { $replaceWith: "$game" },
          { $limit: amount },
        ])
        .toArray()
    ).map((dbEntry) => Game.fromDbEntry(dbEntry));
  }

  async getXgamesCheckedMoreThanYmsAgo(amount, ms) {
    return (
      await this.#collections
        .get("history_checks")
        .aggregate([
          {
            $lookup: {
              from: "games",
              localField: "gameId",
              foreignField: "id",
              as: "game",
            },
          },
          { $match: { checked: true } },
          { $unwind: "$game" },
          { $replaceWith: "$game" },
          { $addFields: { lastUpdateDate: { $last: "$playerHistory.date" } } },
          { $match: { lastUpdateDate: { $lt: new Date(Date.now() - ms) } } },
          { $unset: "lastUpdateDate" },
          { $limit: amount },
        ])
        .toArray()
    ).map((dbEntry) => Game.fromDbEntry(dbEntry));
  }

  // player history
  async updatePlayerHistoriesById(games) {
    await Promise.all(games.map((game) => this.updatePlayerHistoryById(game)));
  }

  async updatePlayerHistoryById(game) {
    await this.#collections
      .get("games")
      .updateOne({ id: game.id }, { $set: { playerHistory: game.playerHistory } });
  }
}
