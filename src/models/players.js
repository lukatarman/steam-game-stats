export class Players {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    this.date = dateAsString === "" ? new Date() : this.#addTwelveHours(dateAsString);

    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }

  #addTwelveHours(date) {
    const dateInMs = Date.parse(date);
    const twelveHoursInMs = 12 * 60 * 60 * 1000;

    return new Date(dateInMs + twelveHoursInMs);
  }
}
