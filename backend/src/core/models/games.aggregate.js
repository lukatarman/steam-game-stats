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

  updateGamesMissingDetails(htmlDetailsPages) {
    this.games = this.games.map((game) => {
      const gameCopy = game.copy();

      const page = this.#findGamesHtmlDetailsPage(htmlDetailsPages, gameCopy);

      gameCopy.updateGameDetails(page);

      return gameCopy;
    });
  }

  #findGamesHtmlDetailsPage(htmlDetailsPages, game) {
    return htmlDetailsPages.find((page) => game.id === page.id).page;
  }

  updateMissingReleaseDates(htmlDetailsPages) {
    this.games = this.games.map((game) => {
      const gameCopy = game.copy();

      const page = this.#findGamesHtmlDetailsPage(htmlDetailsPages, gameCopy);

      gameCopy.updateReleaseDate(page);

      return gameCopy;
    });
  }
}
