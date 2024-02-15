import { GameIdentifier } from "./game.identifier.js";
import {
  getGames,
  getGamesIds,
  identifySteamAppTypes,
  recordAttemptsViaSource,
  updateGamesMissingDetails,
  updateMissingReleaseDates,
} from "../../services/game.service.js";
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
import { createHtmlDetailsPages } from "../../../../assets/html.details.pages.mock.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { SteamAppsAggregate } from "../../models/steam.apps.aggregate.js";

describe("game.identifier.js", function () {
  describe(".tryIfGameViaSource.", function () {
    describe("via SteamWeb", function () {
      describe("Finds no unidentified steam apps in the database", function () {
        beforeAll(async function () {
          this.source = ValidDataSources.validDataSources.steamWeb;
          this.steamClient = createSteamMock([]);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            [],
            SteamAppsAggregate.manyFromDbEntries([], createLoggerMock()),
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
          );

          await this.identifier.tryIfGameViaSource(this.source);
        });

        it("getSourceUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSourceUntriedFilteredSteamApps was called with the correct arguments", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1, this.source);
        });

        it("getSourceHtmlDetailsPage was not called", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(0);
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
          this.steamApps = getXSampleSteamApps(2);

          this.source = ValidDataSources.validDataSources.steamWeb;

          this.htmlDetailsPages = [
            gta5ageRestrictedHtmlDetailsPage,
            theSims4dlcHtmlDetailsPage,
          ];

          this.updatedSteamApps = identifySteamAppTypes(
            this.steamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.games = getGames(
            this.updatedSteamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.historyChecks = HistoryCheck.manyFromGames(this.games);

          this.steamClient = createSteamMock(this.htmlDetailsPages);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            undefined,
            SteamAppsAggregate.manyFromDbEntries(this.steamApps, createLoggerMock()),
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
          );

          await this.identifier.tryIfGameViaSource(this.source);
        });

        it("getSourceUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSourceUntriedFilteredSteamApps was called with the correct arguments", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1, this.source);
        });

        it("getSourceHtmlDetailsPage was called twice", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(2);
        });

        it("getSourceHtmlDetailsPage was called with the correct arguments", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[0].appid,
            this.source,
          );
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[1].appid,
            this.source,
          );
        });

        it("insertManyGames was not called", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(0);
        });

        it("insertManyHistoryChecks was not called", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledTimes(0);
        });

        it("updateSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("updateSteamAppsById was called with the correct argument", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
            this.updatedSteamApps,
          );
        });
      });

      describe("Finds two unidentified steam apps in the database, one of them being a game", function () {
        beforeAll(async function () {
          this.steamApps = getXSampleSteamApps(2);

          this.source = ValidDataSources.validDataSources.steamWeb;

          this.htmlDetailsPages = [
            mortalDarknessGameHtmlDetailsPage,
            gta5ageRestrictedHtmlDetailsPage,
          ];

          this.updatedSteamApps = identifySteamAppTypes(
            this.steamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.games = getGames(
            this.updatedSteamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.historyChecks = HistoryCheck.manyFromGames(this.games);

          this.steamClient = createSteamMock(this.htmlDetailsPages);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            undefined,
            SteamAppsAggregate.manyFromDbEntries(this.steamApps, createLoggerMock()),
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
          );

          await this.identifier.tryIfGameViaSource(this.source);
        });

        it("getSourceUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSourceUntriedFilteredSteamApps was called with the correct arguments", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1, this.source);
        });

        it("getSourceHtmlDetailsPage was called twice", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(2);
        });

        it("getSourceHtmlDetailsPage was called with the correct arguments", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[0].appid,
            this.source,
          );
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[1].appid,
            this.source,
          );
        });

        it("insertManyGames was called once", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(1);
        });

        it("insertManyGames was called with the correct argument", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledWith(this.games);
        });

        it("insertManyHistoryChecks was called once", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledTimes(1);
        });

        it("insertManyHistoryChecks was called with the correct argument", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledWith(this.historyChecks);
        });

        it("updateSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("updateSteamAppsById was called with the correct argument", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
            this.updatedSteamApps,
          );
        });
      });
    });

    describe("via Steamcharts", function () {
      describe("Finds no unidentified steam apps in the database", function () {
        beforeAll(async function () {
          this.source = ValidDataSources.validDataSources.steamcharts;
          this.steamClient = createSteamMock([]);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            [],
            SteamAppsAggregate.manyFromDbEntries([], createLoggerMock()),
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
          );

          await this.identifier.tryIfGameViaSource(this.source);
        });

        it("getSourceUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSourceUntriedFilteredSteamApps was called with the correct arguments", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1, this.source);
        });

        it("getSourceHtmlDetailsPage was not called", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(0);
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
          this.steamApps = getXSampleSteamApps(2);

          this.source = ValidDataSources.validDataSources.steamcharts;

          this.htmlDetailsPages = ["", ""];

          this.updatedSteamApps = identifySteamAppTypes(
            this.steamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.games = getGames(
            this.updatedSteamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.historyChecks = HistoryCheck.manyFromGames(this.games);

          this.steamClient = createSteamMock(this.htmlDetailsPages);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            undefined,
            SteamAppsAggregate.manyFromDbEntries(this.steamApps, createLoggerMock()),
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
          );

          await this.identifier.tryIfGameViaSource(this.source);
        });

        it("getSourceUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSourceUntriedFilteredSteamApps was called with the correct arguments", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1, this.source);
        });

        it("getSourceHtmlDetailsPage was called twice", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(2);
        });

        it("getSourceHtmlDetailsPage was called with the correct arguments", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[0].appid,
            this.source,
          );
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[1].appid,
            this.source,
          );
        });

        it("insertManyGames was not called", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(0);
        });

        it("insertManyHistoryChecks was not called", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledTimes(0);
        });

        it("updateSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("updateSteamAppsById was called with the correct argument", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
            this.updatedSteamApps,
          );
        });
      });

      describe("Finds two unidentified steam apps in the database, one of them being a game", function () {
        beforeAll(async function () {
          this.steamApps = getXSampleSteamApps(2);

          this.source = ValidDataSources.validDataSources.steamcharts;

          this.htmlDetailsPages = [mortalDarknessGameHtmlDetailsPage, ""];

          this.updatedSteamApps = identifySteamAppTypes(
            this.steamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.games = getGames(
            this.updatedSteamApps,
            this.htmlDetailsPages,
            this.source,
          );

          this.historyChecks = HistoryCheck.manyFromGames(this.games);

          this.steamClient = createSteamMock(this.htmlDetailsPages);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            undefined,
            SteamAppsAggregate.manyFromDbEntries(this.steamApps, createLoggerMock()),
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
          );

          await this.identifier.tryIfGameViaSource(this.source);
        });

        it("getSourceUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSourceUntriedFilteredSteamApps was called with the correct arguments", function () {
          expect(
            this.steamAppsRepository.getSourceUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1, this.source);
        });

        it("getSourceHtmlDetailsPage was called twice", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(2);
        });

        it("getSourceHtmlDetailsPage was called with the correct arguments", function () {
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[0].appid,
            this.source,
          );
          expect(this.steamClient.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
            this.steamApps[1].appid,
            this.source,
          );
        });

        it("insertManyGames was called once", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(1);
        });

        it("insertManyGames was called with the correct argument", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledWith(this.games);
        });

        it("insertManyHistoryChecks was called once", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledTimes(1);
        });

        it("insertManyHistoryChecks was called with the correct argument", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledWith(this.historyChecks);
        });

        it("updateSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("updateSteamAppsById was called with the correct argument", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
            this.updatedSteamApps,
          );
        });
      });
    });
  });

  describe(".updateGamesWithoutDetails.", function () {
    describe("Finds no games with missing properties in the database and stops", function () {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([]);
        this.steamAppsRepository = createSteamAppsRepositoryMock();
        this.gamesRepository = createGamesRepositoryMock([]);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.identifier.updateGamesWithoutDetails();
      });

      it("getGamesWithoutDetails was called once", function () {
        expect(this.gamesRepository.getGamesWithoutDetails).toHaveBeenCalledTimes(1);
      });

      it("getGamesWithoutDetails was called with the correct batch size", function () {
        expect(this.gamesRepository.getGamesWithoutDetails).toHaveBeenCalledWith(1);
      });

      it("getSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("getSourceHtmlDetailsPage was not called", function () {
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(0);
      });

      it("updateSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("updateGameDetails was not called", function () {
        expect(this.gamesRepository.updateGameDetails).toHaveBeenCalledTimes(0);
      });
    });

    describe("Finds two games with missing properties,", function () {
      beforeAll(async function () {
        this.source = ValidDataSources.validDataSources.steamDb;

        const steamApps = getXSampleSteamApps(2);

        const games = getXGamesWithoutDetails(2);

        const pages = [counterStrikeHtmlDetailsSteamDb, riskOfRainHtmlDetailsSteamDb];

        this.htmlDetailsPages = createHtmlDetailsPages(pages);

        this.updatedGames = updateGamesMissingDetails(games, this.htmlDetailsPages);

        this.updatedApps = recordAttemptsViaSource(
          steamApps,
          this.htmlDetailsPages,
          this.source,
        );

        this.steamClientMock = createSteamMock(pages);
        this.steamAppsRepository = createSteamAppsRepositoryMock(steamApps);
        this.gamesRepository = createGamesRepositoryMock(games);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.identifier.updateGamesWithoutDetails();
      });

      it("getGamesWithoutDetails was called once", function () {
        expect(this.gamesRepository.getGamesWithoutDetails).toHaveBeenCalledTimes(1);
      });

      it("getGamesWithoutDetails was called with the correct batch size", function () {
        expect(this.gamesRepository.getGamesWithoutDetails).toHaveBeenCalledWith(1);
      });

      it("getSourceHtmlDetailsPage was called twice", function () {
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(2);
      });

      it("getSourceHtmlDetailsPage was called with the correct arguments", function () {
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
          this.updatedGames[0].id,
          this.source,
        );
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
          this.updatedGames[1].id,
          this.source,
        );
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with the correct argument", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.updatedApps,
        );
      });

      it("updateGameDetails was called once", function () {
        expect(this.gamesRepository.updateGameDetails).toHaveBeenCalledTimes(1);
      });

      it("updateGameDetails was called with the correct argument", function () {
        expect(this.gamesRepository.updateGameDetails).toHaveBeenCalledWith(
          this.updatedGames,
        );
      });
    });
  });

  describe(".updateGamesWithoutReleaseDates.", function () {
    describe("Finds no games with missing release dates", function () {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([]);
        this.steamAppsRepository = createSteamAppsRepositoryMock();
        this.gamesRepository = createGamesRepositoryMock([]);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock(2).features,
        );

        await this.identifier.updateGamesWithoutReleaseDates();
      });

      it("getGamesWithoutReleaseDates was called once", function () {
        expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledTimes(1);
      });

      it("getGamesWithoutReleaseDates was called with the correct batch size", function () {
        expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledWith(2);
      });

      it("getSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("getSourceHtmlDetailsPage was not called", function () {
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(0);
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
        const games = getXGamesWithoutDetails(2);

        const apps = getXSampleSteamApps(2);

        const pages = [counterStrikeHtmlDetailsSteamDb, riskOfRainHtmlDetailsSteamDb];

        const updatedPages = createHtmlDetailsPages(pages);

        this.source = ValidDataSources.validDataSources.steamDb;

        this.updatedApps = recordAttemptsViaSource(apps, updatedPages, this.source);

        this.updatedGames = updateMissingReleaseDates(games, updatedPages);

        this.steamClientMock = createSteamMock([
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ]);
        this.steamAppsRepository = createSteamAppsRepositoryMock(apps);
        this.gamesRepository = createGamesRepositoryMock(games);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock(2).features,
        );

        await this.identifier.updateGamesWithoutReleaseDates();
      });

      it("getGamesWithoutReleaseDates was called once", function () {
        expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledTimes(1);
      });

      it("getGamesWithoutReleaseDates was called with the correct batch size", function () {
        expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledWith(2);
      });

      it("getSteamAppsById was called once", function () {
        expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("getSteamAppsById was called with the correct argument", function () {
        expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledWith(
          getGamesIds(this.updatedGames),
        );
      });

      it("getSourceHtmlDetailsPage was called twice", function () {
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledTimes(2);
      });

      it("getSourceHtmlDetailsPage was called with the correct ids", function () {
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
          this.updatedGames[0].id,
          this.source,
        );
        expect(this.steamClientMock.getSourceHtmlDetailsPage).toHaveBeenCalledWith(
          this.updatedGames[1].id,
          this.source,
        );
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with the correct argument", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.updatedApps,
        );
      });

      it("updateReleaseDates was called once", function () {
        expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledTimes(1);
      });

      it("updateReleaseDates was called with the correct argument", function () {
        expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledWith(
          this.updatedGames,
        );
      });
    });
  });
});

function createSteamMock(args) {
  const spyObj = jasmine.createSpyObj("steamClient", ["getSourceHtmlDetailsPage"]);

  spyObj.getSourceHtmlDetailsPage.and.returnValues(...args);

  return spyObj;
}

function createSteamAppsRepositoryMock(steamAppByIdDbRet, sourceUntriedRet) {
  return jasmine.createSpyObj("SteamAppsRepository", {
    updateSteamAppsById: Promise.resolve(undefined),
    getSteamAppsById: Promise.resolve(steamAppByIdDbRet),
    getSourceUntriedFilteredSteamApps: Promise.resolve(sourceUntriedRet),
  });
}

function createGamesRepositoryMock(gamesRepoRet) {
  return jasmine.createSpyObj("GamesRepository", {
    insertManyGames: Promise.resolve(undefined),
    getGamesWithoutDetails: Promise.resolve(gamesRepoRet),
    updateGameDetails: Promise.resolve(undefined),
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
