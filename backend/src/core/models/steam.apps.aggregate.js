import { SteamApp } from "./steam.app.js";

export class SteamAppsAggregate {
  apps;
  logger;

  static manyFromDbEntries(apps, logger) {
    const steamAppsAggregate = new SteamAppsAggregate();
    steamAppsAggregate.apps = apps.map((app) => SteamApp.oneFromDbEntry(app));
    steamAppsAggregate.logger = logger;

    return steamAppsAggregate;
  }

  checkIfEmpty(delay) {
    if (this.apps.length > 0) return false;

    this.logger.debugc(`no steam apps in db, retry in: ${delay} ms`);

    return true;
  }
}
