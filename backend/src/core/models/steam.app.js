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
    "restricted",
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

  get isGame() {
    return this.type === SteamApp.validTypes.game;
  }

  recordHtmlAttempt(page, source) {
    this.#addHtmlPageTriedViaSource(source);

    if (page.toString() === "") this.#addHtmlPageFailedViaSource(source);
  }

  #addHtmlPageTriedViaSource(source) {
    if (this.triedVia.includes(source)) return;

    this.triedVia.push(source);
  }

  #addHtmlPageFailedViaSource(source) {
    if (this.failedVia.includes(source)) return;

    this.failedVia.push(source);
  }

  recordSteamWebHtmlAttempt(page) {
    const source = ValidDataSources.validDataSources.steamWeb;

    this.#addTriedViaSource(source);

    if (page.toString() === "") this.#addFailedViaSource(source);
  }

  #addTriedViaSource(source) {
    if (this.triedVia.includes(source)) return;

    this.triedVia.push(source);
  }

  #addFailedViaSource(source) {
    if (this.failedVia.includes(source)) return;

    this.failedVia.push(source);
  }

  updateAppTypeViaSteamWeb(page) {
    this.type = this.#getSteamWebAppType(page);
  }

  #getSteamWebAppType(page) {
    const breadcrumbElement = page.querySelector(".blockbg");

    if (!breadcrumbElement) return SteamApp.validTypes.restricted;

    const breadcrumbText = breadcrumbElement.children[0].textContent;

    if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games")
      return SteamApp.validTypes.unknown;

    for (let child of breadcrumbElement.children) {
      if (child.textContent === "Downloadable Content")
        return SteamApp.validTypes.downloadableContent;
    }

    return SteamApp.validTypes.game;
  }

  recordSteamApiAttempt(steamApp) {
    const source = ValidDataSources.validDataSources.steamApi;

    this.#addTriedViaSource(source);

    if (!steamApp) this.#addFailedViaSource(source);
  }

  updateAppTypeViaSteamApi(steamApp) {
    this.type = this.#getSteamApiAppType(steamApp);
  }

  #getSteamApiAppType(steamApp) {
    if (!steamApp) return SteamApp.validTypes.unknown;

    const appType = steamApp.type;

    if (appType === "game") return SteamApp.validTypes.game;
    if (appType === "dlc") return SteamApp.validTypes.downloadableContent;

    return SteamApp.validTypes.unknown;
  }
}
