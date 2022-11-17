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
}
