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

  async insertOneUpdateTimestamp(date) {
    const updateTimestamp = { updatedOn: date };
    await this.insertOne("update_timestamps", updateTimestamp);
  }

  async insertOne(collectionName, data) {
    await this.#collections.get(collectionName).insertOne(data);
  }

  async insertManyHistoryChecks(data) {
    await this.insertMany("history_checks", data);
  }

  async insertManySteamApps(data) {
    await this.insertMany("steam_apps", data);
  }

  async insertManyGames(data) {
    await this.insertMany("games", data);
  }

  async insertMany(collectionName, data) {
    await this.#collections.get(collectionName).insertMany(data);
  }

  async getOneGameById(id) {
    return await this.#collections.get("games").findOne({ id });
  }

  async getAllGames() {
    return await this.getAll("games");
  }

  async getAllSteamApps() {
    const response = await this.getAll("steam_apps");
    return SteamApp.manyFromDbEntries(response);
  }

  async getAll(collectionName, filter = {}) {
    return await this.#collections.get(collectionName).find(filter).toArray();
  }

  async updateOne(collectionName, filter, data) {
    await this.#collections.get(collectionName).updateOne(filter, data);
  }

  async deleteMany(collectionName, filter) {
    await this.#collections.get(collectionName).deleteMany(filter);
  }

  async getLastUpdateTimestamp() {
    return this.getLast("update_timestamps");
  }

  async getLast(collectionName) {
    return await this.#collections
      .get(collectionName)
      .find()
      .limit(1)
      .sort({ $natural: -1 })
      .next();
  }

  async getSteamWebUntriedFilteredSteamApps(amount) {
    const response = await this.#collections
      .get("steam_apps")
      .find({
        $and: [
          { type: SteamApp.validTypes.unknown },
          { triedVia: { $ne: SteamApp.validDataSources.steamWeb } },
          { type: { $ne: SteamApp.validTypes.downloadableContent } },
          { name: { $not: { $regex: /soundtrack$/, $options: "i" } } },
          { name: { $not: { $regex: /dlc$/, $options: "i" } } },
          { name: { $not: { $regex: /demo$/, $options: "i" } } },
        ],
      })
      .limit(amount)
      .toArray();

    return SteamApp.manyFromDbEntries(response);
  }

  async getSteamchartsUntriedFilteredSteamApps(amount) {
    const response = await this.#collections
      .get("steam_apps")
      .find({
        $and: [
          { type: SteamApp.validTypes.unknown },
          {
            $and: [
              { triedVia: { $ne: SteamApp.validDataSources.steamCharts } },
              { triedVia: SteamApp.validDataSources.steamWeb },
            ],
          },
          { type: { $ne: SteamApp.validTypes.downloadableContent } },
          { name: { $not: { $regex: /soundtrack$/, $options: "i" } } },
          { name: { $not: { $regex: /dlc$/, $options: "i" } } },
          { name: { $not: { $regex: /demo$/, $options: "i" } } },
        ],
      })
      .limit(amount)
      .toArray();

    return SteamApp.manyFromDbEntries(response);
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

  async updateSteamAppsById(steamApps) {
    await Promise.all(steamApps.map((steamApp) => this.updateSteamAppById(steamApp)));
  }

  async updateSteamAppById({ appid, triedVia, type }) {
    await this.#collections
      .get("steam_apps")
      .updateOne({ appid: { $eq: appid } }, { $set: { triedVia, type } });
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

  async updatePlayerHistoriesById(games) {
    await Promise.all(games.map((game) => this.updatePlayerHistoryById(game)));
  }

  async updatePlayerHistoryById(game) {
    await this.#collections
      .get("games")
      .updateOne({ id: game.id }, { $set: { playerHistory: game.playerHistory } });
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

  async getXgamesSortedByCurrentPlayers(amount) {
    return await this.#collections
      .get("games")
      .aggregate([
        { $match: { playerHistory: { $ne: [] } } },
        { $addFields: { currentPlayers: { $last: "$playerHistory.players" } } },
        { $sort: { currentPlayers: -1 } },
        { $limit: amount },
      ])
      .toArray();
  }

  async getGamesBySearchTerm(term) {
    return await this.#collections
      .get("games")
      .aggregate([
        {
          $match: {
            $and: [
              { playerHistory: { $ne: [] } },
              { name: { $regex: ".*" + term + ".*", $options: "i" } },
            ],
          },
        },
        { $addFields: { currentPlayers: { $last: "$playerHistory.players" } } },
        { $sort: { currentPlayers: -1 } },
      ])
      .toArray();
  }
}
