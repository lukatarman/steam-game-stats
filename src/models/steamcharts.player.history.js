export class SteamchartsPlayerHistory {
  gameId;
  checked;
  found;

  constructor(game) {
    this.gameId = game.id;
    this.checked = true;
  }
}