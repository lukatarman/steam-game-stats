import { TrackedPlayers } from "./tracked.players.js";

describe("TrackedPlayers", function () {
  describe("Instantiates the TrackedPlayers class.", function () {
    describe("When no date is provided", function () {
      beforeAll(function () {
        jasmine.clock().mockDate(new Date());

        this.players = new TrackedPlayers("24");
      });

      afterAll(function () {
        jasmine.clock().uninstall();
      });

      it("the current date is used.", function () {
        expect(this.players.date).toEqual(new Date());
      });
    });

    describe("when a date with specified hour, minute or seconds is provided", function () {
      beforeAll(function () {
        this.currentDate = new Date("11:24 September 2000");

        this.players = new TrackedPlayers("24", "11:24 September 2000");
      });

      it("the date property equals the passed in date.", function () {
        expect(this.players.date).toEqual(this.currentDate);
      });
    });

    describe("when a date without specified hours, minutes or seconds is provided", function () {
      beforeAll(function () {
        const date = new Date("September 2000");

        this.players = new TrackedPlayers("24", date);
      });

      it("the result is the correct date", function () {
        expect(this.players.date.toISOString()).toEqual("2000-09-01T00:00:00.000Z");
      });
    });
  });

  describe("Player numbers are tracked with one decimal precision", function () {
    it("5473.43 is stored as 5473.4", function () {
      expect(new TrackedPlayers("5473.43").players).toBe(5473.4);
    });
  });

  describe(".manyFromDbEntry creates a list of TrackedPlayers instances from a list of PlayerHistory objects", function () {
    describe("When an list of PlayerHistory objects is passed in,", function () {
      beforeAll(function () {
        jasmine.clock().mockDate(new Date());

        this.currentDate = new Date();

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

        this.result = TrackedPlayers.manyFromDbEntry(this.trackedPlayersArray);
      });

      afterAll(function () {
        jasmine.clock().uninstall();
      });

      it("the first entry is an instance of TrackedPlayers.", function () {
        expect(this.result[0]).toBeInstanceOf(TrackedPlayers);
      });

      it("the first entry trackedPlayers instance players property equals 20", function () {
        expect(this.result[0].players).toBe(this.trackedPlayersArray[0].players);
      });

      it("the first entry trackedPlayers instance players property equals the passed in date.", function () {
        expect(this.result[0].date).toEqual(this.currentDate);
      });

      it("the second entry is an instance of TrackedPlayers.", function () {
        expect(this.result[1]).toBeInstanceOf(TrackedPlayers);
      });

      it("the second entry TrackedPlayers instance players property equals 15.", function () {
        expect(this.result[1].players).toBe(15);
      });

      it("the second entry trackedPlayers instance players property equals the passed in date.", function () {
        expect(this.result[1].date).toEqual(this.currentDate);
      });
    });

    describe("When the passed in array is empty,", function () {
      beforeAll(function () {
        this.result = TrackedPlayers.manyFromDbEntry([]);
      });

      it("the returned array's will be empty", function () {
        expect(this.result).toEqual([]);
      });
    });
  });
});
