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

    return false;
  }
}

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

// todo: add tests 
export function steamAppIsGame(detailsPage) {
  const dom = new JSDOM(detailsPage).data;
  const breadcrumbElement = dom.window.document.querySelector(".blockbg");

  if (!breadcrumbElement) return false;

  const breadcrumbText = breadcrumbElement.children[0].textContent;

  if (breadcrumbText !== "All Software" && breadcrumbText !== "All Games") return false;

  const indexOfDlc = breadcrumbElement.children.indexOf(child => child.textContent === 'Downloadable Content');

  return indexOfDlc === -1 ? false : true;
}
