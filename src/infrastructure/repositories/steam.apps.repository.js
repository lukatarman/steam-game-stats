import { SteamApp } from "../models/steam.app.js";

export class SteamAppsReposrtory {
  #dbClient;

  constructor(dbClient) {
    this.#dbClient = dbClient;
  }

  async insertManySteamApps(data) {
    await this.#dbClient.insertMany("steam_apps", data);
  }

  async getAllSteamApps() {
    const response = await this.#dbClient.getAll("steam_apps");
    return SteamApp.manyFromDbEntries(response);
  }

  async getXunidentifiedFilteredSteamApps(amount) {
    return await this.#dbClient
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
    await this.#dbClient
      .get("steam_apps")
      .updateOne({ appid: { $eq: id } }, { $set: { identified: true } });
  }
}
