import { createLoggerMock } from "../../common/logger.mock.js";
import { Game } from "./game.js";
import { getXGamesWithoutDetails } from "./game.mocks.js";
import { GamesAggregate } from "./games.aggregate.js";

describe("GamesAggregate", function () {
  describe(".manyFromDbEntries", function () {
    beforeAll(function () {
      this.result = GamesAggregate.manyFromDbEntries(
        getXGamesWithoutDetails(2),
        createLoggerMock(),
      );
    });

    it("the result is an instance of GamesAggregate", function () {
      expect(this.result).toBeInstanceOf(GamesAggregate);
    });

    it("the result's games are instances of Game", function () {
      expect(this.result.games[0]).toBeInstanceOf(Game);
    });
  });

  describe(".checkIfEmpty", function () {
    describe("when the steamApps array is empty", function () {
      beforeAll(function () {
        this.loggerMock = createLoggerMock();

        const gamesArray = GamesAggregate.manyFromDbEntries([], this.loggerMock);

        this.result = gamesArray.checkIfEmpty("");
      });

      it("the returned value is true", function () {
        expect(this.result).toBeTruthy();
      });

      it("the logger was called", function () {
        expect(this.loggerMock.debugc).toHaveBeenCalled();
      });
    });

    describe("when the steamApps array is not empty", function () {
      beforeAll(function () {
        this.loggerMock = createLoggerMock();

        const gamesArray = GamesAggregate.manyFromDbEntries(
          getXGamesWithoutDetails(2),
          this.loggerMock,
        );

        this.result = gamesArray.checkIfEmpty("");
      });

      it("the returned value is false", function () {
        expect(this.result).toBeFalsy();
      });

      it("the logger was not called", function () {
        expect(this.loggerMock.debugc).not.toHaveBeenCalled();
      });
    });
  });
});
