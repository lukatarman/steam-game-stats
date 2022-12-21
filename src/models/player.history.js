import { TrackedPlayers } from "./tracked.players.js";

export class PlayerHistory {
  year;
  month;
  averagePlayers;
  trackedPlayers;

  static manyFromDbEntry(histories) {
    return histories.map((history) => this.fromDbEntry(history));
  }

  //prettier-ignore
  static fromDbEntry(history) {
    const playerHistory           = new PlayerHistory();
    playerHistory.year            = history.year;
    playerHistory.month           = history.month;
    playerHistory.averagePlayers  = history.averagePlayers;
    playerHistory.trackedPlayers  = TrackedPlayers.manyFromDbEntry(history.trackedPlayers);
    return playerHistory;
  }

  //prettier-ignore
  static fromRawData(players, date) {
      const playerHistory           = new PlayerHistory();
      playerHistory.year            = new Date(date).getFullYear();
      playerHistory.month           = new Date(date).getMonth();
      playerHistory.trackedPlayers  = [];
      playerHistory.push(players, date);
      playerHistory.averagePlayers  = playerHistory.#calculateAveragePlayers();
      return playerHistory;
    }

  //prettier-ignore
  static newMonthlyEntry(players) {
    const playerHistory           = new PlayerHistory();
    playerHistory.year            = new Date().getFullYear();
    playerHistory.month           = new Date().getMonth();
    playerHistory.trackedPlayers  = [];
    playerHistory.push(players);
    playerHistory.averagePlayers  = playerHistory.#calculateAveragePlayers();
    return playerHistory;
  }

  push(players, date = "") {
    this.trackedPlayers.push(new TrackedPlayers(players, date));

    this.averagePlayers = this.#calculateAveragePlayers();
  }

  #calculateAveragePlayers() {
    const average =
      this.trackedPlayers.reduce((sum, cur) => sum + cur.players, 0) /
      this.trackedPlayers.length;
    return parseFloat(average.toFixed(1));
  }
}
