export class Players {
  year;
  month;
  averagePlayers;
  trackedPlayers;

  //prettier-ignore
  static fromSteamcharts(averagePlayers, date) {
    const players   = new Players();
    players.year    = date.getFullYear();
    players.month   = date.getMonth();
    players.averagePlayers  = averagePlayers;
    players.trackedPlayers  = [];
    return players;
  }

  //prettier-ignore
  static newMonthlyEntry() {
    const players   = new Players();
    players.year    = new Date().getFullYear();
    players.month   = new Date().getMonth();
    players.averagePlayers  = 0;
    players.trackedPlayers  = [];
    return players;
  }
}
