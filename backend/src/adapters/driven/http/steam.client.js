import { SteamApp } from "../../../core/models/steam.app.js";
import { ValidDataSources } from "../../../core/models/valid.data.sources.js";

export class SteamClient {
  #httpClient;

  constructor(httpClient) {
    this.#httpClient = httpClient;
  }

  async getAppList() {
    const url = "https://api.steampowered.com/ISteamApps/GetAppList/v2";
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };
    const response = await this.#httpClient.get(url, options);

    return SteamApp.manyFromSteamApi(response.data.applist.apps);
  }

  async getCurrentPlayers(game) {
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${game.id}`;
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return (await this.#httpClient.get(url, options)).data.response.player_count;
  }

  async getAllCurrentPlayersConcurrently(games) {
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=`;

    return (
      await Promise.all(
        games.map((game) => this.#httpClient.get(url + game.id, options).catch(() => 0)),
      )
    ).map((player) => (player ? player.data.response.player_count : 0));
  }

  // TODO https://github.com/lukatarman/steam-game-stats/issues/192
  async getSourceHtmlDetailsPage(id, source) {
    const url = this.getSourceUrl(id, source);

    try {
      return (await this.#httpClient.get(url)).data;
    } catch (err) {
      return "";
    }
  }

  async getSteamWebHtmlDetailsPage(id) {
    const url = `https://store.steampowered.com/app/${id}`;

    try {
      return (await this.#httpClient.get(url)).data;
    } catch (err) {
      return "";
    }
  }

  getSourceUrl(id, source) {
    switch (source) {
      case ValidDataSources.validDataSources.steamWeb:
        return `https://store.steampowered.com/app/${id}`;

      case ValidDataSources.validDataSources.steacharts:
        return `https://steamcharts.com/app/${id}`;

      case ValidDataSources.validDataSources.steamDb:
        return `https://steamdb.info/app/${id}/info/`;
    }
  }
}
