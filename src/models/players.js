import { TrackedPlayers } from "./tracked.players.js";

export class PlayerHistory {
  year;
  month;
  averagePlayers;
  trackedPlayers;

  static manyFromSteamchartsPage(histories) {
    return histories.map((history) => this.fromSteamcharts(history));
  }

  //prettier-ignore
  static fromSteamcharts(history) {
    const players           = new PlayerHistory();
    players.year            = history.date.getFullYear();
    players.month           = history.date.getMonth();
    players.averagePlayers  = history.players;
    players.trackedPlayers  = [];
    return players;
  }

  static manyFromDbEntry(histories) {
    return histories.map((history) => this.fromDbEntry(history));
  }

  //prettier-ignore
  static fromDbEntry(history) {
    const players           = new PlayerHistory();
    players.year            = history.year;
    players.month           = history.month;
    players.averagePlayers  = history.averagePlayers;
    players.trackedPlayers  = TrackedPlayers.manyFromDbEntry(history.trackedPlayers);
    return players;
  }

  //prettier-ignore
  static newMonthlyEntry() {
    const players           = new PlayerHistory();
    players.year            = new Date().getFullYear();
    players.month           = new Date().getMonth();
    players.averagePlayers  = 0;
    players.trackedPlayers  = [];
    return players;
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
