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

  static #createValidTypesEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
  }

  copy() {
    const copy = new SteamApp();
    copy.appid = this.appid;
    copy.name = this.name;
    copy.type = this.type;
    copy.triedVia = this.triedVia.slice();
    copy.failedVia = this.failedVia.slice();

    return copy;
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
    steamApp.failedVia  = dbEntry.failedVia.slice();
    return steamApp;
  }

  static diff(steamAppsSource, steamAppsTarget) {
    const targetAppIds = steamAppsTarget.map((app) => app.appid);

    return steamAppsSource.filter((app) => !targetAppIds.includes(app.appid));
  }

  get appType() {
    return this.type;
  }

  set appType(type) {
    this.type = type;
  }

  get isGame() {
    return this.type === SteamApp.validTypes.game;
  }

  recordHtmlAttempt(page, source) {
    this.addHtmlPageTriedViaSource(source);

    if (page.toString() === "") this.addHtmlPageFailedViaSource(source);
  }

  addHtmlPageTriedViaSource(source) {
    if (this.triedVia.includes(source)) return;

    this.triedVia.push(source);
  }

  addHtmlPageFailedViaSource(source) {
    if (this.failedVia.includes(source)) return;

    this.failedVia.push(source);
  }

  updateSteamAppType(page, source) {
    this.appType = this.#getType(page, source);
  }

  #getType(page, source) {
    if (source === ValidDataSources.validDataSources.steamWeb)
      return this.#getSteamWebAppType(page);
    if (source === ValidDataSources.validDataSources.steamcharts)
      return this.#getSteamchartsAppType(page);
  }

  #getSteamWebAppType(page) {
    const breadcrumbElement = page.querySelector(".blockbg");

    if (!breadcrumbElement) return SteamApp.validTypes.unknown;

    const breadcrumbText = breadcrumbElement.children[0].textContent;

    if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games")
      return SteamApp.validTypes.unknown;

    for (let child of breadcrumbElement.children) {
      if (child.textContent === "Downloadable Content")
        return SteamApp.validTypes.downloadableContent;
    }

    return SteamApp.validTypes.game;
  }

  // TODO https://github.com/lukatarman/steam-game-stats/issues/178
  #getSteamchartsAppType(page) {
    if (page.toString() === "") return SteamApp.validTypes.unknown;

    return SteamApp.validTypes.game;
  }
}
