export class Players {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    this.date = dateAsString === "" ? new Date() : new Date(dateAsString);
    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }
}
