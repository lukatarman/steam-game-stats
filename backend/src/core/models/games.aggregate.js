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

  extractReleaseDatesViaSteamApi(steamApiApps) {
    this.#games = this.#games.map((game) => {
      const gameCopy = game.copy();

      const steamApiApp = this.#findGameByAppId(steamApiApps, gameCopy.id);

      if (!steamApiApp) return gameCopy;

      gameCopy.updateReleaseDateViaSteamApi(steamApiApp.releaseDate.date);

      return gameCopy;
    });
  }

  #findGameByAppId(steamApiApps, gameId) {
    return steamApiApps.find((app) => app.id === gameId);
  }
}
