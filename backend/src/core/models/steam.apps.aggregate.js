import { Game } from "./game.js";
import { SteamApp } from "./steam.app.js";

export class SteamAppsAggregate {
  apps;
  logger;

  static manyFromDbEntries(steamApps, logger) {
    const steamAppsAggregate = new SteamAppsAggregate();
    steamAppsAggregate.apps = steamApps.map((app) => SteamApp.oneFromDbEntry(app));
    steamAppsAggregate.logger = logger;

    return steamAppsAggregate;
  }

  getIds() {
    return this.apps.map((app) => app.appid);
  }

  checkIfEmpty(delay) {
    if (this.apps.length > 0) return false;

    this.logger.debugc(`no steam apps in db, retry in: ${delay} ms`);

    return true;
  }

  identifyTypes(htmlDetailsPages, source) {
    this.apps = this.apps.map((app) => {
      const appCopy = app.copy();

      const page = htmlDetailsPages.find((page) => page.id === appCopy.appid).page;

      appCopy.recordHtmlAttempt(page, source);

      appCopy.updateSteamAppType(page, source);

      return appCopy;
    });
  }

  extractGames(pages) {
    return this.apps
      .map((app) => {
        if (!app.isGame) return "";

        const page = pages.find((page) => page.id === app.appid).page;

        return Game.fromSteamApp(app, page);
      })
      .filter((game) => !!game);
  }

  recordAttemptsViaSource(pages, source) {
    this.apps = this.apps.map((app) => {
      const appCopy = app.copy;
      const currentPage = pages.find((page) => page.id === app.appid);

      appCopy.recordHtmlAttempt(currentPage.page, source);

      return appCopy;
    });
  }
}
