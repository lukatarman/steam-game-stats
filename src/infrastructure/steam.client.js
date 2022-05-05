export class SteamClient {
  #httpClient;

  constructor(httpClient) {
    this.#httpClient = httpClient;
  }

  //teste commit

  getAppList() {
    const url = "https://api.steampowered.com/ISteamApps/GetAppList/v2";
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return this.#httpClient.get(url, options).data.applist.apps;
  }

  getCurrentPlayers(game) {
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${game.id}`;
    const options = { params: { key: "79E04F52C6B5AD21266624C05CC12E42" } };

    return this.#httpClient.get(url, options).data.response.player_count;
  }

  getSteamAppHtmlDetailsPage(id) {
    const url = `https://store.steampowered.com/app/${id}`;

    return this.#httpClient.get(url).data;
  }

  getSteamAppHtmlDetailsPageFromSteamcharts(steamApp) {
    const url = `https://steamcharts.com/app/${steamApp.id}`;

    return this.#httpClient.get(url).data;
  }
}
