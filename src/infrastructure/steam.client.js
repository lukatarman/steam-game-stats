export class SteamClient {
  #httpClient;

  constructor(httpClient) {
    this.#httpClient = httpClient;
  }

  async getAppList() {
    const url = "https://api.steampowered.com/ISteamApps/GetAppList/v2";
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return (await this.#httpClient.get(url, options)).data.applist.apps;
  }

  async getCurrentPlayers(game) {
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${game.id}`;
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return (await this.#httpClient.get(url, options)).data.response.player_count;
  }

  async getAllCurrentPlayersConcurrently(games) {
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return (await Promise.all(games.map(game => {
      const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${game.id}`;
      return this.#httpClient.get(url, options).catch(err => console.log(error));
    }))).map(player => player.data.response.player_count);
  }

  async getSteamAppHtmlDetailsPage(id) {
    const url = `https://store.steampowered.com/app/${id}`;

    return (await this.#httpClient.get(url)).data;
  }

  async getSteamchartsGameHtmlDetailsPage(id) {
    const url = `https://steamcharts.com/app/${id}`;

    return (await this.#httpClient.get(url)).data;
  }
}
