import { JSDOM } from "jsdom";
import { Game } from "../../models/game.js";

export function filterSteamAppsByName(steamApps) {
  return steamApps.filter((steamApp) => doesNotEndWithDlcOrSoundtrack(steamApp));

  function doesNotEndWithDlcOrSoundtrack(steamApp) {
    const lowercaseGameName = steamApp.name.toLowerCase();
    const endsWithDlc = /dlc$/;
    const endsWithSoundtrack = /soundtrack$/;

    if (
      !lowercaseGameName.match(endsWithDlc) &&
      !lowercaseGameName.match(endsWithSoundtrack)
    )
      return true;

    return false;
  }
}

export function steamAppIsGame(httpDetailsPage) {
  const dom = new JSDOM(httpDetailsPage.data);
  const breadcrumbElement = dom.window.document.querySelector(".blockbg");

  if (!breadcrumbElement) return false;

  const breadcrumbText = breadcrumbElement.children[0].textContent;

  if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games") return false;

  for (let child of breadcrumbElement.children) {
    if (child.textContent === "Downloadable Content") return false;
  }

  return true;
}

export function discoverGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages) {
  const discoveredPages = [...htmlDetailsPages];

  const games = steamApps.map((steamApp, index) => {
    if (steamAppIsGame(discoveredPages[index])) {
      discoveredPages[index] = 'discovered';
      return new Game(steamApp);
    }
    return;
  }).filter(game => !!game);

  return [games, discoveredPages];
}
