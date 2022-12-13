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

  get lastUpdate() {
    return this.hasHistory
      ? this.playerHistory[this.playerHistory.length - 1].date
      : undefined;
  }

  get hasHistory() {
    return this.playerHistory && this.playerHistory.length !== 0;
  }
}
