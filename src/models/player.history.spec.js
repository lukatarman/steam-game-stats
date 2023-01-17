import { PlayerHistory } from "./player.history.js";
import { TrackedPlayers } from "./tracked.players.js";

describe("PlayerHistory", function () {
  describe(".manyFromDbEntry creates a list of PlayerHistory instances from a list of PlayerHistory database documents.", function () {
    describe("When a list of history objects is passed in, ", function () {
      beforeEach(function () {
        const firstDate = new Date("December 2022");
        const secondDate = new Date("November 2022");

        this.histories = [
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

        this.result = PlayerHistory.manyFromDbEntry(this.histories);
      });

      it("the first entry is an instance of PlayerHistory.", function () {
        expect(this.result[0]).toBeInstanceOf(PlayerHistory);
      });
      it("the first entry player history instance is identical to the document.", function () {
        expect(this.result[0].year).toBe(this.histories[0].year);
        expect(this.result[0].month).toBe(this.histories[0].month);
        expect(this.result[0].averagePlayers).toBe(this.histories[0].averagePlayers);
        expect(this.result[0].trackedPlayers[0].players).toBe(
          this.histories[0].trackedPlayers[0].players,
        );
      });
      it("the first entry has a property called 'trackedPlayers', which is an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
      });
      it("the second entry is an instance of PlayerHistory.", function () {
        expect(this.result[1]).toBeInstanceOf(PlayerHistory);
      });
      it("the second entry player history instance is identical to the document.", function () {
        expect(this.result[1].year).toBe(this.histories[1].year);
        expect(this.result[1].month).toBe(this.histories[1].month);
        expect(this.result[1].averagePlayers).toBe(this.histories[1].averagePlayers);
        expect(this.result[1].trackedPlayers[0].players).toBe(
          this.histories[1].trackedPlayers[0].players,
        );
      });
      it("the second entry has a property called 'trackedPlayers', which is an instance of 'TrackedPlayers'", function () {
        expect(this.result[1].trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
      });
    });

    describe("When no documents are provided,", function () {
      beforeEach(function () {
        this.result = PlayerHistory.manyFromDbEntry([]);
      });

      it("no instanced are created.", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".fromRawData creates a new playerHistory instance.", function () {
    describe("When players and a date are passed in,", function () {
      beforeEach(function () {
        this.players = 62;
        this.date = "September 2014";

        this.result = PlayerHistory.fromRawData(this.players, this.date);
      });

      it("the result is an instance of PlayerHistory.", function () {
        expect(this.result).toBeInstanceOf(PlayerHistory);
      });
      it("the player history year property equals to the year of the passed in date.", function () {
        expect(this.result.year).toBe(new Date(this.date).getFullYear());
      });
      it("the player history month property equals to the month of the passed in date.", function () {
        expect(this.result.month).toBe(new Date(this.date).getMonth());
      });
      it("the player history average players property equals to the passed in players.", function () {
        expect(this.result.averagePlayers).toBe(this.players);
      });
      it("the player history tracked players property is an instance of TrackedPlayers", function () {
        expect(this.result.trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
      });
      it("the player history tracked players has a players property, which equals to the passed in players.", function () {
        expect(this.result.trackedPlayers[0].players).toBe(this.players);
      });
    });
  });

  describe(".newMonthlyEntry creates a new PlayerHistory instance for the current month. The result", function () {
    fdescribe("When players are passed in,", function () {
      beforeEach(function () {
        this.players = 42;
        this.result = PlayerHistory.newMonthlyEntry(this.players);
      });

      it("the result is an instance of PlayerHistory", function () {
        expect(this.result).toBeInstanceOf(PlayerHistory);
      });
      it("the player history year property equals the current year.", function () {
        expect(this.result.year).toBe(new Date().getFullYear());
      });
      it("the player history month property equals the current month.", function () {
        expect(this.result.month).toBe(new Date().getMonth());
      });
      it("the player history average players property equals the passed in players", function () {
        expect(this.result.averagePlayers).toBe(this.players);
      });
      it("the player history tracked players property is an instance of TrackedPlayers", function () {
        expect(this.result.trackedPlayers[0]).toBeInstanceOf(TrackedPlayers);
      });
      it("the player history tracked players has a players property, which equals to the passed in players.", function () {
        expect(this.result.trackedPlayers[0].players).toBe(this.players);
      });
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
