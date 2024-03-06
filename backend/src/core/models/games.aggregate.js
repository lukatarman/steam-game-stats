import { Game } from "./game.js";

export class GamesAggregate {
  games;

  static manyFromDbEntries(games) {
    const gamesAggregate = new GamesAggregate();
    gamesAggregate.games = games.map((game) => Game.fromDbEntry(game));

    return gamesAggregate;
  }

  getIds() {
    return this.games.map((game) => game.id);
  }

  isEmpty() {
    if (this.games.length > 0) return false;

    return true;
  }

  updateMissingReleaseDates(htmlDetailsPages) {
    this.games = this.games.map((game) => {
      const gameCopy = game.copy();

      const page = htmlDetailsPages.find((page) => gameCopy.id === page.id).page;

      gameCopy.updateReleaseDate(page);

      return gameCopy;
    });
  }
}
