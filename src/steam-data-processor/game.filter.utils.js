export function filterGamesByName(steamApps) {
  // let gamesNameFiltered = [];

  // for (let steamApp of steamApps) {
  //   if (!checkIfIncludesKeywords(steamApp)) {
  //     gamesNameFiltered.push(steamApp);
  //   }
  // }
  // return gamesNameFiltered;

  return steamApps.filter((steamApp) => !checkIfIncludesKeywords(steamApp));
}

//The names for non games is very inconsistent, only included ones that are for sure not games
function checkIfIncludesKeywords(steamApp) {
  const lowercaseGameName = steamApp.name.toLowerCase();
  const endsWithDlc = /dlc$/;
  const endsWithSoundtrack = /soundtrack$/;

  if (lowercaseGameName.match(endsWithDlc)) return true;

  if (lowercaseGameName.match(endsWithSoundtrack)) return true;

  return false;
}

export function tagNonGames(games) {
  return games
    .map((game) => gameNameToLowerCase(game))
    .map((game) => tagGameIfIncludesKeywords(game));

  function gameNameToLowerCase(game) {
    return { ...game, name: game.name.toLowerCase() };
  }

  function tagGameIfIncludesKeywords(game) {
    return game.name.includes("dlc") || game.name.includes("soundtrack")
      ? { ...game, isGame: false }
      : game;
  }
}
