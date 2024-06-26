import { PlayerHistoryAggregator } from "./player.history.aggregator.js";
import { crushTheCastleHtmlDetailsSteamcharts } from "../../../../assets/steamcharts-html-details-pages/crush.the.castle.legacy.collection.html.details.page.js";
import { oneGameWithUncheckedPlayerHistory } from "../../../../assets/db-responses/one.game.unchecked.history.js";
import { twoGamesWithUncheckedPlayerHistory } from "../../../../assets/db-responses/two.games.unchecked.history.js";
import { HistoryCheck } from "../../models/history.check.js";
import { Game } from "../../models/game.js";
import { addPlayerHistoriesFromSteamcharts } from "../../services/player.history.service.js";
import { createLoggerMock } from "../../../common/logger.mock.js";
import { createConfigMock } from "../../../common/config.loader.mock.js";
import { GamesAggregate } from "../../models/games.aggregate.js";

describe("PlayerHistoryAggregator", function () {
  describe(".addPlayerHistoryFromSteamcharts", function () {
    describe("finds the player history for one game in a batch of one and updates the game data", function () {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([crushTheCastleHtmlDetailsSteamcharts]);

        this.gamesRepositoryMock = createGamesRepositoryMock([
          Game.fromDbEntry(oneGameWithUncheckedPlayerHistory),
        ]);
        this.historyChecksRepositoryMock = createHistoryChecksRepositoryMock();
        this.playerHistoryRepositoryMock = createPlayerHistoryRepositoryMock();

        [this.historyChecks, this.games] = createMap([
          [
            Game.fromDbEntry(twoGamesWithUncheckedPlayerHistory[0]),
            crushTheCastleHtmlDetailsSteamcharts,
          ],
        ]);

        this.agg = new PlayerHistoryAggregator(
          this.steamClientMock,
          this.gamesRepositoryMock,
          this.historyChecksRepositoryMock,
          this.playerHistoryRepositoryMock,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.agg.addPlayerHistoryFromSteamcharts();
      });

      it("calls .getXgamesWithUncheckedPlayerHistory once", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .getSteamWebUntriedFilteredSteamApps with the correct batch size", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledWith(1);
      });

      it("calls .getXgamesWithUncheckedPlayerHistory before .getSteamchartsGameHtmlDetailsPage", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamchartsGameHtmlDetailsPage);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage once", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage before .updateHistoryChecks", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledBefore(this.historyChecksRepositoryMock.updateHistoryChecks);
      });

      it("calls .updateHistoryChecks once", function () {
        expect(
          this.historyChecksRepositoryMock.updateHistoryChecks,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .updateHistoryChecks with historyChecks", function () {
        expect(this.historyChecksRepositoryMock.updateHistoryChecks).toHaveBeenCalledWith(
          this.historyChecks,
        );
      });

      it("calls .updateHistoryChecks before .updatePlayerHistoriesById", function () {
        expect(
          this.historyChecksRepositoryMock.updateHistoryChecks,
        ).toHaveBeenCalledBefore(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        );
      });

      it("calls .updatePlayerHistoriesById once", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .updatePlayerHistoriesById with games", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).toHaveBeenCalledWith(this.games);
      });
    });

    describe("finds the player history for one game in a batch of two and updates the game data", () => {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([crushTheCastleHtmlDetailsSteamcharts]);

        this.gamesRepositoryMock = createGamesRepositoryMock(
          new GamesAggregate(twoGamesWithUncheckedPlayerHistory).content,
        );

        this.historyChecksRepositoryMock = createHistoryChecksRepositoryMock();
        this.playerHistoryRepositoryMock = createPlayerHistoryRepositoryMock();

        [this.historyChecks, this.games] = createMap([
          [
            Game.fromDbEntry(twoGamesWithUncheckedPlayerHistory[0]),
            crushTheCastleHtmlDetailsSteamcharts,
          ],
          [Game.fromDbEntry(twoGamesWithUncheckedPlayerHistory[1]), ""],
        ]);

        this.agg = new PlayerHistoryAggregator(
          this.steamClientMock,
          this.gamesRepositoryMock,
          this.historyChecksRepositoryMock,
          this.playerHistoryRepositoryMock,
          createLoggerMock(),
          createConfigMock(2).features,
        );

        await this.agg.addPlayerHistoryFromSteamcharts();
      });

      it("calls .getXgamesWithUncheckedPlayerHistory once", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .getSteamWebUntriedFilteredSteamApps with the correct batch size", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledWith(2);
      });

      it("calls .getXgamesWithUncheckedPlayerHistory before .getSteamchartsGameHtmlDetailsPage", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamchartsGameHtmlDetailsPage);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage twice", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledTimes(2);
      });

      it("calls .getSteamchartsGameHtmlDetailsPage before .updateHistoryChecks", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledBefore(this.historyChecksRepositoryMock.updateHistoryChecks);
      });

      it("calls .updateHistoryChecks once", function () {
        expect(
          this.historyChecksRepositoryMock.updateHistoryChecks,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .updateHistoryChecks with historyChecks", function () {
        expect(this.historyChecksRepositoryMock.updateHistoryChecks).toHaveBeenCalledWith(
          this.historyChecks,
        );
      });

      it("calls .updateHistoryChecks before .updatePlayerHistoriesById", function () {
        expect(
          this.historyChecksRepositoryMock.updateHistoryChecks,
        ).toHaveBeenCalledBefore(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        );
      });

      it("calls .updatePlayerHistoriesById once", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .updatePlayerHistoriesById with games", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).toHaveBeenCalledWith(this.games);
      });
    });

    describe("finds no games in the database and finishes", () => {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([], "");

        this.gamesRepositoryMock = createGamesRepositoryMock([]);
        this.historyChecksRepositoryMock = createHistoryChecksRepositoryMock();
        this.playerHistoryRepositoryMock = createPlayerHistoryRepositoryMock();

        this.agg = new PlayerHistoryAggregator(
          this.steamClientMock,
          this.gamesRepositoryMock,
          this.historyChecksRepositoryMock,
          this.playerHistoryRepositoryMock,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.agg.addPlayerHistoryFromSteamcharts();
      });

      it("calls .getXgamesWithUncheckedPlayerHistory once", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .getSteamWebUntriedFilteredSteamApps with the correct batch size", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledWith(1);
      });

      it(".getXgamesWithUncheckedPlayerHistory has been called with the correct batch size", function () {
        expect(
          this.gamesRepositoryMock.getXgamesWithUncheckedPlayerHistory,
        ).toHaveBeenCalledWith(createConfigMock().features.batchSize);
      });

      it("does not call .getSteamchartsGameHtmlDetailsPage", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).not.toHaveBeenCalled();
      });

      it("does not call .updateHistoryChecks", function () {
        expect(
          this.historyChecksRepositoryMock.updateHistoryChecks,
        ).not.toHaveBeenCalled();
      });

      it("does not call .updatePlayerHistoriesById", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe(".addCurrentPlayers()", () => {
    describe("does not have any games to check for current player numbers", function () {
      beforeAll(async function () {
        this.gamesRepositoryMock = createGamesRepositoryMock("", []);
        this.historyChecksRepositoryMock = createHistoryChecksRepositoryMock();
        this.playerHistoryRepositoryMock = createPlayerHistoryRepositoryMock();

        this.steamClientMock = createSteamMock([], "");

        const agg = new PlayerHistoryAggregator(
          this.steamClientMock,
          this.gamesRepositoryMock,
          this.historyChecksRepositoryMock,
          this.playerHistoryRepositoryMock,
          createLoggerMock(),
          createConfigMock().features,
        );

        await agg.addCurrentPlayers();
      });

      it("calls .getXgamesCheckedMoreThanYmsAgo once", function () {
        expect(
          this.gamesRepositoryMock.getXgamesCheckedMoreThanYmsAgo,
        ).toHaveBeenCalledTimes(1);
      });

      it(".getXgamesCheckedMoreThanYmsAgo has been called with the correct arguments", function () {
        expect(
          this.gamesRepositoryMock.getXgamesCheckedMoreThanYmsAgo,
        ).toHaveBeenCalledWith(
          createConfigMock().features.batchSize,
          createConfigMock().features.currentPlayersUpdateIntervalDelay,
        );
      });

      it("does not call .getAllCurrentPlayersConcurrently ever", function () {
        expect(
          this.steamClientMock.getAllCurrentPlayersConcurrently,
        ).not.toHaveBeenCalled();
      });
      it("does not call .updatePlayerHistoriesById ever", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).not.toHaveBeenCalled();
      });
    });

    describe("gets current players for one game in a batch of one, and adds the players", function () {
      beforeAll(async function () {
        jasmine.clock().mockDate(new Date());

        this.gamesRepositoryMock = createGamesRepositoryMock(
          "",
          new GamesAggregate([oneGameWithUncheckedPlayerHistory]).content,
        );

        this.historyChecksRepositoryMock = createHistoryChecksRepositoryMock();
        this.playerHistoryRepositoryMock = createPlayerHistoryRepositoryMock();

        this.steamClientMock = createSteamMock([], [285]);

        this.gamesWithCurrentPlayers = [
          Game.fromDbEntry(oneGameWithUncheckedPlayerHistory),
        ];

        this.gamesWithCurrentPlayers[0].pushCurrentPlayers(285);

        const agg = new PlayerHistoryAggregator(
          this.steamClientMock,
          this.gamesRepositoryMock,
          this.historyChecksRepositoryMock,
          this.playerHistoryRepositoryMock,
          createLoggerMock(),
          createConfigMock().features,
        );

        await agg.addCurrentPlayers();
      });

      afterAll(function () {
        jasmine.clock().uninstall();
      });

      it("calls .getXgamesCheckedMoreThanYmsAgo once", function () {
        expect(
          this.gamesRepositoryMock.getXgamesCheckedMoreThanYmsAgo,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .getXgamesCheckedMoreThanYmsAgo with the correct arguments", function () {
        expect(
          this.gamesRepositoryMock.getXgamesCheckedMoreThanYmsAgo,
        ).toHaveBeenCalledWith(
          createConfigMock().features.batchSize,
          createConfigMock().features.currentPlayersUpdateIntervalDelay,
        );
      });

      it("calls .getXgamesCheckedMoreThanYmsAgo before .getAllCurrentPlayersConcurrently", function () {
        expect(
          this.gamesRepositoryMock.getXgamesCheckedMoreThanYmsAgo,
        ).toHaveBeenCalledBefore(this.steamClientMock.getAllCurrentPlayersConcurrently);
      });

      it("calls .getAllCurrentPlayersConcurrently once", function () {
        expect(
          this.steamClientMock.getAllCurrentPlayersConcurrently,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .getAllCurrentPlayersConcurrently with this.gamesWithCurrentPlayers", function () {
        expect(
          this.steamClientMock.getAllCurrentPlayersConcurrently,
        ).toHaveBeenCalledWith(this.gamesWithCurrentPlayers);
      });

      it("calls .getAllCurrentPlayersConcurrently  before .updatePlayerHistoriesById", function () {
        expect(
          this.steamClientMock.getAllCurrentPlayersConcurrently,
        ).toHaveBeenCalledBefore(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        );
      });

      it("calls .updatePlayerHistoriesById once", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).toHaveBeenCalledTimes(1);
      });

      it("calls .updatePlayerHistoriesById with gamesWithCurrentPlayers", function () {
        expect(
          this.playerHistoryRepositoryMock.updatePlayerHistoriesById,
        ).toHaveBeenCalledWith(this.gamesWithCurrentPlayers);
      });
    });
  });
});

function createSteamMock(detailsPageRet, currentPlayersRet) {
  const spyObj = jasmine.createSpyObj("steamClient", [
    "getSteamchartsGameHtmlDetailsPage",
    "getAllCurrentPlayersConcurrently",
  ]);
  spyObj.getSteamchartsGameHtmlDetailsPage.and.returnValues(...detailsPageRet);
  spyObj.getAllCurrentPlayersConcurrently.and.returnValue(currentPlayersRet);

  return spyObj;
}

function createGamesRepositoryMock(uncheckedGames, checkedGames) {
  return jasmine.createSpyObj("GamesRepository", {
    getXgamesWithUncheckedPlayerHistory: Promise.resolve(uncheckedGames),
    getXgamesCheckedMoreThanYmsAgo: Promise.resolve(checkedGames),
  });
}

function createHistoryChecksRepositoryMock() {
  return jasmine.createSpyObj("HistoryChecks", {
    updateHistoryChecks: Promise.resolve(undefined),
  });
}

function createPlayerHistoryRepositoryMock() {
  return jasmine.createSpyObj("PlayerHistory", {
    updatePlayerHistoriesById: Promise.resolve(undefined),
    updatePlayerHistoriesById: Promise.resolve(undefined),
  });
}

function createMap(gamesPages) {
  const map = new Map(gamesPages);

  const historyChecks = HistoryCheck.manyFromSteamchartsPages(map);
  const games = addPlayerHistoriesFromSteamcharts(map);

  return [historyChecks, games];
}
