export function recordAttemptsViaSource(steamApps, htmlDetailsPages, source) {
  return steamApps.map((app) => {
    const appCopy = app.copy();
    const currentPage = htmlDetailsPages.find((page) => page.id == app.appid);

    appCopy.recordHtmlAttempt(currentPage.page, source);

    return appCopy;
  });
}

export function updateGamesMissingDetails(games, htmlDetailsPages) {
  return htmlDetailsPages.map(({ page }, i) => {
    const gameCopy = games[i].copy();

    gameCopy.updateGameDetails(page);

    return gameCopy;
  });
}

export function getSteamDbDevelopers(page) {
  const developers = page.querySelector(
    "table.table.table-bordered.table-hover.table-responsive-flex tbody tr:nth-child(3) td:last-child",
  );

  if (!developers) return [];

  return Array.from(developers.children).map((developer) => developer.textContent);
}

export function getSteamDbGenres(page) {
  const domTableBody = page.querySelector("#info tbody");

  if (!domTableBody) return [];

  const genresNodes = Array.from(domTableBody.children).filter(
    (tableEntry) => tableEntry.children[0].textContent === "Store Genres",
  )[0].children[1].childNodes;

  return Array.from(genresNodes)
    .filter((genre) => genre.constructor.name === "Text")
    .map((genre) => genre.nodeValue.replace(",", "").trim());
}

export function getSteamDbDescription(page) {
  const description = page.querySelector(".header-description");

  if (!description) return "";

  return description.textContent;
}
