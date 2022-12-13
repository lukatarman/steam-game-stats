import { TrackedPlayers } from "./tracked.players.js";

export class Players {
  year;
  month;
  averagePlayers;
  trackedPlayers;

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

  static manyFromDbEntry(histories) {
    if (histories.length === 0) return [];
    return histories.map((history) => this.fromDbEntry(history));
  }

  //prettier-ignore
  static fromFromDbEntry(history) {
    const players           = new Players();
    players.year            = history.year;
    players.month           = history.month;
    players.averagePlayers  = history.averagePlayers;
    players.trackedPlayers  = TrackedPlayers.manyFromDbEntry(history.trackedPlayers);
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
