import { Game } from "./game.js";

export class GamesAggregate {
  games;
  logger;

  static manyFromDbEntries(games, logger) {
    const gamesAggregate = new GamesAggregate();
    gamesAggregate.games = games.map((game) => Game.fromDbEntry(game));
    gamesAggregate.logger = logger;

    return gamesAggregate;
  }

  getIds() {
    return this.games.map((game) => game.id);
  }

  checkIfEmpty(delay, message) {
    if (this.games.length > 0) return false;

    this.logger.debugc(`no games without ${message} in db, retry in: ${delay} ms`);

    return true;
  }
}
