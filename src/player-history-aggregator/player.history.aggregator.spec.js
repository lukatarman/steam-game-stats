import { PlayerHistoryAggregator } from "./player.history.aggregator.js";
import { tinyGames } from "../../assets/tiny.data.set.with.id.js"
import { eldenRingHttpDetailsSteamcharts } from "../../assets/http.details.page.steamcharts.data.set.js"

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

    fdescribe("when getxGamesWithoutPlayerHistory returns an array without errors",() => {
      beforeAll(async () => {
        steamClientMock = jasmine.createSpyObj("SteamClient", {
          getSteamchartsGameHtmlDetailsPage: Promise.resolve(eldenRingHttpDetailsSteamcharts),
        });
        databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
          getxGamesWithoutPlayerHistory: Promise.resolve(tinyGames),
          updatePlayerHistoryById: undefined,
        });

        const agg = new PlayerHistoryAggregator(steamClientMock, databaseClientMock, { unitDelay: 30, batchDelay: 500 })

        await agg.run();
      });

      it(".getxGamesWithoutPlayerHistory runs once", () => {
        expect(databaseClientMock.getxGamesWithoutPlayerHistory).toHaveBeenCalledTimes(1);
      });

      it(".getxGamesWithoutPlayerHistory ran before .getSteamchartsGameHtmlDetailsPage", () => {
        expect(databaseClientMock.getxGamesWithoutPlayerHistory).toHaveBeenCalledBefore(steamClientMock.getSteamchartsGameHtmlDetailsPage)
      });

      it(".getSteamchartsGameHtmlDetailsPage runs 29 times", () => {
        expect(steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledTimes(29);
      });
      it(".getSteamchartsGameHtmlDetailsPage has been run with 'tinyGames[0].id' argument", () => {
        expect(steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledWith(tinyGames[0].id)
      });

      it(".getSteamchartsGameHtmlDetailsPage ran before .updatePlayerHistoryById", () => {
        expect(steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledBefore(databaseClientMock.updatePlayerHistoryById);
      });

      it(".updatePlayerHistoryById runs 29 times", () => {
        expect(databaseClientMock.updatePlayerHistoryById).toHaveBeenCalledTimes(29);
      });

    });
  });
});