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
  static newMonthlyEntry() {
    const players   = new Players();
    players.year    = new Date().getFullYear();
    players.month   = new Date().getMonth();
    averagePlayers  = undefined;
    trackedPlayers  = [];
    return players;
  }
}
