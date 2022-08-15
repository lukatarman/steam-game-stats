import { Players } from "./players.js";

describe("players.js", function () {
  describe("Players", function () {
    describe("if nothing is passed as the second parameter when instantiating", function () {
      let players;
      let currentDate;

      beforeAll(function () {
        currentDate = new Date();
        players = new Players("24");
      });

      it("the property date should be the current date", function () {
        expect(players.date).toEqual(currentDate);
      });
    });

    describe("if a date is passed as the second parameter when instantiating", function () {
      let players;
      let currentDate;

      beforeAll(function () {
        currentDate = new Date("September 2000");
        players = new Players("24", "September 2000");
      });

      it("the property date should be the current date", function () {
        expect(players.date).toEqual(currentDate);
      });
    });

    describe("if zero is passed in as the player number", function () {
      let players;
      let currentDate;

      beforeAll(function () {
        currentDate = new Date();
        players = new Players("0", currentDate);
      });

      it("the property date should be the current date", function () {
        expect(players.players).toBe(0);
      });
    });

    describe("if 5473.4 is passed in as the player number", function () {
      let players;
      let currentDate;

      beforeAll(function () {
        currentDate = new Date();
        players = new Players("5473.4", currentDate);
      });

      it("the property date should be the current date", function () {
        expect(players.players).toBe(5473.4);
      });
    });
  });
});
