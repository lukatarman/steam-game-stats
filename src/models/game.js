import { Players } from "./players.js";

export class Game {
  id;
  name;
  image;
  imageUrl;
  playerHistory;

  // prettier-ignore
  static fromSteamApp(steamApp) {
    const game         = new Game();
    game.id            = steamApp.appid;
    game.name          = steamApp.name;
    game.imageUrl      = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`
    game.playerHistory = [];
    return game;
  }

  // prettier-ignore
  static fromDbEntry(dbEntry) {
    const game         = new Game();
    game.id            = dbEntry.id;
    game.name          = dbEntry.name;
    game.imageUrl      = dbEntry.imageUrl;
    game.playerHistory = Players.manyFromDbEntry(dbEntry.playerHistory);
    return game;
  }

  addOnePlayerHistoryEntry(players) {
    let existingMonthAndYearIndex = this.#getExistingMonthAndYearIndex();
    if (existingMonthAndYearIndex === -1) {
      this.playerHistory.push(Players.newMonthlyEntry());
      existingMonthAndYearIndex = this.playerHistory.length - 1;
    }

    const currentMonthAndYearEntry = this.playerHistory[existingMonthAndYearIndex];

    currentMonthAndYearEntry.addNewTrackedPlayers(players);

    return this;
  }

  #getExistingMonthAndYearIndex() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const index = this.playerHistory.findIndex(
      (history) => history.year === currentYear && history.month === currentMonth,
    );

    return index;
  }

  get lastUpdate() {
    return this.hasHistory
      ? this.playerHistory[this.playerHistory.length - 1].date
      : undefined;
  }

  get hasHistory() {
    return this.playerHistory && this.playerHistory.length !== 0;
  }
}
