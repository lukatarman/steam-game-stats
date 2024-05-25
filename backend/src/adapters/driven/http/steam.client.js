import { SteamAppRaw } from "../../../core/models/steam.app.raw.js";
import { SteamAppsAggregate } from "../../../core/models/steam.apps.aggregate.js";

export class SteamClient {
  #httpClient;
  #options;

  constructor(httpClient, options) {
    this.#httpClient = httpClient;
    this.#options = options;
  }

  async getAppList() {
    const { host } = this.#options.steamApiOfficial;
    const url = `${host}/ISteamApps/GetAppList/v2`;

    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };
    const response = await this.#httpClient.get(url, options);

    return SteamAppsAggregate.manyFromSteamApi(response.data.applist.apps);
  }

  async getCurrentPlayers(game) {
    const { host } = this.#options.steamApiOfficial;
    const url = `${host}/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${game.id}`;

    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return (await this.#httpClient.get(url, options)).data.response.player_count;
  }

  async getAllCurrentPlayersConcurrently(games) {
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };
    const { host } = this.#options.steamApiOfficial;
    const url = `${host}/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=`;

    return (
      await Promise.all(
        games.map((game) => this.#httpClient.get(url + game.id, options).catch(() => 0)),
      )
    ).map((player) => (player ? player.data.response.player_count : 0));
  }

  // TODO https://github.com/lukatarman/steam-game-stats/issues/192
  async getSteamWebHtmlDetailsPage(id) {
    const { host } = this.#options.steamWeb;
    const url = `${host}/app/${id}`;

    try {
      return (await this.#httpClient.get(url)).data;
    } catch (err) {
      return "";
    }
  }

  async getSteamchartsGameHtmlDetailsPage(id) {
    const { host } = this.#options.steamcharts;
    const url = `${host}/app/${id}`;

    return (await this.#httpClient.get(url)).data;
  }

  async getSteamAppViaSteamApi(steamAppId) {
    const { host } = this.#options.steamApi;
    const url = `${host}/appdetails?appids=${steamAppId}`;

    try {
      const response = (await this.#httpClient.get(url)).data[`${steamAppId}`];

      if (!response.success) return "";

      return new SteamAppRaw(response.data);
    } catch (error) {
      return "";
    }
  }
}
