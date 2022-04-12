export function standardizeDataModel(gamesNotStandardized) {
  gamesNotStandardized.map(standardizeGames);

  function standardizeGames(game) {
    game = { ...game, id: game.appid };
    delete game.appid;
    return game;
  }
}
