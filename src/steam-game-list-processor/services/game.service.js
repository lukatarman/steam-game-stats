import { JSDOM } from "jsdom";

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

    return true;
  }
}

/**
 * @deprecated
 */
export function tagNonGames(steamApps) {
  return steamApps
    .map((steamApp) => steamAppNameToLowerCase(steamApp))
    .map((steamApp) => tagNonGameIfIncludesKeywords(steamApp));

  function steamAppNameToLowerCase(steamApp) {
    return { ...steamApp, name: steamApp.name.toLowerCase() };
  }

  function tagNonGameIfIncludesKeywords(steamApp) {
    return steamApp.name.includes("dlc") || steamApp.name.includes("soundtrack")
      ? { ...steamApp, isGame: false }
      : steamApp;
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

export function identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages) {
  const identifiedPages = [...htmlDetailsPages];

  const games = steamApps.map((steamApp, index) => {
    if (steamAppIsGame(identifiedPages[index])) {
      identifiedPages[index] = 'identified';
      return new Game(steamApp);
    }
    return;
  }).filter(game => !!game);

  return [games, identifiedPages];
}
