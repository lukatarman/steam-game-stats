import { Players } from "./players.js";

describe("players.js", function () {
  describe("Players", function () {
    describe("if nothing is passed as the second parameter when instantiating", function () {
      beforeEach(function () {
        this.currentDate = new Date();
        this.players = new Players("24");
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
        this.players = new Players("24", "September 2000");
      });

      it("the property date should be the current date", function () {
        expect(this.players.date).toEqual(this.currentDatePlusTwelveHours);
      });
    });

    describe("if zero is passed in as the player number", function () {
      beforeEach(function () {
        this.currentDate = new Date();
        this.players = new Players("0", this.currentDate);
      });

      it("the property date should be the current date", function () {
        expect(this.players.players).toBe(0);
      });
    });

    describe("if 5473.4 is passed in as the player number", function () {
      beforeEach(function () {
        this.currentDate = new Date();
        this.players = new Players("5473.4", this.currentDate);
      });

      it("the property date should be the current date", function () {
        expect(this.players.players).toBe(5473.4);
      });
    });
  });
});
