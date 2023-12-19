import { GameIdentifier } from "./game.identifier.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";
import { glitchhikersSoundtrackHtmlDetailsPage } from "../../../../assets/steam-details-pages/glitchhikers.soundtrack.html.details.page.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";
import { SteamApp } from "../../models/steam.app.js";
import {
  discoverGamesFromSteamWeb,
  identifyGames,
  recordAttemptsViaSteamDb,
  updateMissingReleaseDates,
  updateTypeSideEffectFree,
} from "../../services/game.service.js";
import { HistoryCheck } from "../../models/history.check.js";
import { createLoggerMock } from "../../../common/logger.mock.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import { getXGamesWithoutDetails } from "../../models/game.mocks.js";
import { createConfigMock } from "../../../common/config.loader.mock.js";
import { getXSampleSteamApps } from "../../models/steam.app.mocks.js";
import { createHtmlDetailsPages } from "../../../../assets/html.details.pages.mock.js";

describe("game.identifier.js", function () {
  describe(".tryIfGameViaSource.", function () {
    fdescribe("via SteamWeb", function () {
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

        it("getSteamDbHtmlDetailsPage was not called", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledTimes(0);
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
          this.steamApps = getXSampleSteamApps(2);

          this.games = getXGamesWithoutDetails(2);

          const pages = [counterStrikeHtmlDetailsSteamDb, riskOfRainHtmlDetailsSteamDb];

          this.htmlDetailsPages = createHtmlDetailsPages(pages);

          this.updatedApps = recordAttemptsViaSteamDb(
            this.steamApps,
            this.htmlDetailsPages,
          );

          this.steamClientMock = createSteamMock(pages);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            undefined,
            undefined,
            this.steamApps,
          );
          this.gamesRepository = createGamesRepositoryMock(this.games);
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

        it("getGamesWithoutDetails was called before getSteamDbHtmlDetailsPage", function () {
          expect(this.gamesRepository.getGamesWithoutDetails).toHaveBeenCalledBefore(
            this.steamClientMock.getSteamDbHtmlDetailsPage,
          );
        });

        it("getSteamDbHtmlDetailsPage was called twice", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledTimes(2);
        });

        it("getSteamDbHtmlDetailsPage was called with the correct ids", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
            this.games[0].id,
          );
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
            this.games[1].id,
          );
        });

        it("getSteamDbHtmlDetailsPage was called before updateSteamAppsById", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledBefore(
            this.steamAppsRepository.updateSteamAppsById,
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

        it("updateSteamAppsById was called before updateSteamAppsById", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledBefore(
            this.gamesRepository.updateGameDetails,
          );
        });

        it("updateGameDetails was called once", function () {
          expect(this.gamesRepository.updateGameDetails).toHaveBeenCalledTimes(1);
        });

        it("updateGameDetails was called with the correct argument", function () {
          expect(this.gamesRepository.updateGameDetails).toHaveBeenCalledWith(this.games);
        });
      });
    });
  });

  describe(".tryViaSteamWeb", function () {
    describe("gets zero steamApps from the database and stops. So,", function () {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([undefined]);

        this.steamAppsRepository = createSteamAppsRepositoryMock([], undefined);
        this.gamesRepository = createGamesRepositoryMock();
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.identifier.tryViaSteamWeb();
      });

      it("getSteamWebUntriedFilteredSteamApps was called once", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called with the correct batch size", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamAppHtmlDetailsPage was not called", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(0);
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

    describe("gets one game out of a batch of one steamApp, and inserts it into the database. So,", function () {
      beforeAll(async function () {
        this.app = getXSampleSteamApps(1);

        this.games = discoverGamesFromSteamWeb(this.app, [
          animaddicts2gameHtmlDetailsPage,
        ]);

        this.historychecks = HistoryCheck.manyFromGames(this.games);

        this.instantiatedApp = SteamApp.manyFromSteamApi(this.app);

        this.updatedSteamApps = updateTypeSideEffectFree(this.instantiatedApp, [
          animaddicts2gameHtmlDetailsPage,
        ]);

        this.steamClientMock = createSteamMock([animaddicts2gameHtmlDetailsPage]);

        this.steamAppsRepository = createSteamAppsRepositoryMock(
          this.instantiatedApp,
          undefined,
        );
        this.gamesRepository = createGamesRepositoryMock();
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.identifier.tryViaSteamWeb();
      });

      it("getSteamWebUntriedFilteredSteamApps was called once", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called with the correct batch size", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called before getSteamAppHtmlDetailsPage", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamAppHtmlDetailsPage);
      });

      it("getSteamAppHtmlDetailsPage was called once", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(1);
      });

      it("getSteamAppHtmlDetailsPage was called with the correct id", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApp[0].appid,
        );
      });

      it("getSteamAppHtmlDetailsPage was called before insertManyGames", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledBefore(
          this.gamesRepository.insertManyGames,
        );
      });

      it("insertManyGames was called once", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(1);
      });

      it("insertManyGames was called with the correct games", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledWith(this.games);
      });

      it("insertManyGames was called before insertManyHistoryChecks", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledBefore(
          this.historyChecksRepository.insertManyHistoryChecks,
        );
      });

      it("insertManyHistoryChecks was called once", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledTimes(1);
      });

      it("insertManyHistoryChecks was called with the correct history checks", function () {
        expect(this.historyChecksRepository.insertManyHistoryChecks).toHaveBeenCalledWith(
          this.historychecks,
        );
      });

      it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledBefore(this.steamAppsRepository.updateSteamAppsById);
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with the correct steam apps", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.updatedSteamApps,
        );
      });
    });

    describe("gets one game out of a batch of two steamApps, and inserts it into the database. So,", function () {
      beforeAll(async function () {
        this.apps = getXSampleSteamApps(2);

        this.htmlDetailsPages = [
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
        ];

        this.games = discoverGamesFromSteamWeb(this.apps, this.htmlDetailsPages);

        this.historychecks = HistoryCheck.manyFromGames(this.games);

        this.instantiatedApps = SteamApp.manyFromSteamApi(this.apps);

        this.updatedSteamApps = updateTypeSideEffectFree(
          this.instantiatedApps,
          this.htmlDetailsPages,
        );

        this.steamClientMock = createSteamMock([
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
        ]);

        this.steamAppsRepository = createSteamAppsRepositoryMock(
          this.instantiatedApps,
          undefined,
        );
        this.gamesRepository = createGamesRepositoryMock();
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.identifier.tryViaSteamWeb();
      });

      it("getSteamWebUntriedFilteredSteamApps was called once", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called with the correct batch size", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called before getSteamAppHtmlDetailsPage", function () {
        expect(
          this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamAppHtmlDetailsPage);
      });

      it("getSteamAppHtmlDetailsPage was called twice", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(2);
      });

      it("getSteamAppHtmlDetailsPage was called with the correct ids", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApps[0].appid,
        );
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApps[1].appid,
        );
      });

      it("getSteamAppHtmlDetailsPage was called before insertManyGames", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledBefore(
          this.gamesRepository.insertManyGames,
        );
      });

      it("insertManyGames was called once", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(1);
      });

      it("insertManyGames was called with the correct games", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledWith(this.games);
      });

      it("insertManyGames was called before insertManyHistoryChecks", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledBefore(
          this.historyChecksRepository.insertManyHistoryChecks,
        );
      });

      it("insertManyHistoryChecks was called once", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledTimes(1);
      });

      it("insertManyHistoryChecks was called the correct history checks", function () {
        expect(this.historyChecksRepository.insertManyHistoryChecks).toHaveBeenCalledWith(
          this.historychecks,
        );
      });

      it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledBefore(this.steamAppsRepository.updateSteamAppsById);
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with the correct steam apps", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.updatedSteamApps,
        );
      });
    });

    describe("gets one game out of a batch of four steamApps.", function () {
      describe("The second and third games' pages experience errors.", function () {
        beforeAll(async function () {
          this.apps = getXSampleSteamApps(4);

          this.htmlDetailsPages = [
            animaddicts2gameHtmlDetailsPage,
            "",
            "",
            glitchhikersSoundtrackHtmlDetailsPage,
          ];

          this.instantiatedApps = SteamApp.manyFromSteamApi(this.apps);

          this.games = discoverGamesFromSteamWeb(
            this.instantiatedApps,
            this.htmlDetailsPages,
          );

          this.historychecks = HistoryCheck.manyFromGames(this.games);

          this.updatedSteamApps = updateTypeSideEffectFree(
            this.instantiatedApps,
            this.htmlDetailsPages,
          );

          this.steamClientMock = createSteamMock(this.htmlDetailsPages);

          this.steamAppsRepository = createSteamAppsRepositoryMock(
            this.instantiatedApps,
            undefined,
          );
          this.gamesRepository = createGamesRepositoryMock();
          this.historyChecksRepository = createHistoryChecksRepositoryMock();

          this.identifier = new GameIdentifier(
            this.steamClientMock,
            this.steamAppsRepository,
            this.gamesRepository,
            this.historyChecksRepository,
            createLoggerMock(),
            createConfigMock().features,
          );

          await this.identifier.tryViaSteamWeb();
        });

        it("getSteamWebUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSteamWebUntriedFilteredSteamApps was called with the correct batch size", function () {
          expect(
            this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1);
        });

        it("getSteamWebUntriedFilteredSteamApps was called before getSteamAppHtmlDetailsPage", function () {
          expect(
            this.steamAppsRepository.getSteamWebUntriedFilteredSteamApps,
          ).toHaveBeenCalledBefore(this.steamClientMock.getSteamAppHtmlDetailsPage);
        });

        it("getSteamAppHtmlDetailsPage was called four times", function () {
          expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(
            4,
          );
        });

        it("getSteamAppHtmlDetailsPage was called with the correct ids", function () {
          expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
            this.instantiatedApps[0].appid,
          );
          expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
            this.instantiatedApps[1].appid,
          );
          expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
            this.instantiatedApps[2].appid,
          );
          expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
            this.instantiatedApps[3].appid,
          );
        });

        it("getSteamAppHtmlDetailsPage was called before insertManyGames", function () {
          expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledBefore(
            this.gamesRepository.insertManyGames,
          );
        });

        it("insertManyGames was called once", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(1);
        });

        it("insertManyGames was called with the correct games", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledWith(this.games);
        });

        it("insertManyGames was called before insertManyHistoryChecks", function () {
          expect(this.gamesRepository.insertManyGames).toHaveBeenCalledBefore(
            this.historyChecksRepository.insertManyHistoryChecks,
          );
        });

        it("insertManyHistoryChecks was called once", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledTimes(1);
        });

        it("insertManyHistoryChecks was called with the correct history checks", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledWith(this.historychecks);
        });

        it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
          expect(
            this.historyChecksRepository.insertManyHistoryChecks,
          ).toHaveBeenCalledBefore(this.steamAppsRepository.updateSteamAppsById);
        });

        it("updateSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("updateSteamAppsById was called with the correct updated steam apps", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
            this.updatedSteamApps,
          );
        });
      });
    });
  });

  describe(".tryViaSteamchartsWeb", function () {
    describe("gets no steam apps from the database", function () {
      beforeAll(async function () {
        this.steamClientMock = createSteamMock([undefined]);

        this.steamAppsRepository = createSteamAppsRepositoryMock(undefined, []);
        this.gamesRepository = createGamesRepositoryMock();
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.identifier.tryViaSteamchartsWeb();
      });

      it("getSteamchartsUntriedFilteredSteamApps was called once", function () {
        expect(
          this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamchartsUntriedFilteredSteamApps was called with the correct batch size", function () {
        expect(
          this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamchartsGameHtmlDetailsPage was not called", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledTimes(0);
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

    describe("gets two steam apps from the database,", function () {
      describe("none of them being games", function () {
        beforeAll(async function () {
          this.apps = getXSampleSteamApps(2);

          const pages = ["", ""];

          this.htmlDetailsPages = createHtmlDetailsPages(pages);

          this.instantiatedMarkedApps = instantiateAndMark(
            this.apps,
            this.htmlDetailsPages,
          );

          this.steamClientMock = createSteamMock(["", ""]);

          this.steamAppsRepository = createSteamAppsRepositoryMock(undefined, this.apps);
          this.gamesRepository = createGamesRepositoryMock();
          this.historyChecksRepository = createHistoryChecksRepositoryMock();

          this.identifier = new GameIdentifier(
            this.steamClientMock,
            this.steamAppsRepository,
            this.gamesRepository,
            this.historyChecksRepository,
            createLoggerMock(),
            createConfigMock().features,
          );

          await this.identifier.tryViaSteamchartsWeb();
        });

        it("getSteamchartsUntriedFilteredSteamApps was called once", function () {
          expect(
            this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
          ).toHaveBeenCalledTimes(1);
        });

        it("getSteamchartsUntriedFilteredSteamApps was called with the correct batch size", function () {
          expect(
            this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
          ).toHaveBeenCalledWith(1);
        });

        it("getSteamchartsUntriedFilteredSteamApps was called before getSteamchartsGameHtmlDetailsPage", function () {
          expect(
            this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
          ).toHaveBeenCalledBefore(
            this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
          );
        });

        it("getSteamchartsGameHtmlDetailsPage was called two times", function () {
          expect(
            this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
          ).toHaveBeenCalledTimes(2);
        });

        it("getSteamchartsGameHtmlDetailsPage was called with the correct ids", function () {
          expect(
            this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
          ).toHaveBeenCalledWith(this.apps[0].appid);
          expect(
            this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
          ).toHaveBeenCalledWith(this.apps[1].appid);
        });

        it("getSteamchartsGameHtmlDetailsPage was called before updateSteamAppsById", function () {
          expect(
            this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
          ).toHaveBeenCalledBefore(this.steamAppsRepository.updateSteamAppsById);
        });

        it("updateSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("updateSteamAppsById was called with the correct steam apps", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
            this.instantiatedMarkedApps,
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
      });
    });

    describe("one of them being a game", function () {
      beforeAll(async function () {
        this.apps = getXSampleSteamApps(2);

        const pages = [eldenRingHttpDetailsSteamcharts, ""];

        this.htmlDetailsPages = createHtmlDetailsPages(pages);

        this.instantiatedMarkedApps = instantiateAndMark(
          this.apps,
          this.htmlDetailsPages,
        );

        this.games = identifyGames(this.instantiatedMarkedApps);

        this.historychecks = HistoryCheck.manyFromGames(this.games);

        this.steamClientMock = createSteamMock([eldenRingHttpDetailsSteamcharts, ""]);

        this.steamAppsRepository = createSteamAppsRepositoryMock(undefined, this.apps);
        this.gamesRepository = createGamesRepositoryMock(this.games);
        this.historyChecksRepository = createHistoryChecksRepositoryMock();

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.steamAppsRepository,
          this.gamesRepository,
          this.historyChecksRepository,
          createLoggerMock(),
          createConfigMock().features,
        );

        await this.identifier.tryViaSteamchartsWeb();
      });

      it("getSteamchartsUntriedFilteredSteamApps was called once", function () {
        expect(
          this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamchartsUntriedFilteredSteamApps was called with the correct batch size", function () {
        expect(
          this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamchartsUntriedFilteredSteamApps was called before getSteamchartsGameHtmlDetailsPage", function () {
        expect(
          this.steamAppsRepository.getSteamchartsUntriedFilteredSteamApps,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamchartsGameHtmlDetailsPage);
      });

      it("getSteamchartsGameHtmlDetailsPage was called two times", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledTimes(2);
      });

      it("getSteamchartsGameHtmlDetailsPage was called with the correct ids", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledWith(this.apps[0].appid);
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledWith(this.apps[1].appid);
      });

      it("getSteamchartsGameHtmlDetailsPage was called before insertManyGames", function () {
        expect(
          this.steamClientMock.getSteamchartsGameHtmlDetailsPage,
        ).toHaveBeenCalledBefore(this.gamesRepository.insertManyGames);
      });

      it("insertManyGames was called once", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledTimes(1);
      });

      it("insertManyGames was called with the correct games", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledWith(this.games);
      });

      it("insertManyGames was called before insertManyHistoryChecks", function () {
        expect(this.gamesRepository.insertManyGames).toHaveBeenCalledBefore(
          this.historyChecksRepository.insertManyHistoryChecks,
        );
      });

      it("insertManyHistoryChecks was called once", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledTimes(1);
      });

      it("insertManyHistoryChecks was called with the correct history checks", function () {
        expect(this.historyChecksRepository.insertManyHistoryChecks).toHaveBeenCalledWith(
          this.historychecks,
        );
      });

      it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
        expect(
          this.historyChecksRepository.insertManyHistoryChecks,
        ).toHaveBeenCalledBefore(this.steamAppsRepository.updateSteamAppsById);
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with the correct steam apps", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledWith(
          this.instantiatedMarkedApps,
        );
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

      it("getSteamDbHtmlDetailsPage was not called", function () {
        expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledTimes(0);
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
        this.steamApps = getXSampleSteamApps(2);

        this.games = getXGamesWithoutDetails(2);

        const pages = [counterStrikeHtmlDetailsSteamDb, riskOfRainHtmlDetailsSteamDb];

        this.htmlDetailsPages = createHtmlDetailsPages(pages);

        this.updatedApps = recordAttemptsViaSteamDb(
          this.steamApps,
          this.htmlDetailsPages,
        );

        this.steamClientMock = createSteamMock(pages);
        this.steamAppsRepository = createSteamAppsRepositoryMock(
          undefined,
          undefined,
          this.steamApps,
        );
        this.gamesRepository = createGamesRepositoryMock(this.games);
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

      it("getGamesWithoutDetails was called before getSteamDbHtmlDetailsPage", function () {
        expect(this.gamesRepository.getGamesWithoutDetails).toHaveBeenCalledBefore(
          this.steamClientMock.getSteamDbHtmlDetailsPage,
        );
      });

      it("getSteamDbHtmlDetailsPage was called twice", function () {
        expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledTimes(2);
      });

      it("getSteamDbHtmlDetailsPage was called with the correct ids", function () {
        expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
          this.games[0].id,
        );
        expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
          this.games[1].id,
        );
      });

      it("getSteamDbHtmlDetailsPage was called before updateSteamAppsById", function () {
        expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledBefore(
          this.steamAppsRepository.updateSteamAppsById,
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

      it("updateSteamAppsById was called before updateSteamAppsById", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledBefore(
          this.gamesRepository.updateGameDetails,
        );
      });

      it("updateGameDetails was called once", function () {
        expect(this.gamesRepository.updateGameDetails).toHaveBeenCalledTimes(1);
      });

      it("updateGameDetails was called with the correct argument", function () {
        expect(this.gamesRepository.updateGameDetails).toHaveBeenCalledWith(this.games);
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

      it("getSteamDbHtmlDetailsPage was not called", function () {
        expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledTimes(0);
      });

      it("updateSteamAppsById was not called", function () {
        expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledTimes(0);
      });

      it("updateReleaseDates was not called", function () {
        expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledTimes(0);
      });
    });

    describe("Finds two games with missing release dates", function () {
      describe("with no empty html pages", function () {
        beforeAll(async function () {
          this.games = getXGamesWithoutDetails(2);

          const apps = getXSampleSteamApps(2);

          const pages = [counterStrikeHtmlDetailsSteamDb, riskOfRainHtmlDetailsSteamDb];

          const updatedPages = createHtmlDetailsPages(pages);

          this.updatedApps = recordAttemptsViaSteamDb(apps, updatedPages);

          this.steamClientMock = createSteamMock([
            counterStrikeHtmlDetailsSteamDb,
            riskOfRainHtmlDetailsSteamDb,
          ]);
          this.steamAppsRepository = createSteamAppsRepositoryMock(
            undefined,
            undefined,
            apps,
          );
          this.gamesRepository = createGamesRepositoryMock(this.games);
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
          expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledTimes(
            1,
          );
        });

        it("getGamesWithoutReleaseDates was called with the correct batch size", function () {
          expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledWith(
            2,
          );
        });

        it("getGamesWithoutReleaseDates was called before getSteamAppsById", function () {
          expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledBefore(
            this.steamAppsRepository.getSteamAppsById,
          );
        });

        it("getSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("getSteamAppsById was called with the correct argument", function () {
          expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledWith(
            this.games.map((game) => game.id),
          );
        });

        it("getSteamAppsById was called before getSteamDbHtmlDetailsPage", function () {
          expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledBefore(
            this.steamClientMock.getSteamDbHtmlDetailsPage,
          );
        });

        it("getSteamDbHtmlDetailsPage was called twice", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledTimes(2);
        });

        it("getSteamDbHtmlDetailsPage was called with the correct ids", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
            this.games[0].id,
          );
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
            this.games[1].id,
          );
        });

        it("getSteamDbHtmlDetailsPage was called before updateSteamAppsById", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledBefore(
            this.steamAppsRepository.updateSteamAppsById,
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

        it("updateSteamAppsById was called before updateReleaseDates", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledBefore(
            this.gamesRepository.updateReleaseDates,
          );
        });

        it("updateReleaseDates was called once", function () {
          expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledTimes(1);
        });

        it("updateReleaseDates was called with the correct argument", function () {
          expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledWith(
            this.games,
          );
        });
      });

      describe("with one empty html page", function () {
        beforeAll(async function () {
          const steamApps = getXSampleSteamApps(2);

          this.games = getXGamesWithoutDetails(2);

          const pages = [counterStrikeHtmlDetailsSteamDb, ""];

          this.steamClientMock = createSteamMock(pages);

          const htmlPages = createHtmlDetailsPages(pages);

          this.updatedApps = recordAttemptsViaSteamDb(steamApps, htmlPages);

          updateMissingReleaseDates(this.games, htmlPages);

          this.steamAppsRepository = createSteamAppsRepositoryMock(
            undefined,
            undefined,
            steamApps,
          );
          this.gamesRepository = createGamesRepositoryMock(this.games);
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
          expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledTimes(
            1,
          );
        });

        it("getGamesWithoutReleaseDates was called with the correct batch size", function () {
          expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledWith(
            2,
          );
        });

        it("getGamesWithoutReleaseDates was called before getSteamAppsById", function () {
          expect(this.gamesRepository.getGamesWithoutReleaseDates).toHaveBeenCalledBefore(
            this.steamAppsRepository.getSteamAppsById,
          );
        });

        it("getSteamAppsById was called once", function () {
          expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledTimes(1);
        });

        it("getSteamAppsById was called with the correct argument", function () {
          expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledWith(
            this.games.map((game) => game.id),
          );
        });

        it("getSteamAppsById was called before getSteamDbHtmlDetailsPage", function () {
          expect(this.steamAppsRepository.getSteamAppsById).toHaveBeenCalledBefore(
            this.steamClientMock.getSteamDbHtmlDetailsPage,
          );
        });

        it("getSteamDbHtmlDetailsPage was called twice", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledTimes(2);
        });

        it("getSteamDbHtmlDetailsPage was called with the correct ids", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
            this.games[0].id,
          );
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledWith(
            this.games[1].id,
          );
        });

        it("getSteamDbHtmlDetailsPage was called before updateSteamAppsById", function () {
          expect(this.steamClientMock.getSteamDbHtmlDetailsPage).toHaveBeenCalledBefore(
            this.steamAppsRepository.updateSteamAppsById,
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

        it("updateSteamAppsById was called before updateReleaseDates", function () {
          expect(this.steamAppsRepository.updateSteamAppsById).toHaveBeenCalledBefore(
            this.gamesRepository.updateReleaseDates,
          );
        });

        it("updateReleaseDates was called once", function () {
          expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledTimes(1);
        });

        it("updateReleaseDates was called with the correct argument", function () {
          expect(this.gamesRepository.updateReleaseDates).toHaveBeenCalledWith(
            this.games,
          );
        });
      });
    });
  });
});

function createSteamMock(args) {
  const spyObj = jasmine.createSpyObj("steamClient", [
    "getSteamAppHtmlDetailsPage",
    "getSteamchartsGameHtmlDetailsPage",
    "getSteamDbHtmlDetailsPage",
  ]);

  spyObj.getSteamAppHtmlDetailsPage.and.returnValues(...args);
  spyObj.getSteamchartsGameHtmlDetailsPage.and.returnValues(...args);
  spyObj.getSteamDbHtmlDetailsPage.and.returnValues(...args);

  return spyObj;
}

function createSteamAppsRepositoryMock(
  steamWebDbRet,
  steamchartsWebDbRet,
  steamAppByIdDbRet,
) {
  return jasmine.createSpyObj("SteamAppsRepository", {
    getSteamWebUntriedFilteredSteamApps: Promise.resolve(steamWebDbRet),
    updateSteamAppsById: Promise.resolve(undefined),
    getSteamchartsUntriedFilteredSteamApps: Promise.resolve(steamchartsWebDbRet),
    getSteamAppsById: Promise.resolve(steamAppByIdDbRet),
  });
}

function createGamesRepositoryMock(gamesRepoRet) {
  return jasmine.createSpyObj("GamesRepository", {
    insertManyGames: Promise.resolve(undefined),
    getGamesWithoutDetails: Promise.resolve(gamesRepoRet),
    updateGameDetails: Promise.resolve(undefined),
    getGamesWithoutReleaseDates: Promise.resolve(gamesRepoRet),
    updateReleaseDates: Promise.resolve(undefined),
  });
}

function createHistoryChecksRepositoryMock() {
  return jasmine.createSpyObj("HistoryChecksRepository", {
    insertManyHistoryChecks: Promise.resolve(undefined),
  });
}

function instantiateAndMark(apps, pages) {
  const instantiatedApps = SteamApp.manyFromSteamApi(apps);

  const updatedApps = instantiatedApps.map((app, i) => {
    if (pages[i].page === "") app.failedViaSteamchartsWeb();
    if (pages[i].page) {
      app.type = SteamApp.validTypes.game;
    }
    app.triedViaSteamchartsWeb();

    return app;
  });

  return updatedApps;
}
