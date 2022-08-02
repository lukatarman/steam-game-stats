import { GameIdentifier } from "./game.identifier.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";
import { SteamApp } from "../../models/steam.app.js";

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
    });

    fdescribe("gets one game out of a batch of one steamApp, and inserts it into the database. So,", function () {
      beforeEach(async function () {
        this.app = SteamApp.oneFromSteamApi({ appid: 1, name: "Animaddicts" });

        this.steamClientMock = createSteamMock(animaddicts2gameHtmlDetailsPage);
        this.databaseClientMock = createDbMock([this.app], undefined);

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
          this.app.appid,
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

      it("insertManyHistoryChecks was called once", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledTimes(1);
      });

      it("insertManyHistoryChecks was called before updateSteamAppsById", function () {
        expect(this.databaseClientMock.insertManyHistoryChecks).toHaveBeenCalledBefore(
          this.databaseClientMock.updateSteamAppsById,
        );
      });

      it("updateSteamAppsById was called once", function () {
        expect(this.databaseClientMock.updateSteamAppsById).toHaveBeenCalledTimes(1);
      });
    });
  });
});

function createSteamMock(steamHtmlPageRes) {
  return jasmine.createSpyObj("steamClient", {
    getSteamAppHtmlDetailsPage: Promise.resolve(steamHtmlPageRes),
  });
}

function createDbMock(steamWebRet, steamchartsWebRet) {
  return jasmine.createSpyObj("databaseClient", {
    getSteamWebUntriedFilteredSteamApps: Promise.resolve(steamWebRet),
    insertManyGames: Promise.resolve(undefined),
    insertManyHistoryChecks: Promise.resolve(undefined),
    updateSteamAppsById: Promise.resolve(undefined),
    getSteamchartsUntriedFilteredSteamApps: Promise.resolve(steamchartsWebRet),
  });
}
