import { Players } from "./players.js";

describe("Players", function () {
  describe(".manyFromSteamChartsPage takes the passed in array, and instantiates it with the 'fromSteamcharts' method. So,", function () {
    describe("when the passed in array contains player histories,", function () {
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

      it("the returned array's first entry is an instance of 'Player'", function () {
        expect(this.results[0]).toBeInstanceOf(Players);
      });
      it("the returned array's first entry will have a property called 'year', which equals the current year.", function () {
        expect(this.results[0].year).toBe(this.currentDate.getFullYear());
      });
      it("the returned array's first entry will have a property called 'month', which equals the current month.", function () {
        expect(this.results[0].month).toBe(this.currentDate.getMonth());
      });
      it("the returned array's first entry will have a property called 'averagePlayers', which equals '23'", function () {
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

  describe(".newMonthlyEntry instantiates the Players class with default values. So,", function () {
    beforeEach(function () {
      this.currentDate = new Date();

      this.result = Players.newMonthlyEntry();
    });

    it("the returned object is an instance of Players", function () {
      expect(this.result).toBeInstanceOf(Players);
    });
    it("the returned object has a property called 'year'. It's value equals the current year", function () {
      expect(this.result.year).toBe(this.currentDate.getFullYear());
    });
    it("the returned object has a property called 'month'. It's value equals the current month", function () {
      expect(this.result.month).toBe(this.currentDate.getMonth());
    });
    it("the returned object has a property called 'averagePlayers'. It's value equals '0'", function () {
      expect(this.result.averagePlayers).toBe(0);
    });
    it("the returned object has a property called 'trackedPlayers'. It's value equals an empty array.", function () {
      expect(this.result.trackedPlayers).toEqual([]);
    });
  });
});
