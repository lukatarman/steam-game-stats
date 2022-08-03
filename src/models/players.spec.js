import { Players } from "./players.js";

describe("players.js", () => {
  describe("Players", () => {
    describe("if nothing is passed as the second parameter when instantiating", () => {
      let players;
      let currentDate;

      beforeAll(() => {
        currentDate = new Date();
        players = new Players("24");
      });

      it("the property date should be the current date", () => {
        expect(players.date).toEqual(currentDate);
      });
    });

    describe("if a date is passed as the second parameter when instantiating", () => {
      let players;
      let currentDate;

      beforeAll(() => {
        currentDate = new Date("September 2000");
        players = new Players("24", "September 2000");
      });

      it("the property date should be the current date", () => {
        expect(players.date).toEqual(currentDate);
      });
    });

    describe("if zero is passed in as the player number", () => {
      let players;
      let currentDate;

      beforeAll(() => {
        currentDate = new Date();
        players = new Players("0", currentDate);
      });

      it("the property date should be the current date", () => {
        expect(players.players).toBe(0);
      });
    });

    describe("if 5473,4 is passed in as the player number", () => {
      let players;
      let currentDate;

      beforeAll(() => {
        currentDate = new Date();
        players = new Players("5473.4", currentDate);
      });

      it("the property date should be the current date", () => {
        expect(players.players).toBe(5473.4);
      });
    });
  });
});
