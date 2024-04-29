import { Game } from "./game.js";

export class GamesAggregate {
  #games;

  constructor(games) {
    this.#games = games.map((game) => Game.fromDbEntry(game));
  }

  get content() {
    return new GamesAggregate(structuredClone(this.#games)).#games;
  }

  get ids() {
    return this.#games.map((game) => game.id);
  }

  get isEmpty() {
    return !this.#games.length > 0;
  }

  updateGameDetailsFrom(htmlDetailsPages) {
    this.#games = this.#games.map((game) => {
      const gameCopy = game.copy();

      const page = this.#findPageForGameById(htmlDetailsPages, gameCopy.id);

      gameCopy.updateGameDetailsFrom(page);

      return gameCopy;
    });
  }

  #findPageForGameById(htmlDetailsPages, gameId) {
    return htmlDetailsPages.find((page) => gameId === page.id).page;
  }

  extractReleaseDatesFrom(htmlDetailsPages) {
    this.#games = this.#games.map((game) => {
      const gameCopy = game.copy();

      const page = this.#findPageForGameById(htmlDetailsPages, gameCopy.id);

      gameCopy.updateReleaseDate(page);

      return gameCopy;
    });
  }
}
