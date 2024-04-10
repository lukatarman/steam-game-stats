import { Game } from "./game.js";

export class GamesAggregate {
  #games;

  constructor(games) {
    this.#games = games.map((game) => Game.fromDbEntry(game));
  }

  get content() {
    return this.#games;
  }

  get ids() {
    return this.#games.map((game) => game.id);
  }

  get isEmpty() {
    if (this.#games.length > 0) return false;

    return true;
  }

  updateGameDetailsFrom(htmlDetailsPages) {
    this.#games = this.#games.map((game) => {
      const gameCopy = game.copy();

      const page = this.findPageForGameById(htmlDetailsPages, gameCopy.id);

      gameCopy.updateGameDetailsFrom(page);

      return gameCopy;
    });
  }

  findPageForGameById(htmlDetailsPages, gameId) {
    return htmlDetailsPages.find((page) => gameId === page.id).page;
  }

  extractReleaseDatesFrom(htmlDetailsPages) {
    this.#games = this.#games.map((game) => {
      const gameCopy = game.copy();

      const page = this.findPageForGameById(htmlDetailsPages, gameCopy.id);

      gameCopy.updateReleaseDate(page);

      return gameCopy;
    });
  }
}
