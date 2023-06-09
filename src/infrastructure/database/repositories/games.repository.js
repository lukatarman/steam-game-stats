import { Game } from "../../../models/game.js";

export class GamesRepository {
  #dbClient;

  constructor(dbClient) {
    this.#dbClient = dbClient;
  }

  async insertManyGames(data) {
    await this.#dbClient.insertMany("games", data);
  }

  async getOneGameById(id) {
    return await this.#dbClient.get("games").findOne({ id });
  }

  async getAllGames() {
    return await this.#dbClient.getAll("games");
  }

  async getXgamesWithUncheckedPlayerHistory(amount) {
    return (
      await this.#dbClient
        .get("history_checks")
        .aggregate([
          { $limit: amount },
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
        ])
        .toArray()
    ).map((dbEntry) => Game.fromDbEntry(dbEntry));
  }

  async getXgamesCheckedMoreThanYmsAgo(amount, ms) {
    return (
      await this.#dbClient
        .get("games")
        .aggregate([
          { $limit: amount },
          {
            $addFields: {
              lastHistory: { $last: "$playerHistory" },
            },
          },
          {
            $addFields: {
              lastUpdateDate: { $last: "$lastHistory.trackedPlayers.date" },
            },
          },
          {
            $match: {
              $or: [
                { playerHistory: { $eq: [] } },
                { lastUpdateDate: { $lt: new Date(Date.now() - ms) } },
              ],
            },
          },
          { $unset: "lastUpdateDate" },
          { $unset: "lastHistory" },
        ])
        .toArray()
    ).map((dbEntry) => Game.fromDbEntry(dbEntry));
  }

  async getXgamesSortedByCurrentPlayers(amount) {
    return await this.#dbClient
      .get("games")
      .aggregate([
        { $match: { playerHistory: { $ne: [] } } },
        { $addFields: { lastPlayerHistory: { $last: "$playerHistory" } } },
        {
          $addFields: {
            currentPlayers: { $last: "$lastPlayerHistory.trackedPlayers.players" },
          },
        },
        { $unset: "lastPlayerHistory" },
        { $sort: { currentPlayers: -1 } },
        { $limit: amount },
      ])
      .toArray();
  }

  async getGamesBySearchTerm(term) {
    return await this.#dbClient
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
        { $addFields: { lastPlayerHistory: { $last: "$playerHistory" } } },
        {
          $addFields: {
            currentPlayers: { $last: "$lastPlayerHistory.trackedPlayers.players" },
          },
        },
        { $unset: "lastPlayerHistory" },
        { $sort: { currentPlayers: -1 } },
        { $limit: 15 },
      ])
      .toArray();
  }
}
