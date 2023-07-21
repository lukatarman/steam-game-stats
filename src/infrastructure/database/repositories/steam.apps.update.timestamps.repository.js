export class SteamAppsUpdateTimestampsRepository {
  #dbClient;

  constructor(dbClient) {
    this.#dbClient = dbClient;
  }

  async insertOneSteamAppsUpdateTimestamp(date) {
    const updateTimestamp = { updatedOn: date };
    await this.#dbClient.insertOne("steam_apps_update_timestamps", updateTimestamp);
  }

  async getLastSteamAppsUpdateTimestamp() {
    return this.#dbClient.getLast("steam_apps_update_timestamps");
  }
}
