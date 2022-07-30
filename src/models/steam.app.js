export class SteamApp {
  appid;
  name;
  identified;
  triedVia;

  copy() {
    const copy = new SteamApp();
    copy.appid = this.appid;
    copy.name = this.name;
    copy.identified = this.identified;
    copy.triedVia = this.triedVia.slice();

    return copy;
  }

  triedViaSteamWeb() {
    this.triedVia.push("steamWeb");
  }

  triedViaSteamcharts() {
    this.triedVia.push("steamcharts");
  }

  identify() {
    this.identified = true;
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
    steamApp.triedVia   = dbEntry.triedVia.slice();
    return steamApp;
  }

  static diff(steamAppsSource, steamAppsTarget) {
    const targetAppIds = steamAppsTarget.map((app) => app.appid);

    return steamAppsSource.filter((app) => !targetAppIds.includes(app.appid));
  }
}
