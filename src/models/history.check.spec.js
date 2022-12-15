import { HistoryCheck } from "./history.check.js";

describe("history.check.js", function () {
  describe("HistoryCheck", function () {
    describe(".manyFromSteamchartsPages adds a HistoryCheck object for each game in the gamesPagesMap.", function () {
      describe("When the games pages map's pages properties contain one truthy and one falsy value", function () {
        beforeEach(function () {
          this.firstGame = { id: 1 };
          this.secondGame = { id: 2 };

          this.map = new Map();

          this.map.set(this.firstGame, true);
          this.map.set(this.secondGame, false);

          this.result = HistoryCheck.manyFromSteamchartsPages(this.map);
        });

        it("the first result is an instance of HistoryCheck", function () {
          expect(this.result[0]).toBeInstanceOf(HistoryCheck);
        });
        it("the first result has a value of gameId, which equals 1", function () {
          expect(this.result[0].gameId).toBe(1);
        });
        it("the first result has a value of found, which equals true", function () {
          expect(this.result[0].found).toBeTrue();
        });
        it("the second result is an instance of HistoryCheck", function () {
          expect(this.result[1]).toBeInstanceOf(HistoryCheck);
        });
        it("the second result has a value of gameId, which equals 2", function () {
          expect(this.result[1].gameId).toBe(2);
        });
        it("the second result has a value of found, which equals true", function () {
          expect(this.result[1].found).toBeFalse();
        });
      });
    });
  });
});
