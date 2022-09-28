export class Players {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    // We add twelve hours to the date saved in the players class to remove any issues related to changing
    // the timezones later on.

    this.date = dateAsString === "" ? new Date() : this.#addTwelveHours(dateAsString);

    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }

  #addTwelveHours(date) {
    const dateInMs = Date.parse(date);
    const twelveHoursInMs = 12 * 60 * 60 * 1000;

    return new Date(dateInMs + twelveHoursInMs);
  }
}
