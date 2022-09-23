export class SteamApp {
  appid;
  name;
  identified;
  triedVia;
  static type;

  constructor() {
    SteamApp.type = this.createEnum(["game", "downloadableContent", "unknown"]);
  }

  copy() {
    const copy = new SteamApp();
    copy.appid = this.appid;
    copy.name = this.name;
    copy.identified = this.identified;
    copy.type = this.type;
    copy.triedVia = this.triedVia.slice();

    return copy;
  }

  triedViaSteamWeb() {
    this.triedVia.push("steamWeb");
  }

  triedViaSteamchartsWeb() {
    this.triedVia.push("steamcharts");
  }

  identify(type = "unknown") {
    this.identified = true;
    this.type = type;
  }

  createEnum(values) {
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
    steamApp.identified = false;
    steamApp.type = "unidentified";
    steamApp.triedVia   = [];
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
    steamApp.identified = dbEntry.identified;
    steamApp.type       = dbEntry.type;
    steamApp.triedVia   = dbEntry.triedVia.slice();
    return steamApp;
  }

  static diff(steamAppsSource, steamAppsTarget) {
    const targetAppIds = steamAppsTarget.map((app) => app.appid);

    return steamAppsSource.filter((app) => !targetAppIds.includes(app.appid));
  }
}
