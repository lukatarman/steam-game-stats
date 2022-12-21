import { PlayerHistory } from "./player.history.js";
import { TrackedPlayers } from "./tracked.players.js";

fdescribe("PlayerHistory", function () {
  describe(".manyFromDbEntry creates a list of PlayerHistory instances from a list of history objects.", function () {
    describe("When a list of history objects is passed in, ", function () {
      beforeEach(function () {
        this.histories = [
          {
            year: "2022",
            month: "11",
            averagePlayers: 34,
            trackedPlayers: [],
          },
          {
            year: "2022",
            month: "10",
            averagePlayers: 78,
            trackedPlayers: [],
          },
        ];

        this.result = PlayerHistory.manyFromDbEntry(this.histories);
      });

      it("the first result is an instance of PlayerHistory.", function () {
        expect(this.result[0]).toBeInstanceOf(PlayerHistory);
      });
      it("the first result has a property called year, which equals 2022.", function () {
        expect(this.result[0].year).toBe("2022");
      });
      it("the first result has a property called month, which equals 11.", function () {
        expect(this.result[0].month).toBe("11");
      });
      it("the first result has a property called averagePlayers, which equals 34", function () {
        expect(this.result[0].averagePlayers).toBe(34);
      });
      it("the second result is an instance of PlayerHistory.", function () {
        expect(this.result[1]).toBeInstanceOf(PlayerHistory);
      });
      it("the second result has a property called year, which equals 2022.", function () {
        expect(this.result[1].year).toBe("2022");
      });
      it("the second result has a property called month, which equals 10.", function () {
        expect(this.result[1].month).toBe("10");
      });
      it("the second result has a property called averagePlayers, which equals 78", function () {
        expect(this.result[1].averagePlayers).toBe(78);
      });
    });

    describe("When the passed in array is empty,", function () {
      beforeEach(function () {
        this.result = PlayerHistory.manyFromDbEntry([]);
      });

      it("the returned array's will be empty", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".fromRawData instantiates a new PlayerHistory object and returns it.", function () {
    describe("When players and a date are passed in,", function () {
      beforeEach(function () {
        this.players = 62;
        this.date = "September 2014";

        this.result = PlayerHistory.fromRawData(this.players, this.date);
      });

      it("the result is an instance of PlayerHistory.", function () {
        expect(this.result).toBeInstanceOf(PlayerHistory);
      });
      it("the result has a property called year, which equals 2014.", function () {
        expect(this.result.year).toBe(2014);
      });
      it("the result has a property called month, which equals 8.", function () {
        expect(this.result.month).toBe(8);
      });
      it("the result has a property called averagePlayers, which equals 62", function () {
        expect(this.result.averagePlayers).toBe(62);
      });
    });
  });

  fdescribe(".newMonthlyEntry instantiates the PlayerHistory class with default values. The returned object", function () {
    beforeEach(function () {
      this.currentDate = new Date();

      this.result = PlayerHistory.newMonthlyEntry(42);
      debugger;
    });

    it("is an instance of PlayerHistory", function () {
      expect(this.result).toBeInstanceOf(PlayerHistory);
    });
    it("has a property called 'year'. It's value equals the current year", function () {
      expect(this.result.year).toBe(this.currentDate.getFullYear());
    });
    it("has a property called 'month'. It's value equals the current month", function () {
      expect(this.result.month).toBe(this.currentDate.getMonth());
    });
    it("has a property called 'averagePlayers'. It's value equals '42'", function () {
      expect(this.result.averagePlayers).toBe(42);
    });
    it("has a property called 'trackedPlayers'. It is an instance of TrackedPlayers", function () {
      expect(this.result.trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
    });
    it("has a property called 'players'. It's value equals '42'", function () {
      expect(this.result.trackedPlayers[0].players).toBe(42);
    });
  });

  describe(".push adds an new instance of TrackedPlayers, and updates the average players property. The modified object", function () {
    beforeEach(function () {
      this.firstPlayers = "10";
      this.secondPlayers = "50";

      this.result = PlayerHistory.newMonthlyEntry();

      this.result.push(this.firstPlayers);
      this.result.push(this.secondPlayers);
    });

    it("has a 'players' property in its trackedPlayers first array value, which equals 10", function () {
      expect(this.result.trackedPlayers[0].players).toBe(10);
    });
    it("has a 'players' property in its trackedPlayers second array value, which equals 50", function () {
      expect(this.result.trackedPlayers[1].players).toBe(50);
    });
    it("has its averagePlayers property updated to 30", function () {
      expect(this.result.averagePlayers).toBe(30);
    });
  });
});
