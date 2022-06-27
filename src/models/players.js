export class Players {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    this.date = dateAsString === "" ? new Date() : new Date(dateAsString);
    /**
     * @TODO - https://github.com/lukatarman/steam-game-stats/issues/52
     */
    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }
}
