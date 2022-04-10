export function filterNonGames(games) {
  for (let game of games) {
    if (filterByGameName(game)) {
      game.isGame = false;
    }
  }
  return games;
}

//The names for non games is very inconsistent, only included ones that are for sure not games
function filterByGameName(game) {
  if (game.isGame === undefined) {
    const lowercaseGameName = game.name.toLowerCase();

    if (lowercaseGameName.match(/dlc$/)) return true;

    if (lowercaseGameName.match(/soundtrack$/)) return true;

    return false;
  }
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
