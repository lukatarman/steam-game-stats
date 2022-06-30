export class SteamApp {
  appid;
  name;
  identified;
  triedVia;

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

  //remove services folder
  //add steam.app.js tests (check if oneFromDbEntry makes copy of property)
  //check that code is working
  //adjust tests for steam.apps.aggregator
  static diff(steamAppsSource, steamAppsTarget) {
    const targetAppIds = steamAppsTarget.map((app) => app.appid);

    return steamAppsSource.filter((app) => !targetAppIds.includes(app.appid));
  }
}
