import { Players } from "./players.js";

describe("Players", function () {
  describe(".manyFromSteamChartsPage creates a list of Player instances from a list of history objects. So,", function () {
    describe("when a list of history objects is passed in", function () {
      beforeEach(function () {
        this.currentDate = new Date();

        this.histories = [
          {
            players: 23,
            date: new Date(),
          },
        ];

        this.results = Players.manyFromSteamchartsPage(this.histories);
      });

      it("the result is a list of Player instances.", function () {
        expect(this.results[0]).toBeInstanceOf(Players);
      });
      it("a Player instance year is the same as the history object year.", function () {
        expect(this.results[0].year).toBe(this.currentDate.getFullYear());
      });
      it("a Player instance month is the same as the history object month.", function () {
        expect(this.results[0].month).toBe(this.currentDate.getMonth());
      });
      it("a Player instance averagePlayers is the same as the history object averagePlayers", function () {
        expect(this.results[0].averagePlayers).toBe(23);
      });
    });

    describe("when the passed in array is empty", function () {
      beforeEach(function () {
        this.results = Players.manyFromSteamchartsPage([]);
      });

      it("the returned array's will be empty", function () {
        expect(this.results).toEqual([]);
      });
    });
  });

  describe(".newMonthlyEntry instantiates the Players class with default values. So, the returned object", function () {
    beforeEach(function () {
      this.currentDate = new Date();

      this.result = Players.newMonthlyEntry();
    });

    it("is an instance of Players", function () {
      expect(this.result).toBeInstanceOf(Players);
    });
    it("has a property called 'year'. It's value equals the current year", function () {
      expect(this.result.year).toBe(this.currentDate.getFullYear());
    });
    it("has a property called 'month'. It's value equals the current month", function () {
      expect(this.result.month).toBe(this.currentDate.getMonth());
    });
    it("has a property called 'averagePlayers'. It's value equals '0'", function () {
      expect(this.result.averagePlayers).toBe(0);
    });
    it("has a property called 'trackedPlayers'. It's value equals an empty array.", function () {
      expect(this.result.trackedPlayers).toEqual([]);
    });
  });
});
