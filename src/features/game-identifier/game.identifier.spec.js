import { GameIdentifier } from "./game.identifier.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";
import { glitchhikersSoundtrackHtmlDetailsPage } from "../../../assets/steam-details-pages/glitchhikers.soundtrack.html.details.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { SteamApp } from "../../models/steam.app.js";
import {
  discoverGamesFromSteamWeb,
  updateIdentificationStatusSideEffectFree,
} from "./services/game.service.js";
import { HistoryCheck } from "../../models/history.check.js";

describe("game.identifier.js", function () {
  describe(".tryViaSteamWeb", function () {
    describe("gets zero steamApps from the database and stops. So, ", function () {
      beforeEach(function () {
        this.databaseClientMock = createDbMock([], undefined);
        this.steamClientMock = createSteamMock(undefined);

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.databaseClientMock,
          {
            batchSize: 1,
          },
        );

        this.identifier.tryViaSteamWeb();
      });

      it("getSteamWebUntriedFilteredSteamApps was called once", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamAppHtmlDetailsPage was not called", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(0);
      });

      it("insertManyGames was not called", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledTimes(0);
      });

      it("insertManyHistoryChecks was not called", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledTimes(0);
      });

      it("updateSteamAppsById was not called", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledTimes(0);
      });
    });

    describe("gets one game out of a batch of one steamApp, and inserts it into the database. So,", function () {
      beforeEach(async function () {
        this.app = [{ appid: 1, name: "Animaddicts" }];

        this.games = discoverGamesFromSteamWeb(this.app, [
          animaddicts2gameHtmlDetailsPage,
        ]);

        this.historychecks = HistoryCheck.manyFromGames(this.games);

        this.instantiatedApp = SteamApp.manyFromSteamApi(this.app);

        this.updatedSteamApps = updateIdentificationStatusSideEffectFree(
          this.instantiatedApp,
          [animaddicts2gameHtmlDetailsPage],
        );

        this.steamClientMock = createSteamMock(animaddicts2gameHtmlDetailsPage);
        this.databaseClientMock = createDbMock(this.instantiatedApp, undefined);

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.databaseClientMock,
          {
            batchSize: 1,
            unitDelay: 0,
          },
        );

        await this.identifier.tryViaSteamWeb();
      });

      it("getSteamWebUntriedFilteredSteamApps was called once", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called before getSteamAppHtmlDetailsPage", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamAppHtmlDetailsPage);
      });

      it("getSteamWebUntriedFilteredSteamApps was called with 'this.#options.batchSize'", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamAppHtmlDetailsPage was called once", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(1);
      });

      it("getSteamAppHtmlDetailsPage was called with", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApp[0].appid,
        );
      });

      it("insertManyGames was called once", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledTimes(1);
      });

      it("insertManyGames was called before insertManyHistoryChecks", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledBefore(
          this.databaseClientMock.insertManyHistoryChecks,
        );
      });

      it("insertManyGames was called with this.games", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledWith(this.games);
      });

      it("insertManyHistoryChecks was called once", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledTimes(1);
      });

      it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledBefore(
          this.databaseClientMock.updateSteamAppsById,
        );
      });

      it("insertManyHistoryChecks was called with this.historychecks", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledWith(
          this.historychecks,
        );
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with this.updatedSteamApps", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledWith(
          this.updatedSteamApps,
        );
      });
    });

    describe("gets one game out of a batch of two steamApps, and inserts it into the database. So,", function () {
      beforeEach(async function () {
        this.apps = [
          { appid: 1, name: "Animaddicts" },
          { appid: 2, name: "Glitchhikers Soundtrack" },
        ];

        this.htmlDetailsPages = [
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
        ];

        this.games = discoverGamesFromSteamWeb(this.apps, this.htmlDetailsPages);

        this.historychecks = HistoryCheck.manyFromGames(this.games);

        this.instantiatedApps = SteamApp.manyFromSteamApi(this.apps);

        this.updatedSteamApps = updateIdentificationStatusSideEffectFree(
          this.instantiatedApps,
          this.htmlDetailsPages,
        );

        this.steamClientMock = createSteamMock(
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
        );
        this.databaseClientMock = createDbMock(this.instantiatedApps, undefined);

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.databaseClientMock,
          {
            batchSize: 1,
            unitDelay: 0,
          },
        );

        await this.identifier.tryViaSteamWeb();
      });

      it("getSteamWebUntriedFilteredSteamApps was called once", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called before getSteamAppHtmlDetailsPage", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamAppHtmlDetailsPage);
      });

      it("getSteamWebUntriedFilteredSteamApps was called with 'this.#options.batchSize'", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamAppHtmlDetailsPage was called twice", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(2);
      });

      it("getSteamAppHtmlDetailsPage was called with each instantiated id", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApps[0].appid,
        );
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApps[1].appid,
        );
      });

      it("insertManyGames was called once", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledTimes(1);
      });

      it("insertManyGames was called before insertManyHistoryChecks", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledBefore(
          this.databaseClientMock.insertManyHistoryChecks,
        );
      });

      it("insertManyGames was called with this.games", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledWith(this.games);
      });

      it("insertManyHistoryChecks was called once", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledTimes(1);
      });

      it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledBefore(
          this.databaseClientMock.updateSteamAppsById,
        );
      });

      it("insertManyHistoryChecks was called with this.historychecks", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledWith(
          this.historychecks,
        );
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with this.updatedSteamApps", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledWith(
          this.updatedSteamApps,
        );
      });
    });

    describe("gets two games out of a batch of three steamApps, and inserts them into the database. So,", function () {
      beforeEach(async function () {
        this.apps = [
          { appid: 1, name: "Animaddicts" },
          { appid: 2, name: "Glitchhikers Soundtrack" },
          { appid: 3, name: "Mortal Darkness" },
        ];

        this.htmlDetailsPages = [
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
          mortalDarknessGameHtmlDetailsPage,
        ];

        this.instantiatedApps = SteamApp.manyFromSteamApi(this.apps);

        this.games = discoverGamesFromSteamWeb(
          this.instantiatedApps,
          this.htmlDetailsPages,
        );

        this.historychecks = HistoryCheck.manyFromGames(this.games);

        this.updatedSteamApps = updateIdentificationStatusSideEffectFree(
          this.instantiatedApps,
          this.htmlDetailsPages,
        );

        this.steamClientMock = createSteamMock(
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
          mortalDarknessGameHtmlDetailsPage,
        );
        this.databaseClientMock = createDbMock(this.instantiatedApps, undefined);

        this.identifier = new GameIdentifier(
          this.steamClientMock,
          this.databaseClientMock,
          {
            batchSize: 1,
            unitDelay: 0,
          },
        );

        await this.identifier.tryViaSteamWeb();
      });

      it("getSteamWebUntriedFilteredSteamApps was called once", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledTimes(1);
      });

      it("getSteamWebUntriedFilteredSteamApps was called before getSteamAppHtmlDetailsPage", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledBefore(this.steamClientMock.getSteamAppHtmlDetailsPage);
      });

      it("getSteamWebUntriedFilteredSteamApps was called with '1'", function () {
        expect(
          this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
        ).toHaveBeenCalledWith(1);
      });

      it("getSteamAppHtmlDetailsPage was called three times", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(3);
      });

      it("getSteamAppHtmlDetailsPage was called with each instantiated appid", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApps[0].appid,
        );
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApps[1].appid,
        );
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledWith(
          this.instantiatedApps[2].appid,
        );
      });

      it("insertManyGames was called once", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledTimes(1);
      });

      it("insertManyGames was called before insertManyHistoryChecks", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledBefore(
          this.databaseClientMock.insertManyHistoryChecks,
        );
      });

      it("insertManyGames was called with this.games", function () {
        expect(this.databaseClientMock.insertManyGames).toHaveBeenCalledWith(this.games);
      });

      it("insertManyHistoryChecks was called once", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledTimes(1);
      });

      it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledBefore(
          this.databaseClientMock.updateSteamAppsById,
        );
      });

      it("insertManyHistoryChecks was called with this.historychecks", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledWith(
          this.historychecks,
        );
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });

      it("updateSteamAppsById was called with this.updatedSteamApps", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledWith(
          this.updatedSteamApps,
        );
      });
    });
  });
});

function createSteamMock(...args) {
  const spyObj = jasmine.createSpyObj("steamClient", ["getSteamAppHtmlDetailsPage"]);

  spyObj.getSteamAppHtmlDetailsPage.and.returnValues(...args);

  return spyObj;
}

function createDbMock(steamWebDbRet, steamchartsWebDbRet) {
  return jasmine.createSpyObj("databaseClient", {
    getSteamWebUntriedFilteredSteamApps: Promise.resolve(steamWebDbRet),
    insertManyGames: Promise.resolve(undefined),
    insertManyHistoryChecks: Promise.resolve(undefined),
    updateSteamAppsById: Promise.resolve(undefined),
    getSteamchartsUntriedFilteredSteamApps: Promise.resolve(steamchartsWebDbRet),
  });
}
