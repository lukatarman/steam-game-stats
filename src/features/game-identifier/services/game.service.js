import { JSDOM } from "jsdom";
import { Game } from "../../../models/game.js";
import { SteamApp } from "../../../models/steam.app.js";

export function getSteamAppType(httpDetailsPage) {
  const dom = new JSDOM(httpDetailsPage);
  const breadcrumbElement = dom.window.document.querySelector(".blockbg");

  if (!breadcrumbElement) return SteamApp.type.unknown;

  const breadcrumbText = breadcrumbElement.children[0].textContent;

  if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games")
    return SteamApp.type.unknown;

  for (let child of breadcrumbElement.children) {
    if (child.textContent === "Downloadable Content")
      return SteamApp.type.downloadableContent;
  }

  return SteamApp.type.game;
}

export function discoverGamesFromSteamWeb(steamApps, htmlDetailsPages) {
  return htmlDetailsPages
    .map((page, i) => {
      if (getSteamAppType(page) === "game") {
        return Game.fromSteamApp(steamApps[i]);
      }
    })
    .filter((game) => !!game);
}

export function updateTypeSideEffectFree(steamApps, htmlDetailsPages) {
  return htmlDetailsPages.map((page, i) => {
    const copy = steamApps[i].copy();
    const appType = getSteamAppType(page);

    copy.triedViaSteamWeb();

    if (appType) copy.setType(appType);

    return copy;
  });
}

export function identifyGames(updatedSteamApps) {
  const games = updatedSteamApps
    .filter((steamApp) => steamApp.type === "game")
    .map((steamApp) => Game.fromSteamApp(steamApp));

  return games;
}

export function assignType(result, steamApp) {
  if (result) steamApp.setType("game");
  return steamApp;
}
