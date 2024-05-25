import { Game } from "./game.js";
import { SteamApp } from "./steam.app.js";

export class SteamAppsAggregate {
  #apps;

  static manyFromDbEntries(steamApps) {
    const appsAggregate = new SteamAppsAggregate();
    appsAggregate.#apps = steamApps.map((app) => SteamApp.oneFromDbEntry(app));

    return appsAggregate;
  }

  static manyFromSteamApi(steamApps) {
    const appsAggregate = new SteamAppsAggregate();
    appsAggregate.#apps = steamApps.map((app) => SteamApp.oneFromSteamApi(app));

    return appsAggregate;
  }

  get ids() {
    return this.#apps.map((app) => app.appid);
  }

  get content() {
    return SteamAppsAggregate.manyFromDbEntries(structuredClone(this.#apps)).#apps;
  }

  get isEmpty() {
    return !this.#apps.length > 0;
  }

  identifyTypesViaSteamWeb(htmlDetailsPages) {
    this.#apps = this.#apps.map((app) => {
      const appCopy = app.copy();

      const page = this.#findPageForSteamAppById(htmlDetailsPages, appCopy.appid);

      appCopy.recordSteamWebCallAttempt(page);

      appCopy.updateAppTypeViaSteamWeb(page);

      return appCopy;
    });
  }

  #findPageForSteamAppById(htmlDetailsPages, steamAppId) {
    return htmlDetailsPages.find((page) => steamAppId === page.id).page;
  }

  extractGamesViaSteamWeb(htmlDetailsPages) {
    return this.#apps
      .filter((app) => app.isGame)
      .map((app) => {
        const page = this.#findPageForSteamAppById(htmlDetailsPages, app.appid);

        return Game.fromSteamApp(app, page);
      });
  }

  identifyTypesViaSteamApi(steamApiApps) {
    this.#apps = this.#apps.map((app) => {
      const appCopy = app.copy();

      const steamApiApp = this.#findSteamApiAppById(steamApiApps, appCopy.appid);

      appCopy.recordSteamApiCallAttempt(steamApiApp);

      appCopy.updateAppTypeViaSteamApi(steamApiApp);

      return appCopy;
    });
  }

  #findSteamApiAppById(steamApiApps, steamAppId) {
    return steamApiApps.find((app) => app.id === steamAppId);
  }

  extractGamesViaSteamApi(steamApiApps) {
    return this.#apps
      .filter((app) => app.isGame)
      .map((app) => {
        if (!app.isGame) return "";

        const steamApiApp = this.#findSteamApiAppById(steamApiApps, app.appid);

        return Game.fromSteamApi(steamApiApp);
      });
  }

  recordAttemptsViaSteamApi(steamApiApps) {
    this.#apps = this.#apps.map((app) => {
      const appCopy = app.copy();

      const steamApiApp = this.#findSteamApiAppById(steamApiApps, appCopy.appid);

      appCopy.recordSteamApiCallAttempt(steamApiApp);

      return appCopy;
    });
  }
}
