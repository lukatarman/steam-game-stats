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
}
