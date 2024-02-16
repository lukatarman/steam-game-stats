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

  checkIfEmpty(delay) {
    if (this.apps.length > 0) return false;

    this.logger.debugc(`no steam apps in db, retry in: ${delay} ms`);

    return true;
  }
}
