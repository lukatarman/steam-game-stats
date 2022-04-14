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

// check html page for details of the steam app if its a game or something else and return true or false
export function steamAppIsGameMOCK(steamApp, steamClient) {
  const steamAppDetailPageAsString = await steamClient.getAppDetailsPage(steamApp);
  const steamAppDetailPageAsDom = new JSDOM(steamAppDetailPageAsString).data;
  const breadCrumbClass =
    steamAppDetailPageAsDom.window.document.querySelector(".blockbg");

  if (hasAgeVerification()) {
    if (checkIfGameThroughSteamCharts(steamApp, steamClient)) return true;
  }

  const breadCrumbText = breadCrumbClass.children[0].textContent;
}

function hasAgeVerification(breadCrumbClass) {
  if (!breadCrumbClass) return true;
}

function checkIfGameThroughSteamCharts(steamApp, steamClient) {
  const steamChartsAppDetailsAsString = await steamClient.getAppDetailsSteamCharts(
    steamApp
  );
  const steamChartsAppDetailsAsDom = new JSDOM(steamChartsAppDetailsAsString).data;

  if (steamChartsAppDetailsAsDom) return true;
  return false;
}
