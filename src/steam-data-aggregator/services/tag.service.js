export function tagNonIdentified(steamApps) {
  return steamApps.map(app => { return {...app, identified:false }});
}