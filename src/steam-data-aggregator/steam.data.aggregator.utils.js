// @todo: rename util to service

export function diffMOCK(steamAppsApi, steamAppsDb) {
  const steamAppsApiIds = steamAppsApi.map(app => app.id);
  const steamAppsDbIds = steamAppsDb.map(app => app.id);

  // @todo: calc diff
  // const diff = ...;
  const steamAppsDiff = {};

  return steamAppsDiff;
}