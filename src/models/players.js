export class Players {
  date;
  players;

  constructor(playersAsString, dateAsString = "") {
    //todo: when mongoDb stores dates into its databases, it automatically transforms them into UTC format.
    // https://www.mongodb.com/docs/v3.2/tutorial/model-time-data/
    //Think about changing steamcharts time to noon each day instead of midnight. Timezone differences wont mess up day
    // as for current time just leave it as it is, it most likely ownt mess up anything
    // add 12 hours to date, if date isnt empty string

    const currentTimeUTC = new Date();
    const timeUTC = new Date(dateAsString);

    this.date = dateAsString === "" ? currentTimeUTC : timeUTC;
    /**
     * @TODO - https://github.com/lukatarman/steam-game-stats/issues/52
     */
    this.players = parseFloat(parseFloat(playersAsString).toFixed(1));
  }
}
