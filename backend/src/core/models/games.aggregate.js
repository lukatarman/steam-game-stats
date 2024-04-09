import { Game } from "./game.js";

export class GamesAggregate {
  games;

  static manyFromDbEntries(games) {
    const gamesAggregate = new GamesAggregate();
    gamesAggregate.games = games.map((game) => Game.fromDbEntry(game));

    return gamesAggregate;
  }

  get ids() {
    return this.games.map((game) => game.id);
  }

  isEmpty() {
    if (this.games.length > 0) return false;

    return true;
  }

  updateGameDetailsFrom(htmlDetailsPages) {
    this.games = this.games.map((game) => {
      const gameCopy = game.copy();

      const page = this.#findGamesHtmlDetailsPage(htmlDetailsPages, gameCopy);

      gameCopy.updateGameDetailsFrom(page);

      return gameCopy;
    });
  }

  #findGamesHtmlDetailsPage(htmlDetailsPages, game) {
    return htmlDetailsPages.find((page) => game.id === page.id).page;
  }

  extractReleaseDatesFrom(htmlDetailsPages) {
    this.games = this.games.map((game) => {
      const gameCopy = game.copy();

      const page = this.#findGamesHtmlDetailsPage(htmlDetailsPages, gameCopy);

      gameCopy.updateReleaseDate(page);

      return gameCopy;
    });
  }
}
