import { JSDOM } from "jsdom";
import { Game } from "../../../models/game.js";
import { SteamApp } from "../../../models/steam.app.js";

export function getSteamAppType(httpDetailsPage) {
  const dom = new JSDOM(httpDetailsPage);
  const breadcrumbElement = dom.window.document.querySelector(".blockbg");

  if (!breadcrumbElement) return SteamApp.validTypes.unknown;

  const breadcrumbText = breadcrumbElement.children[0].textContent;

  if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games")
    return SteamApp.validTypes.unknown;

  for (let child of breadcrumbElement.children) {
    if (child.textContent === "Downloadable Content")
      return SteamApp.validTypes.downloadableContent;
  }

  return SteamApp.validTypes.game;
}

export function discoverGamesFromSteamWeb(steamApps, htmlDetailsPages) {
  return htmlDetailsPages
    .map((page, i) => {
      const { releaseDate, developers, genres, gameDescription } =
        getAdditionalGameInfo(page);

      if (getSteamAppType(page) === SteamApp.validTypes.game) {
        return Game.fromSteamApp(
          steamApps[i],
          releaseDate,
          developers,
          genres,
          gameDescription,
        );
      }
    })
    .filter((game) => !!game);
}

export function getAdditionalGameInfo(page) {
  const releaseDate = getReleaseDate(page);
  const developers = getDevelopers(page);
  const genres = getGenres(page);
  const gameDescription = getGameDescription(page);

  return { releaseDate, developers, genres, gameDescription };
}

export function getReleaseDate(page) {
  const dom = new JSDOM(page);

  const releaseDate = dom.window.document
    .querySelector(".release_date .date")
    .textContent.trim();

  if (!releaseDate) return "";

  return new Date(releaseDate);
}

export function getDevelopers(page) {
  const dom = new JSDOM(page);

  const developers = dom.window.document.querySelector(".dev_row #developers_list");

  if (!developers) return [];

  return Array.from(developers.children).map((developer) => developer.textContent.trim());
}

export function getGenres(page) {
  const dom = new JSDOM(page);

  const genres = dom.window.document.querySelector("#genresAndManufacturer span");

  if (!genres) return [];

  return Array.from(genres.children)
    .map((genre) => genre.textContent.trim())
    .filter((genre) => !!genre);
}

export function getGameDescription(page) {
  const dom = new JSDOM(page);

  const description = dom.window.document.querySelector(".game_description_snippet");

  if (!description) return "";

  return description.textContent.trim();
}

export function updateTypeSideEffectFree(steamApps, htmlDetailsPages) {
  return htmlDetailsPages.map((page, i) => {
    const copy = steamApps[i].copy();
    const appType = getSteamAppType(page);

    copy.triedViaSteamWeb();

    copy.appType = appType;

    return copy;
  });
}

export function identifyGames(updatedSteamApps) {
  const games = updatedSteamApps
    .filter((steamApp) => steamApp.isGame())
    .map((steamApp) => Game.fromSteamcharts(steamApp));

  return games;
}

export function assignType(result, steamApp) {
  if (result) steamApp.appType = SteamApp.validTypes.game;
  return steamApp;
}
