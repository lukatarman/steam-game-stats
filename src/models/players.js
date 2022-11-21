export class Players {
  year;
  month;
  averagePlayers;
  trackedPlayers;

  // todo: add tests

  static manyFromSteamchartsPage(histories) {
    return histories.map((history) => this.fromSteamcharts(history));
  }

  //prettier-ignore
  static fromSteamcharts(history) {
    const players           = new Players();
    players.year            = history.date.getFullYear();
    players.month           = history.date.getMonth();
    players.averagePlayers  = history.players;
    players.trackedPlayers  = [];
    return players;
  }

  //prettier-ignore
  static newMonthlyEntry() {
    const players           = new Players();
    players.year            = new Date().getFullYear();
    players.month           = new Date().getMonth();
    players.averagePlayers  = 0;
    players.trackedPlayers  = [];
    return players;
  }
}
