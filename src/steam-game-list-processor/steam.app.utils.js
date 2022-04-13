import { JSDOM } from "jsdom";

export function filterSteamAppsByName(steamApps) {
  return steamApps.filter((steamApp) =>
    doesNotEndWithDlcOrSoundtrack(steamApp)
  );

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

// check html page for details of the steam app if its a game or something else and return true or false
export function steamAppIsAgameMOCK(steamAppDetailPageAsString) {
  const steamAppDetailPageAsDom = new JSDOM(steamAppDetailPageAsString);
  const categoriesDiv = steamAppDetailPageAsDom.window.document.querySelector('.game_area_features_list_ctn');
  const listOfLinks = categoriesDiv.querySelectorAll('a');

}
