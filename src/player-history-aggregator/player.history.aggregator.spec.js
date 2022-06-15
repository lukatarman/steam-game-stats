import { PlayerHistoryAggregator } from "./player.history.aggregator.js";
import { crushTheCastleHtmlDetailsSteamcharts } from "../../assets/steamcharts-details-pages/crush.the.castle.legacy.collection.html.details.page.js";
import { oneGameWithUncheckedPlayerHistory } from "../../assets/db-responses/one.game.unchecked.history.js";
import { HistoryCheck } from "../models/history.check.js";
import { addCurrentPlayersFromSteam, addPlayerHistoriesFromSteamcharts } from "./services/player.history.service.js";
import { twoGamesWithUncheckedPlayerHistory } from "../../assets/db-responses/two.games.unchecked.history.js";

describe("PlayerHistoryAggregator", function() {
  describe(".addPlayerHistoryFromSteamcharts()", function() {
    describe("finds the player history for one game in a batch of one and updates the game data", function() { 
      beforeEach(async function() {
        this.steamClientMock = createSteamMock(crushTheCastleHtmlDetailsSteamcharts);
        this.databaseClientMock = createDatabaseMock(oneGameWithUncheckedPlayerHistory);

        this.gamesPagesMap = new Map();
        this.gamesPagesMap.set(oneGameWithUncheckedPlayerHistory[0], crushTheCastleHtmlDetailsSteamcharts);

        this.historyChecks = HistoryCheck.manyFromSteamchartsPages(this.gamesPagesMap);

        this.games = addPlayerHistoriesFromSteamcharts(this.gamesPagesMap);

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

      it("calls .updateHistoryChecks with historyChecks", function() {
        expect(this.databaseClientMock.updateHistoryChecks).toHaveBeenCalledWith(this.historyChecks);
      });

      it("calls .updateHistoryChecks before .updatePlayerHistoriesById", function() {
        expect(this.databaseClientMock.updateHistoryChecks).toHaveBeenCalledBefore(this.databaseClientMock.updatePlayerHistoriesById);
      });

      it("calls .updatePlayerHistoriesById once", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).toHaveBeenCalledTimes(1);
      });

      it("calls .updatePlayerHistoriesById with games", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).toHaveBeenCalledWith(this.games);
      });
    });

    describe("finds the player history for one game in a batch of two and updates the game data", () => {     
      beforeEach(async function() {
        this.steamClientMock = createSteamMock([crushTheCastleHtmlDetailsSteamcharts, ""], "");

        this.databaseClientMock = createDatabaseMock(twoGamesWithUncheckedPlayerHistory);

        this.gamesPagesMap = new Map();
        this.gamesPagesMap.set(twoGamesWithUncheckedPlayerHistory[0], crushTheCastleHtmlDetailsSteamcharts);
        this.gamesPagesMap.set(twoGamesWithUncheckedPlayerHistory[1], "");

        this.historyChecks = HistoryCheck.manyFromSteamchartsPages(this.gamesPagesMap);

        this.games = addPlayerHistoriesFromSteamcharts(this.gamesPagesMap);

        this.agg = new PlayerHistoryAggregator(
          this.steamClientMock,
          this.databaseClientMock,
          { unitDelay: 0, batchSize: 2 },
        );

        await this.agg.addPlayerHistoryFromSteamcharts();
      });

      it("calls .getXgamesWithUncheckedPlayerHistory once", function() {
        expect(this.databaseClientMock.getXgamesWithUncheckedPlayerHistory).toHaveBeenCalledTimes(1);
      });

      it("calls .getXgamesWithUncheckedPlayerHistory before .getSteamchartsGameHtmlDetailsPage", function() {
        expect(this.databaseClientMock.getXgamesWithUncheckedPlayerHistory).toHaveBeenCalledBefore(this.steamClientMock.getSteamchartsGameHtmlDetailsPage);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage twice", function() {
        expect(this.steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledTimes(2);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage before .updateHistoryChecks", function() {
        expect(this.steamClientMock.getSteamchartsGameHtmlDetailsPage).toHaveBeenCalledBefore(this.databaseClientMock.updateHistoryChecks);
      });

      it("calls .updateHistoryChecks once", function() {
        expect(this.databaseClientMock.updateHistoryChecks).toHaveBeenCalledTimes(1);
      });

      it("calls .updateHistoryChecks with historyChecks", function() {
        expect(this.databaseClientMock.updateHistoryChecks).toHaveBeenCalledWith(this.historyChecks);
      });

      it("calls .updateHistoryChecks before .updatePlayerHistoriesById", function() {
        expect(this.databaseClientMock.updateHistoryChecks).toHaveBeenCalledBefore(this.databaseClientMock.updatePlayerHistoriesById);
      });

      it("calls .updatePlayerHistoriesById once", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).toHaveBeenCalledTimes(1);
      });

      it("calls .updatePlayerHistoriesById with games", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).toHaveBeenCalledWith(this.games);
      });
    });

    describe("finds no games in the database and finishes", () => {
      beforeEach(async function() {
        this.steamClientMock = createSteamMock("");

        this.databaseClientMock = createDatabaseMock([]);

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

      it("does not call .getSteamchartsGameHtmlDetailsPage", function() {
        expect(this.steamClientMock.getSteamchartsGameHtmlDetailsPage).not.toHaveBeenCalled();
      });

      it("does not call .updateHistoryChecks", function() {
        expect(this.databaseClientMock.updateHistoryChecks).not.toHaveBeenCalled();
      });

      it("does not call .updatePlayerHistoriesById", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).not.toHaveBeenCalled();
      });
    });
  });

  describe(".addCurrentPlayers()", () => {
    describe("does not have any games to check for current player numbers", function() {
      beforeEach(async function() {
        this.databaseClientMock = createDatabaseMock("", []);

        this.steamClientMock = createSteamMock([], "");

        const agg = new PlayerHistoryAggregator(
          this.steamClientMock, 
          this.databaseClientMock, 
          { batchSize: 1, currentPlayersUpdateIntervalDelay: 0 },
        );

        await agg.addCurrentPlayers();
      });

      it("calls .getXgamesCheckedMoreThanYmsAgo once", function() {
        expect(this.databaseClientMock.getXgamesCheckedMoreThanYmsAgo).toHaveBeenCalledTimes(1);
      });

      it("does not call .getAllCurrentPlayersConcurrently ever", function() {
        expect(this.steamClientMock.getAllCurrentPlayersConcurrently).not.toHaveBeenCalled();
      });
      it("does not call .updatePlayerHistoriesById ever", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).not.toHaveBeenCalled();
      });
    });

    describe("gets current players for one game in a batch of one, and adds the players", function() {
      beforeEach(async function() {
        this.databaseClientMock = createDatabaseMock("", oneGameWithUncheckedPlayerHistory);

        this.steamClientMock = createSteamMock("", [285]);

        this.gamesWithCurrentPlayers = addCurrentPlayersFromSteam([285], oneGameWithUncheckedPlayerHistory);

        const agg = new PlayerHistoryAggregator(
          this.steamClientMock, 
          this.databaseClientMock, 
          { batchSize: 1, currentPlayersUpdateIntervalDelay: 0 },
        );

       await agg.addCurrentPlayers();
      });

      it("calls .getXgamesCheckedMoreThanYmsAgo once", function() {
        expect(this.databaseClientMock.getXgamesCheckedMoreThanYmsAgo).toHaveBeenCalledTimes(1);
      });

      it("calls .getXgamesCheckedMoreThanYmsAgo  before .getAllCurrentPlayersConcurrently", function() {
        expect(this.databaseClientMock.getXgamesCheckedMoreThanYmsAgo).toHaveBeenCalledBefore(this.steamClientMock.getAllCurrentPlayersConcurrently);
      });

      it("calls .getAllCurrentPlayersConcurrently once", function() {
        expect(this.steamClientMock.getAllCurrentPlayersConcurrently).toHaveBeenCalledTimes(1);
      });

      it("calls .getAllCurrentPlayersConcurrently with oneGameWithUncheckedPlayerHistory", function() {
        expect(this.steamClientMock.getAllCurrentPlayersConcurrently).toHaveBeenCalledWith(oneGameWithUncheckedPlayerHistory);
      });

      it("calls .getAllCurrentPlayersConcurrently  before .updatePlayerHistoriesById", function() {
        expect(this.steamClientMock.getAllCurrentPlayersConcurrently).toHaveBeenCalledBefore(this.databaseClientMock.updatePlayerHistoriesById);
      });

      it("calls .updatePlayerHistoriesById once", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).toHaveBeenCalledTimes(1);
      });

      it("calls .updatePlayerHistoriesById with gamesWithCurrentPlayers", function() {
        expect(this.databaseClientMock.updatePlayerHistoriesById).toHaveBeenCalledWith(this.gamesWithCurrentPlayers);
      });
    });
  });
});

const createSteamMock = function([htmlPage, emptyString], currentPlayers) {
  const spyObj = jasmine.createSpyObj("steamClient", ["getSteamchartsGameHtmlDetailsPage", "getAllCurrentPlayersConcurrently"]);

  emptyString === "" ?
  spyObj.getSteamchartsGameHtmlDetailsPage.and.returnValues(htmlPage, emptyString) :
  spyObj.getSteamchartsGameHtmlDetailsPage.and.returnValue(htmlPage);

  spyObj.getAllCurrentPlayersConcurrently.and.returnValue(currentPlayers);

  return spyObj;
}

const createDatabaseMock = function(uncheckedGames, checkedGames) {
  return jasmine.createSpyObj("DatabaseClient", {
    getXgamesWithUncheckedPlayerHistory: Promise.resolve(uncheckedGames),
    updateHistoryChecks: Promise.resolve(undefined),
    updatePlayerHistoriesById: Promise.resolve(undefined),
    getXgamesCheckedMoreThanYmsAgo: Promise.resolve(checkedGames),
    updatePlayerHistoriesById: Promise.resolve(undefined),
  });
}