export async function getCurrentPlayers(games, steamClient) {
  // let todaysPlayersPromise = [];
  // for (let game of games) {
  //   const gamePlayersPromise = steamClient
  //     .getCurrentPlayers(game)
  //     .catch(() => {});
  //   todaysPlayersPromise.push(gamePlayersPromise);
  // }
  // return todaysPlayersPromise;

  const currentTime = new Date();
  let currentPlayersPromise = [];
  let currentPlayersWithTime = [];

  for (let game of games) {
    const gamePlayers = steamClient.getCurrentPlayers(game).catch(() => {});

    currentPlayersPromise.push(gamePlayers);
  }

  const currentPlayersArray = await Promise.all(currentPlayersPromise);

  for (let currentPlayers of currentPlayersArray) {
    const playersDateObj = {
      date: currentTime,
      players: currentPlayers,
    };

    currentPlayersWithTime.push(playersDateObj);
  }
  return currentPlayersWithTime;
}
