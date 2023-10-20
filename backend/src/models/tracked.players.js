import { StandardizedDate } from "./standardized.date.js";

export class TrackedPlayers {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    this.date = dateAsString === "" ? new Date() : this.#fixDate(dateAsString);

    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }

  #fixDate(dateAsString) {
    if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
      return StandardizedDate.getUTCDate(dateAsString).date;
    }

    return new Date(dateAsString);
  }

  static manyFromDbEntry(trackedPlayersArray) {
    return trackedPlayersArray.map(
      ({ players, date }) => new TrackedPlayers(players, date),
    );
  }
}
