import { JSDOM } from "jsdom";
import { Game } from "../../../models/game.js";

export function steamAppIsGame(httpDetailsPage) {
  const dom = new JSDOM(httpDetailsPage);
  const breadcrumbElement = dom.window.document.querySelector(".blockbg");

  if (!breadcrumbElement) return false;

  const breadcrumbText = breadcrumbElement.children[0].textContent;

  if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games") return false;

  for (let child of breadcrumbElement.children) {
    if (child.textContent === "Downloadable Content") return false;
  }

  return true;
}

export function discoverGamesFromSteamWeb(steamApps, htmlDetailsPages) {
  return htmlDetailsPages
    .map((page, i) => {
      if (steamAppIsGame(page)) {
        return Game.fromSteamApp(steamApps[i]);
      }
    })
    .filter((game) => !!game);
}

export function updateIdentificationStatusSideEffectFree(steamApps, htmlDetailsPages) {
  return htmlDetailsPages.map((page, i) => {
    const copy = steamApps[i].copy();

    copy.triedViaSteamWeb();

    if (steamAppIsGame(page)) copy.identify();

    return copy;
  });
}

export function identifyGames(updatedSteamApps) {
  const games = updatedSteamApps
    .filter((steamApp) => steamApp.identified)
    .map((steamApp) => Game.fromSteamApp(steamApp));

  return games;
}
