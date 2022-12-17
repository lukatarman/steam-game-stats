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
  static fromPlayerHistoryService(history) {
      const playerHistory           = new PlayerHistory();
      playerHistory.year            = new Date(history.date).getFullYear();
      playerHistory.month           = new Date(history.date).getMonth();
      playerHistory.trackedPlayers  = [new TrackedPlayers(history.players, history.date)];
      playerHistory.averagePlayers  = playerHistory.#calculateAveragePlayers();
      return playerHistory;
    }

  //prettier-ignore
  static newMonthlyEntry() {
    const playerHistory           = new PlayerHistory();
    playerHistory.year            = new Date().getFullYear();
    playerHistory.month           = new Date().getMonth();
    playerHistory.averagePlayers  = 0;
    playerHistory.trackedPlayers  = [];
    return playerHistory;
  }

  addNewTrackedPlayers(players) {
    this.trackedPlayers.push(new TrackedPlayers(players));

    this.averagePlayers = this.#calculateAveragePlayers();
  }

  #calculateAveragePlayers() {
    const currentTrackedHistories = this.trackedPlayers;
    const playersSum = currentTrackedHistories.reduce((previous, current) => {
      return previous + parseFloat(current.players);
    }, 0);

    return parseFloat((playersSum / currentTrackedHistories.length).toFixed(1));
  }
}
