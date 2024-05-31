import { GameIdentifier } from "./game.identifier.js";
import { HistoryCheck } from "../../models/history.check.js";
import { createLoggerMock } from "../../../common/logger.mock.js";
import { getXGamesWithoutDetails } from "../../models/game.mocks.js";
import { createConfigMock } from "../../../common/config.loader.mock.js";
import { getXSampleSteamApps } from "../../models/steam.app.mocks.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../../assets/steam-web-html-details-pages/gta.5.age.restricted.html.details.page.js";
import { theSims4dlcHtmlDetailsPage } from "../../../../assets/steam-web-html-details-pages/the.sims.4.dlc.html.details.page.js";
import { getParsedHtmlPages } from "../../../../assets/html.details.pages.mock.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../../assets/steam-web-html-details-pages/mortal.darkness.game.html.details.page.js";
import { SteamAppsAggregate } from "../../models/steam.apps.aggregate.js";
import { GamesAggregate } from "../../models/games.aggregate.js";
import { parseHTML } from "linkedom";
import { eldenRingSteamApiData } from "../../../../assets/steam-api-responses/elden.ring.js";
import { padakVideoSteamApiData } from "../../../../assets/steam-api-responses/padak.video.js";
import { riskOfRainTwoDlcSteamApiData } from "../../../../assets/steam-api-responses/risk.of.rain.2.dlc.js";
import { counterStrikeSteamApiData } from "../../../../assets/steam-api-responses/counter.strike.js";
import { getRawSteamApiApp } from "../../models/steam.app.raw.mock.js";

describe("game.identifier.js", function () {
  describe(".checkIfGameViaSteamWeb.", function () {
    describe("Finds no unidentified steam apps in the database", function () {
      beforeAll(async function () {
        this.steamClient = createSteamMock([]);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          [],
          SteamAppsAggregate.manyFromDbEntries([]),
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
        this.steamApps = SteamAppsAggregate.manyFromDbEntries(getXSampleSteamApps(2));

        const htmlDetailsPages = [
          gta5ageRestrictedHtmlDetailsPage,
          theSims4dlcHtmlDetailsPage,
        ];

        const parsedHtmlPages = getParsedHtmlPages(htmlDetailsPages);

        this.steamApps.identifyTypesViaSteamWeb(parsedHtmlPages);

        this.games = this.steamApps.extractGamesViaSteamWeb(parsedHtmlPages);

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
        this.steamApps = SteamAppsAggregate.manyFromDbEntries(getXSampleSteamApps(2));

        const htmlDetailsPages = [
          mortalDarknessGameHtmlDetailsPage,
          gta5ageRestrictedHtmlDetailsPage,
        ];

        const parsedHtmlPages = getParsedHtmlPages(htmlDetailsPages);

        this.steamApps.identifyTypesViaSteamWeb(parsedHtmlPages);

        this.games = this.steamApps.extractGamesViaSteamWeb(parsedHtmlPages);

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

  describe(".checkIfGameViaSteamApi.", function () {
    describe("Finds no unidentified steam apps in the database", function () {
      beforeAll(async function () {
        this.steamClient = createSteamMock([]);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          [],
          [],
          SteamAppsAggregate.manyFromDbEntries([]),
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

        await this.identifier.checkIfGameViaSteamApi();
      });

      it("getSteamAppViaSteamApi was not called", function () {
        expect(this.steamClient.getSteamAppViaSteamApi).toHaveBeenCalledTimes(0);
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
        const gameIds = [468060, 1607890];

        this.steamApps = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2, gameIds),
        );

        const steamApiApps = [padakVideoSteamApiData, riskOfRainTwoDlcSteamApiData];

        this.steamApps.identifyTypesViaSteamApi(steamApiApps);

        this.games = this.steamApps.extractGamesViaSteamApi(steamApiApps);

        this.historyChecks = HistoryCheck.manyFromGames(this.games);

        this.steamClient = createSteamMock(steamApiApps);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          undefined,
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

        await this.identifier.checkIfGameViaSteamApi();
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
        const gameIds = [1245620, 468060];

        this.steamApps = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2, gameIds),
        );

        const steamApiApps = [
          getRawSteamApiApp(eldenRingSteamApiData),
          getRawSteamApiApp(padakVideoSteamApiData),
        ];

        this.steamApps.identifyTypesViaSteamApi(steamApiApps);

        this.games = this.steamApps.extractGamesViaSteamApi(steamApiApps);

        this.historyChecks = HistoryCheck.manyFromGames(this.games);

        this.steamClient = createSteamMock(steamApiApps);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          undefined,
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

        await this.identifier.checkIfGameViaSteamApi();
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
        const appIds = [1245620, 730];

        this.games = new GamesAggregate(getXGamesWithoutDetails(2, appIds));

        this.steamApps = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2, appIds),
        );

        const steamApiApps = [
          getRawSteamApiApp(eldenRingSteamApiData),
          getRawSteamApiApp(counterStrikeSteamApiData),
        ];

        this.steamApps.recordAttemptsViaSteamApi(steamApiApps);

        this.games.extractReleaseDatesViaSteamApi(steamApiApps);

        this.steamClientMock = createSteamMock(steamApiApps);
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
    "getSteamWebHtmlDetailsPage",
    "getSteamAppViaSteamApi",
  ]);

  spyObj.getSteamWebHtmlDetailsPage.and.returnValues(...args);
  spyObj.getSteamAppViaSteamApi.and.returnValues(...args);

  return spyObj;
}

function createSteamAppsRepositoryMock(
  steamAppByIdDbRet,
  steamWebUntriedRet,
  steamApiUntriedRet,
) {
  return jasmine.createSpyObj("SteamAppsRepository", {
    updateSteamAppsById: Promise.resolve(undefined),
    getSteamAppsById: Promise.resolve(steamAppByIdDbRet),
    getSteamWebUntriedFilteredSteamApps: Promise.resolve(steamWebUntriedRet),
    getSteamApiUntriedFilteredSteamApps: Promise.resolve(steamApiUntriedRet),
  });
}

function createGamesRepositoryMock(gamesRepoRet) {
  return jasmine.createSpyObj("GamesRepository", {
    insertManyGames: Promise.resolve(undefined),
    getGamesWithoutDetails: Promise.resolve(gamesRepoRet),
    updateGameDetailsFrom: Promise.resolve(undefined),
    getXUnreleasedGames: Promise.resolve(gamesRepoRet),
    updateReleaseDates: Promise.resolve(undefined),
  });
}

function createHistoryChecksRepositoryMock() {
  return jasmine.createSpyObj("HistoryChecksRepository", {
    insertManyHistoryChecks: Promise.resolve(undefined),
  });
}
