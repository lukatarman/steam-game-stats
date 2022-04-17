export function addCurrentPlayersToGames(gamesNoPlayers, currentPlayers) {
  const games = { ...gamesNoPlayers };

  for (let i = 0; i < games.length; i++) {
    games[i].playerHistory.push(currentPlayers[i]);
  }

  return games;
}
