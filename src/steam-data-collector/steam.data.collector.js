export class SteamDataCollector {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  run() {
    const lastUpdate = this.#databaseClient.getLast('update_timestamps');
    const now = new Date();
    const milliseconds = Math.abs(now - lastUpdate);
    const hours = milliseconds / 36e5;

    if (hours > 24) this.#updateList();


  }

  #updateList() {

  }
}