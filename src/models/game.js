export class Game {
  id;            // appid=123456
  name;          // name="Metro"
  image;         // imgData=['D%', '7Z', 'HJ', ')I', 'LK'...'M;'];
  imageUrl;      // imageUrl=`https://cdn.akamai.steamstatic.com/steam/apps/${this.id}/header.jpg`
  playerHistory; // playerHistory=[{ date: "05.04.22", players: 122 }, { date: "04.04.22", players: 200 }, { date: "03.04.22", players: 150 }]
  checkedSteamchartsHistory;

  constructor(steamApp) {
    this.id = steamApp.appid;
    this.name = steamApp.name;
    this.imageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${this.id}/header.jpg`
    this.playerHistory = [];
    this.checkedSteamchartsHistory = false;
  }

  static fromDbEntry(dbEntry) {
    const game                     = new Game();
    game.id                        = dbEntry.id;
    game.name                      = dbEntry.name;
    game.imageUrl                  = dbEntry.imageUrl;
    game.playerHistory             = dbEntry.playerHistory;
    game.checkedSteamchartsHistory = dbEntry.checkedSteamchartsHistory;
    return game;
  }

  get lastUpdate() {
    return this.playerHistory[this.playerhistory.length - 1].date;
  }
}
