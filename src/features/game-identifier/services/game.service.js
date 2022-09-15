import { JSDOM } from "jsdom";
import { Game } from "../../../models/game.js";

export function getSteamAppType(httpDetailsPage) {
  const dom = new JSDOM(httpDetailsPage);
  const breadcrumbElement = dom.window.document.querySelector(".blockbg");

  if (!breadcrumbElement) return;

  const breadcrumbText = breadcrumbElement.children[0].textContent;

  if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games") return;

  for (let child of breadcrumbElement.children) {
    if (child.textContent === "Downloadable Content") return "downloadable content";
  }

  return "game";
}

export function discoverGamesFromSteamWeb(steamApps, htmlDetailsPages) {
  return htmlDetailsPages
    .map((page, i) => {
      if (getSteamAppType(page)) {
        return Game.fromSteamApp(steamApps[i]);
      }
    })
    .filter((game) => !!game);
}

export function updateIdentificationStatusSideEffectFree(steamApps, htmlDetailsPages) {
  return htmlDetailsPages.map((page, i) => {
    const copy = steamApps[i].copy();

    copy.triedViaSteamWeb();

    if (getSteamAppType(page)) copy.identify();

    return copy;
  });
}

export function identifyGames(updatedSteamApps) {
  const games = updatedSteamApps
    .filter((steamApp) => steamApp.identified)
    .map((steamApp) => Game.fromSteamApp(steamApp));

  return games;
}

export function setAsIdentified(result, steamApp) {
  if (result) steamApp.identify();
  return steamApp;
}
