export function labelAsNotIdentified(steamApps) {
  return steamApps.map(steamApp => {
    steamApp.identified = false;
    return steamApp;
  });
}
