import { GameIdentifier } from "./game.identifier.js";
import { HistoryCheck } from "../../models/history.check.js";
import { createLoggerMock } from "../../../common/logger.mock.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import { getXGamesWithoutDetails } from "../../models/game.mocks.js";
import { createConfigMock } from "../../../common/config.loader.mock.js";
import { getXSampleSteamApps } from "../../models/steam.app.mocks.js";
import { ValidDataSources } from "../../models/valid.data.sources.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../../assets/steam-details-pages/gta.5.age.restricted.html.details.page.js";
import { theSims4dlcHtmlDetailsPage } from "../../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { getParsedHtmlPages } from "../../../../assets/html.details.pages.mock.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { SteamAppsAggregate } from "../../models/steam.apps.aggregate.js";
import { GamesAggregate } from "../../models/games.aggregate.js";
import { parseHTML } from "linkedom";

describe("game.identifier.js", function () {
  describe(".checkIfGameViaSteamWeb.", function () {
    describe("Finds no unidentified steam apps in the database", function () {
      beforeAll(async function () {
        this.steamClient = createSteamMock([]);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          [],
          new SteamAppsAggregate([]),
        );
        this.gamesRepository = createGamesRepositoryMock([]);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClient,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
          parseHTML,
        );

        await this.identifier.checkIfGameViaSteamWeb();
      });

      it("getSteamWebHtmlDetailsPage was not called", function () {
        expect(this.steamClient.getSteamWebHtmlDetailsPage).toHaveBeenCalledTimes(0);
      });

      it("insertManyGames was not called", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(0);
      });

      it("insertManyHistoryChecks was not called", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledTimes(0);
      });

      it("updateSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(0);
      });
    });

    describe("Finds two unidentified steam apps in the database, none of them being games", function () {
      beforeAll(async function () {
        this.steamApps = new SteamAppsAggregate(getXSampleSteamApps(2));

        const htmlDetailsPages = [
          gta5ageRestrictedHtmlDetailsPage,
          theSims4dlcHtmlDetailsPage,
        ];

        const parsedHtmlPages = getParsedHtmlPages(htmlDetailsPages);

        this.steamApps.identifyTypesViaSteamWeb(parsedHtmlPages);

        this.games = this.steamApps.extractGames(parsedHtmlPages);

        this.historyChecks = HistoryCheck.manyFromGames(this.games);

        this.steamClient = createSteamMock(htmlDetailsPages);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          undefined,
          this.steamApps,
        );
        this.gamesRepository = createGamesRepositoryMock();
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClient,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
          parseHTML,
        );

        await this.identifier.checkIfGameViaSteamWeb();
      });

      it("insertManyGames was not called", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(0);
      });

      it("insertManyHistoryChecks was not called", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledTimes(0);
      });

      it("updateSteamAppsById was called with the correct argument", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.steamApps.content,
        );
      });
    });

    describe("Finds two unidentified steam apps in the database, one of them being a game", function () {
      beforeAll(async function () {
        this.steamApps = new SteamAppsAggregate(getXSampleSteamApps(2));

        const htmlDetailsPages = [
          mortalDarknessGameHtmlDetailsPage,
          gta5ageRestrictedHtmlDetailsPage,
        ];

        const parsedHtmlPages = getParsedHtmlPages(htmlDetailsPages);

        this.steamApps.identifyTypesViaSteamWeb(parsedHtmlPages);

        this.games = this.steamApps.extractGames(parsedHtmlPages);

        this.historyChecks = HistoryCheck.manyFromGames(this.games);

        this.steamClient = createSteamMock(htmlDetailsPages);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          undefined,
          this.steamApps,
        );
        this.gamesRepository = createGamesRepositoryMock();
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClient,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
          parseHTML,
        );

        await this.identifier.checkIfGameViaSteamWeb();
      });

      it("insertManyGames was called with the correct argument", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledWith(this.games);
      });

      it("insertManyHistoryChecks was called with the correct argument", function () {
        expect(this.historyChecksRepository.insertManyHistoryChecks).toHaveBeenCalledWith(
          this.historyChecks,
        );
      });

      it("updateSteamAppsById was called with the correct argument", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.steamApps.content,
        );
      });
    });
  });

  describe(".updateGamesWithoutDetails.", function () {
    describe("Finds no games with missing properties in the database and stops", function () {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([]);
        this.steamAppsRepository = createSteamAppsRepositoryMock();
        this.gamesRepository = createGamesRepositoryMock(new GamesAggregate([]));
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
          parseHTML,
        );

        await this.identifier.updateGamesWithoutDetails();
      });

      it("getSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("updateSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("updateGameDetailsFrom was not called", function () {
        expect(this.gamesRepository.updateGameDetailsFrom).toHaveBeenCalledTimes(0);
      });
    });

    describe("Finds two games with missing properties,", function () {
      beforeAll(async function () {
        this.source = ValidDataSources.validDataSources.steamDb;

        this.steamApps = new SteamAppsAggregate(getXSampleSteamApps(2));

        this.games = new GamesAggregate(getXGamesWithoutDetails(2));

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ];

        const parsedPages = getParsedHtmlPages(htmlDetailsPages);

        this.games.updateGameDetailsFrom(parsedPages);

        this.steamApps.recordAttemptsViaSource(parsedPages, this.source);

        this.steamClientMock = createSteamMock(htmlDetailsPages);
        this.steamAppsRepository = createSteamAppsRepositoryMock(this.steamApps);
        this.gamesRepository = createGamesRepositoryMock(this.games);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
          parseHTML,
        );

        await this.identifier.updateGamesWithoutDetails();
      });

      it("updateSteamAppsById was called with the correct argument", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.steamApps.content,
        );
      });

      it("updateGameDetailsFrom was called with the correct argument", function () {
        expect(this.gamesRepository.updateGameDetailsFrom).toHaveBeenCalledWith(
          this.games.content,
        );
      });
    });
  });

  describe(".updateGamesWithoutReleaseDates.", function () {
    describe("Finds no games with missing release dates", function () {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([]);
        this.steamAppsRepository = createSteamAppsRepositoryMock();
        this.gamesRepository = createGamesRepositoryMock(new GamesAggregate([]));
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock(2).features,
          parseHTML,
        );

        await this.identifier.updateGamesWithoutReleaseDates();
      });

      it("getSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("updateSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("updateReleaseDates was not called", function () {
        expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledTimes(0);
      });
    });

    describe("Finds two games with missing release dates", function () {
      beforeAll(async function () {
        this.games = new GamesAggregate(getXGamesWithoutDetails(2));

        this.steamApps = new SteamAppsAggregate(getXSampleSteamApps(2));

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ];

        const parsedPages = getParsedHtmlPages(htmlDetailsPages);

        this.source = ValidDataSources.validDataSources.steamDb;

        this.steamApps.recordAttemptsViaSource(parsedPages, this.source);

        this.games.extractReleaseDatesFrom(parsedPages);

        this.steamClientMock = createSteamMock(htmlDetailsPages);
        this.steamAppsRepository = createSteamAppsRepositoryMock(this.steamApps);
        this.gamesRepository = createGamesRepositoryMock(this.games);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock(2).features,
          parseHTML,
        );

        await this.identifier.updateGamesWithoutReleaseDates();
      });

      it("updateSteamAppsById was called with the correct argument", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.steamApps.content,
        );
      });

      it("updateReleaseDates was called with the correct argument", function () {
        expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledWith(
          this.games.content,
        );
      });
    });
  });
});

function createSteamMock(args) {
  const spyObj = jasmine.createSpyObj("steamClient", [
    "getSourceHtmlDetailsPage",
    "getSteamWebHtmlDetailsPage",
  ]);

  spyObj.getSourceHtmlDetailsPage.and.returnValues(...args);
  spyObj.getSteamWebHtmlDetailsPage.and.returnValues(...args);

  return spyObj;
}

function createSteamAppsRepositoryMock(steamAppByIdDbRet, steamWebUntriedRet) {
  return jasmine.createSpyObj("SteamAppsRepository", {
    updateSteamAppsById: Promise.resolve(undefined),
    getSteamAppsById: Promise.resolve(steamAppByIdDbRet),
    getSteamWebUntriedFilteredSteamApps: Promise.resolve(steamWebUntriedRet),
  });
}

function createGamesRepositoryMock(gamesRepoRet) {
  return jasmine.createSpyObj("GamesRepository", {
    insertManyGames: Promise.resolve(undefined),
    getGamesWithoutDetails: Promise.resolve(gamesRepoRet),
    updateGameDetailsFrom: Promise.resolve(undefined),
    getGamesWithoutReleaseDates: Promise.resolve(gamesRepoRet),
    updateReleaseDates: Promise.resolve(undefined),
    getSourceHtmlDetailsPage: Promise.resolve(gamesRepoRet),
  });
}

function createHistoryChecksRepositoryMock() {
  return jasmine.createSpyObj("HistoryChecksRepository", {
    insertManyHistoryChecks: Promise.resolve(undefined),
  });
}
