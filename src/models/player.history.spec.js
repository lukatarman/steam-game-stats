import { PlayerHistory } from "./player.history.js";
import { TrackedPlayers } from "./tracked.players.js";

describe("PlayerHistory", function () {
  describe(".manyFromDbEntry creates a list of PlayerHistory instances from a list of history objects.", function () {
    describe("When a list of history objects is passed in, ", function () {
      beforeEach(function () {
        const firstDate = new Date("December 2022");
        const secondDate = new Date("November 2022");

        const histories = [
          {
            year: "2022",
            month: "11",
            averagePlayers: 34,
            trackedPlayers: [{ players: 34, date: firstDate }],
          },
          {
            year: "2022",
            month: "10",
            averagePlayers: 78,
            trackedPlayers: [{ players: 78, date: secondDate }],
          },
        ];

        this.result = PlayerHistory.manyFromDbEntry(histories);
        debugger;
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
      it("the first result has a property called 'trackedPlayers', which is an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
      });
      it("the first result has a property players, which equals 34", function () {
        expect(this.result[0].trackedPlayers[0].players).toBe(34);
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
      it("the second result has a property called 'trackedPlayers', which is an instance of 'TrackedPlayers'", function () {
        expect(this.result[1].trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
      });
      it("the second result has a property players, which equals 78", function () {
        expect(this.result[1].trackedPlayers[0].players).toBe(78);
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
        const players = 62;
        const date = "September 2014";

        this.result = PlayerHistory.fromRawData(players, date);
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
      it("the result has a property called tracked players, which is an instance of TrackedPlayers", function () {
        expect(this.result.trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
      });
      it("the result has a property called players, which equals 62", function () {
        expect(this.result.trackedPlayers[0].players).toBe(62);
      });
    });
  });

  describe(".newMonthlyEntry instantiates the PlayerHistory class with default values. The returned object", function () {
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

  describe(".pushCurrentPlayers adds an new instance of TrackedPlayers, and updates the average players property. The modified object", function () {
    beforeEach(function () {
      const firstPlayers = "10";
      const firstDate = "October 2020";
      const secondPlayers = "50";
      const secondDate = "August 2019";
      const currentPlayers = "15";

      this.result = PlayerHistory.newMonthlyEntry(currentPlayers);

      this.result.pushCurrentPlayers(firstPlayers, firstDate);
      this.result.pushCurrentPlayers(secondPlayers, secondDate);
    });

    it("has a 'players' property in its trackedPlayers first array value, which equals 15", function () {
      expect(this.result.trackedPlayers[0].players).toBe(15);
    });
    it("has a 'players' property in its trackedPlayers second array value, which equals 10", function () {
      expect(this.result.trackedPlayers[1].players).toBe(10);
    });
    it("has a 'players' property in its trackedPlayers third array value, which equals 50", function () {
      expect(this.result.trackedPlayers[2].players).toBe(50);
    });
    it("has its averagePlayers property updated to 25", function () {
      expect(this.result.averagePlayers).toBe(25);
    });
  });
});
