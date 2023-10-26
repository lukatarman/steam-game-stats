export class TrackedPlayers {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    this.date = dateAsString === "" ? new Date() : this.#fixDate(dateAsString);

    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }

  #fixDate(dateAsString) {
    const date = new Date(dateAsString);

    if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
      return new Date(`${dateAsString} UTC`);
    }

    return date;
  }

  static manyFromDbEntry(trackedPlayersArray) {
    return trackedPlayersArray.map(
      ({ players, date }) => new TrackedPlayers(players, date),
    );
  }
}
