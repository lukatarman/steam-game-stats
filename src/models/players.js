export class Players {
  year;
  month;
  averagePlayers;
  trackedPlayers;

  //prettier-ignore
  static fromSteamcharts(players, date) {
    const players   = new Players();
    players.year    = date.getFullYear();
    players.month   = date.getMonth();
    averagePlayers  = players;
    trackedPlayers  = [];
    return players;
  }

  //prettier-ignore
  static newMonthlyEntry(date) {
    const players   = new Players();
    players.year    = date.year;
    players.month   = date.month;
    averagePlayers  = undefined;
    trackedPlayers  = [];
  }
}
