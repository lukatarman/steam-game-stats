import { PlayerHistory } from "./player.history.js";

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

  static manyFromDbEntry(entries) {
    return entries.map((entry) => this.fromDbEntry(entry));
  }

  // prettier-ignore
  static fromDbEntry(dbEntry) {
    const game         = new Game();
    game.id            = dbEntry.id;
    game.name          = dbEntry.name;
    game.imageUrl      = dbEntry.imageUrl;
    game.playerHistory = PlayerHistory.manyFromDbEntry(dbEntry.playerHistory);
    return game;
  }

  addOnePlayerHistoryEntry(players) {
    let existingMonthAndYearIndex = this.#getExistingMonthAndYearIndex();
    if (existingMonthAndYearIndex === -1) {
      this.playerHistory.push(PlayerHistory.newMonthlyEntry());
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

  addHistoryFromSteamcharts(gameHistories) {
    const fixedGameHistories = PlayerHistory.manyFromSteamchartsPage(gameHistories);

    fixedGameHistories.forEach((history) => this.playerHistory.push(history));

    this.playerHistory = this.#sortGameHistoriesByDate(this.playerHistory);
  }

  #sortGameHistoriesByDate(gameHistories) {
    const sortedHistories = [...gameHistories];

    sortedHistories.sort((a, b) => {
      const dateA = new Date(a.year, a.month);
      const dateB = new Date(b.year, b.month);

      return dateA - dateB;
    });

    return sortedHistories;
  }
}
