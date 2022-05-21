export class Players {
  date;
  players;

  constructor(dateAsString, playersAsString) {
    this.date = new Date(dateAsString);
    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }
}
