import { Game } from "./game.js";
import { SteamApp } from "./steam.app.js";

export class SteamAppsAggregate {
  #apps;

  constructor(steamApps) {
    this.#apps = steamApps.map((app) => SteamApp.oneFromDbEntry(app));
  }

  get content() {
    return this.#apps;
  }

  get isEmpty() {
    if (this.#apps.length > 0) return false;

    return true;
  }

  identifyTypes(htmlDetailsPages, source) {
    this.#apps = this.#apps.map((app) => {
      const appCopy = app.copy();

      const page = this.#findSteamAppHtmlDetailsPage(htmlDetailsPages, appCopy.appid);

      appCopy.recordHtmlAttempt(page, source);

      appCopy.updateSteamAppType(page, source);

      return appCopy;
    });
  }

  #findSteamAppHtmlDetailsPage(htmlDetailsPages, steamAppId) {
    return htmlDetailsPages.find((page) => steamAppId === page.id).page;
  }

  extractGames(htmlDetailsPages) {
    return this.#apps
      .map((app) => {
        if (!app.isGame) return "";

        const page = this.#findSteamAppHtmlDetailsPage(htmlDetailsPages, app.appid);

        return Game.fromSteamApp(app, page);
      })
      .filter((game) => !!game);
  }

  recordAttemptsViaSource(htmlDetailsPages, source) {
    this.#apps = this.#apps.map((app) => {
      const appCopy = app.copy();
      const currentPage = this.#findSteamAppHtmlDetailsPage(
        htmlDetailsPages,
        appCopy.appid,
      );

      appCopy.recordHtmlAttempt(currentPage, source);

      return appCopy;
    });
  }
}
