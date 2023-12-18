import { ValidDataSources } from "./valid.data.sources.js";

export class SteamApp {
  appid;
  name;
  type;
  triedVia;
  failedVia;
  static validTypes = this.#createValidTypesEnum([
    "game",
    "downloadableContent",
    "unknown",
  ]);

  copy() {
    const copy = new SteamApp();
    copy.appid = this.appid;
    copy.name = this.name;
    copy.type = this.type;
    copy.triedVia = this.triedVia.slice();
    copy.failedVia = this.failedVia.slice();

    return copy;
  }

  triedIfGameViaSource(source) {
    this.triedVia.push(source);
  }

  htmlPageFailedViaSource(source) {
    this.failedVia.push(source);
  }

  triedViaSteamWeb() {
    this.triedVia.push(ValidDataSources.validDataSources.steamWeb);
  }

  triedViaSteamchartsWeb() {
    this.triedVia.push(ValidDataSources.validDataSources.steamcharts);
  }

  triedViaSteamDb() {
    this.triedVia.push(ValidDataSources.validDataSources.steamDb);
  }

  failedViaSteamWeb() {
    this.failedVia.push(ValidDataSources.validDataSources.steamWeb);
  }

  failedViaSteamchartsWeb() {
    this.failedVia.push(ValidDataSources.validDataSources.steamcharts);
  }

  failedViaSteamDb() {
    this.failedVia.push(ValidDataSources.validDataSources.steamDb);
  }

  isGame() {
    return this.type === SteamApp.validTypes.game;
  }

  set appType(type) {
    this.type = type;
  }

  static #createValidTypesEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
  }

  static manyFromSteamApi(apps) {
    return apps.map((app) => SteamApp.oneFromSteamApi(app));
  }

  // prettier-ignore
  static oneFromSteamApi(data) {
    const steamApp      = new SteamApp();
    steamApp.appid      = data.appid;
    steamApp.name       = data.name;
    steamApp.type       = SteamApp.validTypes.unknown;
    steamApp.triedVia   = [];
    steamApp.failedVia  = [];
    return steamApp;
  }

  static manyFromDbEntries(dbEntries) {
    return dbEntries.map((dbEntry) => SteamApp.oneFromDbEntry(dbEntry));
  }

  // prettier-ignore
  static oneFromDbEntry(dbEntry) {
    const steamApp      = new SteamApp();
    steamApp.appid      = dbEntry.appid;
    steamApp.name       = dbEntry.name;
    steamApp.type       = dbEntry.type;
    steamApp.triedVia   = dbEntry.triedVia.slice();
    steamApp.failedVia   = dbEntry.failedVia.slice();
    return steamApp;
  }

  static diff(steamAppsSource, steamAppsTarget) {
    const targetAppIds = steamAppsTarget.map((app) => app.appid);

    return steamAppsSource.filter((app) => !targetAppIds.includes(app.appid));
  }
}
