export class HistoryCheck {
  gameId;
  checked;
  found;
  source;

  constructor(game, found, source = "steamcharts") {
    this.gameId = game.id;
    this.checked = true;
    this.found = found;
    this.source = source;
  }
}