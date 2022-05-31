import { PlayerHistoryAggregator } from "./player.history.aggregator.js";

describe("PlayerHistoryAggregator", () => {
  describe("run", () => {
    let steamClientMock;
    let databaseClientMock;

    describe("getxGamesWithoutPlayerHistory returns an empty array and the function finishes",() => {
      beforeAll(() => {
        steamClientMock = jasmine.createSpyObj("SteamClient", {
          getSteamchartsGameHtmlDetailsPage: Promise.resolve(undefined),
        });
        databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
          getxGamesWithoutPlayerHistory: Promise.resolve([]),
          updatePlayerHistoryById: undefined,
        });

        const agg = new PlayerHistoryAggregator(steamClientMock, databaseClientMock, { batchDelay: 500 })

        agg.run();
      });

      it(".getxGamesWithoutPlayerHistory runs once", () => {
        expect(databaseClientMock.getxGamesWithoutPlayerHistory).toHaveBeenCalledTimes(1);
      });

      it(".updatePlayerHistoryById does not run", () => {
        expect(databaseClientMock.updatePlayerHistoryById).toHaveBeenCalledTimes(0);
      });

      it(".getSteamchartsGameHtmlDetailsPage does not run", () => {
        expect(steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledTimes(0);
      });
    });
  });
});