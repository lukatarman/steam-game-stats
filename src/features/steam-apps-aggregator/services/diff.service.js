export function diff(steamAppsApi, steamAppsDb) {
  const steamAppsDbIds = steamAppsDb.map((app) => app.appid);

  return steamAppsApi.filter((app) => !steamAppsDbIds.includes(app.appid));
}
