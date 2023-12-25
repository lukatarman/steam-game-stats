import { SteamApp } from "../models/steam.app.js";
import { ValidDataSources } from "../models/valid.data.sources.js";

export class SteamAppsRepository {
  #dbClient;
  #steamAppsCollection;

  constructor(dbClient) {
    this.#dbClient = dbClient;
    this.#steamAppsCollection = this.#dbClient.get("steam_apps");
  }

  async insertManySteamApps(data) {
    await this.#dbClient.insertMany("steam_apps", data);
  }

  async insertManyIfNotExist(steamApps = []) {
    const ops = steamApps.map((steamApp) => ({
      updateOne: {
        filter: { appid: steamApp.appid, name: steamApp.name },
        update: { $setOnInsert: steamApp },
        upsert: true,
      },
    }));

    await this.#steamAppsCollection.bulkWrite(ops);
  }

  async getAllSteamApps() {
    const response = await this.#dbClient.getAll("steam_apps");
    return SteamApp.manyFromDbEntries(response);
  }

  async updateSteamAppsById(steamApps) {
    await Promise.all(steamApps.map((steamApp) => this.#updateSteamAppById(steamApp)));
  }

  async #updateSteamAppById({ appid, triedVia, failedVia, type }) {
    await this.#steamAppsCollection.updateOne(
      { appid: { $eq: appid } },
      { $set: { triedVia, failedVia, type } },
    );
  }

  async getSteamWebUntriedFilteredSteamApps(amount) {
    const response = await this.#steamAppsCollection
      .find({
        $and: [
          { type: SteamApp.validTypes.unknown },
          { triedVia: { $ne: ValidDataSources.validDataSources.steamWeb } },
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
    const response = await this.#steamAppsCollection
      .find({
        $and: [
          { type: SteamApp.validTypes.unknown },
          {
            $and: [
              { triedVia: { $ne: ValidDataSources.validDataSources.steamcharts } },
              { triedVia: ValidDataSources.validDataSources.steamWeb },
            ],
          },
          { name: { $not: { $regex: /soundtrack$/, $options: "i" } } },
          { name: { $not: { $regex: /dlc$/, $options: "i" } } },
          { name: { $not: { $regex: /demo$/, $options: "i" } } },
        ],
      })
      .limit(amount)
      .toArray();

    return SteamApp.manyFromDbEntries(response);
  }

  async getSteamAppsById(ids) {
    const response = await Promise.all(ids.map((id) => this.getSteamAppById(id)));

    return SteamApp.manyFromDbEntries(response);
  }

  async getSteamAppById(id) {
    return await this.#steamAppsCollection.findOne({
      appid: id,
    });
  }

  async getSteamAppsCount() {
    return await this.#dbClient.getCount("steam_apps");
  }
}
