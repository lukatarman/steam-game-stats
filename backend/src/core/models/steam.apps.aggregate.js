import { Game } from "./game.js";
import { SteamApp } from "./steam.app.js";

export class SteamAppsAggregate {
  #apps;

  static manyFromDbEntries(steamApps) {
    const steamAppsAggregate = new SteamAppsAggregate();
    steamAppsAggregate.#apps = steamApps.map((app) => SteamApp.oneFromDbEntry(app));

    return steamAppsAggregate;
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

      const page = this.#findSteamAppHtmlDetailsPage(htmlDetailsPages, appCopy);

      appCopy.recordHtmlAttempt(page, source);

      appCopy.updateSteamAppType(page, source);

      return appCopy;
    });
  }

  #findSteamAppHtmlDetailsPage(htmlDetailsPages, steamApp) {
    return htmlDetailsPages.find((page) => steamApp.appid === page.id).page;
  }

  extractGames(htmlDetailsPages) {
    return this.#apps
      .map((app) => {
        if (!app.isGame) return "";

        const page = this.#findSteamAppHtmlDetailsPage(htmlDetailsPages, app);

        return Game.fromSteamApp(app, page);
      })
      .filter((game) => !!game);
  }

  recordAttemptsViaSource(htmlDetailsPages, source) {
    this.#apps = this.#apps.map((app) => {
      const appCopy = app.copy();
      const currentPage = this.#findSteamAppHtmlDetailsPage(htmlDetailsPages, appCopy);

      appCopy.recordHtmlAttempt(currentPage, source);

      return appCopy;
    });
  }
}
