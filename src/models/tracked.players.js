export class TrackedPlayers {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    // We add twelve hours to the date saved in the players class to remove any issues related to any
    // automatic changing of dates at any point. Currently, this is relevant because mongoDB automatically converts
    // all dates into the UTC timezone. This marks our dates as being part of the wrong month when saving
    // the entries into the database.

    this.date = dateAsString === "" ? new Date() : this.#fixDate(dateAsString);

    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }

  #fixDate(dateAsString) {
    if (date.getHours && date.getMinutes && date.getSeconds)
      return new Date(dateAsString);

    return this.#addTwelveHours(dateAsString);
  }

  #addTwelveHours(date) {
    const dateInMs = Date.parse(date);
    const twelveHoursInMs = 12 * 60 * 60 * 1000;

    return new Date(dateInMs + twelveHoursInMs);
  }

  static manyFromDbEntry(trackedPlayersArray) {
    return trackedPlayersArray.map(
      ({ players, date }) => new TrackedPlayers(players, date),
    );
  }
}
