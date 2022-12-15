import { TrackedPlayers } from "./tracked.players.js";

describe("tracked.players.js", function () {
  describe("TrackedPlayers", function () {
    describe("if nothing is passed as the second parameter when instantiating", function () {
      beforeEach(function () {
        this.currentDate = new Date();
        this.players = new TrackedPlayers("24");
      });

      it("the property date should be the current date", function () {
        expect(this.players.date).toEqual(this.currentDate);
      });
    });

    describe("if a date is passed as the second parameter when instantiating", function () {
      beforeEach(function () {
        this.currentDate = new Date("September 2000");
        this.twelveHoursInMs = 12 * 60 * 60 * 1000;
        this.datePlusTwelveHoursInMs =
          Date.parse(this.currentDate) + this.twelveHoursInMs;

        this.currentDatePlusTwelveHours = new Date(this.datePlusTwelveHoursInMs);
        this.players = new TrackedPlayers("24", "September 2000");
      });

      it("the property date should be the current date, plus twelve hours", function () {
        expect(this.players.date).toEqual(this.currentDatePlusTwelveHours);
      });
    });

    describe("if zero is passed in as the player number", function () {
      beforeEach(function () {
        this.currentDate = new Date();
        this.players = new TrackedPlayers("0", this.currentDate);
      });

      it("the property 'players' should be 0", function () {
        expect(this.players.players).toBe(0);
      });
    });

    describe("if 5473.4 is passed in as the player number", function () {
      beforeEach(function () {
        this.currentDate = new Date();
        this.players = new TrackedPlayers("5473.4", this.currentDate);
      });

      it("the property players should be '5473'", function () {
        expect(this.players.players).toBe(5473.4);
      });
    });

    fdescribe(".manyFromDbEntry creates a list of TrackedPlayers instances from an array of objects.", function () {
      describe("When an array of objects is passed in,", function () {
        beforeEach(function () {
          this.currentDate = new Date();

          this.twelveHoursInMs = 12 * 60 * 60 * 1000;

          this.datePlusTwelveHoursInMs =
            Date.parse(this.currentDate) + this.twelveHoursInMs;

          this.currentDatePlusTwelveHours = new Date(this.datePlusTwelveHoursInMs);

          this.trackedPlayersArray = [
            {
              players: 20,
              date: this.currentDate,
            },
            {
              players: 15,
              date: this.currentDate,
            },
          ];

          this.results = TrackedPlayers.manyFromDbEntry(this.trackedPlayersArray);
        });

        it("the first result is an intance of Players.", function () {
          expect(this.results[0]).toBeInstanceOf(TrackedPlayers);
        });
        it("the first result has a property'players' which equals 20.", function () {
          expect(this.results[0].players).toBe(20);
        });
        it("the first result has a property'date' which equals the current date.", function () {
          expect(this.results[0].date).toEqual(this.currentDatePlusTwelveHours);
        });
        it("the second result is an intance of Players.", function () {
          expect(this.results[1]).toBeInstanceOf(TrackedPlayers);
        });
        it("the second result has a property'players' which equals 15.", function () {
          expect(this.results[1].players).toBe(15);
        });
        it("the second result has a property'date' which equals the current date.", function () {
          expect(this.results[1].date).toEqual(this.currentDatePlusTwelveHours);
        });
      });

      describe("When the passed in array is empty,", function () {
        beforeEach(function () {
          this.results = TrackedPlayers.manyFromDbEntry([]);
        });

        it("the returned array's will be empty", function () {
          expect(this.results).toEqual([]);
        });
      });
    });
  });
});
