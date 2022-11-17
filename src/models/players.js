export class Players {
  year;
  month;
  averagePlayers;
  trackedPlayers;

  //prettier-ignore
  static fromSteamcharts(page) {
    const players   = new Players();
    players.year    = page.date.getFullYear();
    players.month   = page.date.getMonth();
    averagePlayers  = page.averagePlayers;
    trackedPlayers  = [];
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
