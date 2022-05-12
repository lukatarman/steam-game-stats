// todo: consider https://stackoverflow.com/questions/41222805/compare-a-mongo-diff-on-two-collections
export function diff(steamAppsApi, steamAppsDb) {
  const steamAppsDbIds = steamAppsDb.map(app => app.appid);

  return steamAppsApi.filter(app => !steamAppsDbIds.includes(app.appid));
}