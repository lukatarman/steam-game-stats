import { PlayerHistoryAggregator } from "./player.history.aggregator.js";
import { crushTheCastleHtmlDetailsSteamcharts } from "../../assets/steamcharts-details-pages/crush.the.castle.legacy.collection.html.details.page.js";
import { oneGameWithUncheckedPlayerHistory } from "../../assets/db-responses/one.game.unchecked.history.js";

describe("PlayerHistoryAggregator", function() {
  describe(".addPlayerHistoryFromSteamcharts()", function() {
    fdescribe("finds the player history for one game in a batch of one and updates the game data", function() {
      beforeEach(async function() {
        this.steamClientMock = jasmine.createSpyObj("SteamClient", {
          getSteamchartsGameHtmlDetailsPage: Promise.resolve(crushTheCastleHtmlDetailsSteamcharts),
        });

        this.databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
          getXgamesWithUncheckedPlayerHistory: Promise.resolve(oneGameWithUncheckedPlayerHistory),
          updateHistoryChecks: Promise.resolve(undefined),
          updatePlayerHistoriesById: Promise.resolve(undefined),
        });

        this.agg = new PlayerHistoryAggregator(
          this.steamClientMock,
          this.databaseClientMock,
          { unitDelay: 0, batchSize: 1 },
        );

        await this.agg.addPlayerHistoryFromSteamcharts();
      });

      it("calls .getXgamesWithUncheckedPlayerHistory once", function() {
        expect(this.databaseClientMock.getXgamesWithUncheckedPlayerHistory).toHaveBeenCalledTimes(1);
      });

      it("calls .getXgamesWithUncheckedPlayerHistory before .getSteamchartsGameHtmlDetailsPage", function() {
        expect(this.databaseClientMock.getXgamesWithUncheckedPlayerHistory).toHaveBeenCalledBefore(this.steamClientMock.getSteamchartsGameHtmlDetailsPage);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage once", function() {
        expect(this.steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledTimes(1);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage before .updateHistoryChecks", function() {
        expect(this.steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledBefore(this.databaseClientMock.updateHistoryChecks);
      });

      it("calls .updateHistoryChecks once", function() {
        expect(this.databaseClientMock.updateHistoryChecks).toHaveBeenCalledTimes(1);
      });

      it("calls .updateHistoryChecks before .updatePlayerHistoriesById", function() {
        expect(this.databaseClientMock.updateHistoryChecks).toHaveBeenCalledBefore(this.databaseClientMock.updatePlayerHistoriesById);
      });

      it("calls .updatePlayerHistoriesById once", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).toHaveBeenCalledTimes(1);
      });
    });

    describe("finds the player history for one game in a batch of two and updates the game data", () => {
      it("calls .getXgamesWithUncheckedPlayerHistory once");
      it("calls .getXgamesWithUncheckedPlayerHistory before .getSteamchartsGameHtmlDetailsPage");
      it("calls .getSteamchartsGameHtmlDetailsPage twice");
      it("calls .getSteamchartsGameHtmlDetailsPage before .updateHistoryChecks");
      it("calls .updateHistoryChecks once");
      it("calls .updateHistoryChecks before .updatePlayerHistoriesById");
      it("calls .updatePlayerHistoriesById once");
    });

    /**
     * @TODO add last test case for .addPlayerHistoryFromSteamcharts
     */
  });

  describe(".addCurrentPlayers()", () => {
    describe("does not have any games to check for current player numbers", () => {
      it("calls .getXgamesCheckedMoreThanYmsAgo once");
      it("does not call .getAllCurrentPlayersConcurrently ever");
      it("does not call .updatePlayerHistoriesById ever");
    /**
     * @TODO please add the rest of the specs
     */
    });
    /**
     * @TODO please add a test for the other case
     */
  });
});