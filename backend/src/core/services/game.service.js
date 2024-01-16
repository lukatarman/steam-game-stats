import { Game } from "../models/game.js";
import { SteamApp } from "../models/steam.app.js";
import { parseHTML } from "linkedom";
import { ValidDataSources } from "../../../models/valid.data.sources.js";

export function recordHtmlAttempts(steamApps, htmlDetailsPages, source) {
  return steamApps.map((app, i) => {
    const appCopy = app.copy();
    appCopy.triedIfGameViaSource(source);

    if (htmlDetailsPages[i] === "") appCopy.htmlPageFailedViaSource(source);

    return appCopy;
  });
}

export function getGames(steamApps, htmlDetailsPages, source) {
  return htmlDetailsPages
    .map((page, i) => {
      if (page === "") return "";
      if (getType(page, source) !== SteamApp.validTypes.game) return "";

      return Game.fromSteamApp(
        steamApps[i],
        getReleaseDate(page),
        getDevelopers(page),
        getGenres(page),
        getGameDescription(page),
      );
    })
    .filter((game) => !!game);
}

function getType(page, source) {
  if (source === ValidDataSources.validDataSources.steamWeb)
    return getSteamWebAppType(page);
  if (source === ValidDataSources.validDataSources.steamcharts)
    return getSteamchartsAppType(page);
}

export function getSteamWebAppType(page) {
  const { document } = parseHTML(page);

  const breadcrumbElement = document.querySelector(".blockbg");

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

// TODO https://github.com/lukatarman/steam-game-stats/issues/178
export function getSteamchartsAppType(page) {
  if (page === "") return SteamApp.validTypes.unknown;

  return SteamApp.validTypes.game;
}

export function getReleaseDate(page) {
  const { document } = parseHTML(page);

  const releaseDateElement = document.querySelector(".release_date .date");

  if (!releaseDateElement) return "";

  const releaseDate = new Date(`${releaseDateElement.textContent.trim()} UTC`);

  return releaseDate == "Invalid Date" ? "" : releaseDate;
}

export function getDevelopers(page) {
  const { document } = parseHTML(page);

  const developers = document.querySelector(".dev_row #developers_list");

  if (!developers) return [];

  return Array.from(developers.children).map((developer) => developer.textContent.trim());
}

export function getGenres(page) {
  const { document } = parseHTML(page);

  const genres = document.querySelector("#genresAndManufacturer span");

  if (!genres) return [];

  return Array.from(genres.children)
    .map((genre) => genre.textContent.trim())
    .filter((genre) => !!genre);
}

export function getGameDescription(page) {
  const { document } = parseHTML(page);

  const description = document.querySelector(".game_description_snippet");

  if (!description) return "";

  return description.textContent.trim();
}

export function getIds(games) {
  return games.map((game) => game.id);
}

export function recordAttemptsViaSource(steamApps, htmlDetailsPages, source) {
  return steamApps.map((app) => {
    const appCopy = app.copy();
    appCopy.triedIfGameViaSource(source);

    const currentPage = htmlDetailsPages.find((page) => page.id == app.appid);
    if (currentPage.page === "") appCopy.htmlPageFailedViaSource(source);

    return appCopy;
  });
}

export function recordAttemptsViaSteamDb(steamApps, htmlDetailsPages, source) {
  return steamApps.map((app) => {
    const appCopy = app.copy();
    appCopy.triedViaSteamDb();

    const currentPage = htmlDetailsPages.find((page) => page.id == app.appid);
    if (currentPage.page === "") appCopy.failedViaSteamDb();

    return appCopy;
  });
}

export function updateGamesMissingDetails(games, htmlDetailsPages) {
  return htmlDetailsPages.map(({ page }, i) => {
    const gameCopy = games[i].copy();

    gameCopy.updateGameDetails(
      getSteamDbDevelopers(page),
      getSteamDbGenres(page),
      getSteamDbDescription(page),
    );

    return gameCopy;
  });
}

export function updateMissingDetails(games, htmlDetailsPages) {
  htmlDetailsPages.forEach(({ page }, i) => {
    games[i].updateGameDetails(
      getSteamDbDevelopers(page),
      getSteamDbGenres(page),
      getSteamDbDescription(page),
    );
  });
}

export function getSteamDbDevelopers(page) {
  const { document } = parseHTML(page);

  const developers = document.querySelector(
    "table.table.table-bordered.table-hover.table-responsive-flex tbody tr:nth-child(3) td:last-child",
  );

  if (!developers) return [];

  return Array.from(developers.children).map((developer) => developer.textContent);
}

export function getSteamDbGenres(page) {
  const { document } = parseHTML(page);

  const domTableBody = document.querySelector("#info tbody");

  if (!domTableBody) return [];

  const genresNodes = Array.from(domTableBody.children).filter(
    (tableEntry) => tableEntry.children[0].textContent === "Store Genres",
  )[0].children[1].childNodes;

  return Array.from(genresNodes)
    .filter((genre) => genre.constructor.name === "Text")
    .map((genre) => genre.nodeValue.replace(",", "").trim());
}

export function getSteamDbDescription(page) {
  const { document } = parseHTML(page);

  const description = document.querySelector(".header-description");

  if (!description) return "";

  return description.textContent;
}

export function updateMissingReleaseDates(games, htmlDetailsPages) {
  games.forEach((game, i) => {
    game.updateReleaseDate(getSteamDbReleaseDate(htmlDetailsPages[i].page));
  });
}

export function getSteamDbReleaseDate(page) {
  const { document } = parseHTML(page);

  const releaseDateElement = document.querySelector(
    "table.table.table-bordered.table-hover.table-responsive-flex tbody tr:last-child td:last-child",
  );

  if (!releaseDateElement) return "";

  const releaseDateString = releaseDateElement.textContent;

  const releaseDate = new Date(`
    ${releaseDateString.slice(0, releaseDateString.indexOf("–") - 1)} UTC`);

  if (releaseDate == "Invalid Date") return "";

  return releaseDate;
}
