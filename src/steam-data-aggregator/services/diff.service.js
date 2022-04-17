// todo: consider https://stackoverflow.com/questions/41222805/compare-a-mongo-diff-on-two-collections
export function diffMOCK(steamAppsApi, steamAppsDb) {
  const steamAppsApiIds = steamAppsApi.map(app => app.id);
  const steamAppsDbIds = steamAppsDb.map(app => app.id);

  // @todo: calc diff
  // const diff = ...;
  const steamAppsDiff = {};

  return steamAppsDiff;
}