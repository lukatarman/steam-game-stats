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
    const url = this.#options.steamApi.appList;
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };
    const response = await this.#httpClient.get(url, options);

    return SteamAppsAggregate.manyFromSteamApi(response.data.applist.apps);
  }

  async getCurrentPlayers(game) {
    const url = `${this.#options.steamApi.currentPlayersForApps}${game.id}`;
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return (await this.#httpClient.get(url, options)).data.response.player_count;
  }

  async getAllCurrentPlayersConcurrently(games) {
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };
    const url = this.#options.steamApi.currentPlayersForApps;

    return (
      await Promise.all(
        games.map((game) => this.#httpClient.get(url + game.id, options).catch(() => 0)),
      )
    ).map((player) => (player ? player.data.response.player_count : 0));
  }

  // TODO https://github.com/lukatarman/steam-game-stats/issues/192
  async getSteamWebHtmlDetailsPage(id) {
    const url = `${this.#options.steamWeb}${id}`;

    try {
      return (await this.#httpClient.get(url)).data;
    } catch (err) {
      return "";
    }
  }

  async getSteamchartsGameHtmlDetailsPage(id) {
    const url = `${this.#options.steamcharts}${id}`;

    return (await this.#httpClient.get(url)).data;
  }

  async getSteamAppViaSteamApi(steamAppId) {
    try {
      const response = (
        await this.#httpClient.get(`${this.#options.steamApi.appDetails}${steamAppId}`)
      ).data[`${steamAppId}`];

      if (!response.success) return "";

      return new SteamAppRaw(response.data);
    } catch (error) {
      return "";
    }
  }
}
