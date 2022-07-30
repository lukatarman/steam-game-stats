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
    .filter((page) => steamAppIsGame(page))
    .map((_, i) => Game.fromSteamApp(steamApps[i]));
}

export function updateSteamWebStatus(steamApps, htmlDetailsPages) {
  const triedPlatformFunc = copy.triedViaSteamWeb;

  updateIdentificationStatusSideEffectFree(
    steamApps,
    htmlDetailsPages,
    triedPlatformFunc,
  );
}

export function updateSteamchartsStatus(steamApps, htmlDetailsPages) {
  const triedPlatformFunc = copy.triedViaSteamcharts;

  updateIdentificationStatusSideEffectFree(
    steamApps,
    htmlDetailsPages,
    triedPlatformFunc,
  );
}

function updateIdentificationStatusSideEffectFree(
  steamApps,
  htmlDetailsPages,
  triedPlatformFunc,
) {
  return htmlDetailsPages.map((page, i) => {
    const copy = steamApps[i].copy();

    triedPlatformFunc();

    if (steamAppIsGame(page)) copy.identify();

    return copy;
  });
}
