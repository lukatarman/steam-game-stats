import { GameIdentifier } from "./game.identifier.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";

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

    xdescribe("gets one game out of a batch of one steamApp, and inserts it into the database. So,", function () {
      beforeEach(function () {
        this.steamClientMock = createSteamMock("bebo");
        this.databaseClientMock = createDbMock([{ appid: 1, name: "Animaddicts" }]);

        this.testClientMock = jasmine.createSpyObj("steamClientx", {
          myTest: Promise.resolve("Blabla"),
        });

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

      // it("getSteamWebUntriedFilteredSteamApps was called before getSteamAppHtmlDetailsPage", function () {
      //   expect(
      //     this.databaseClientMock.getSteamWebUntriedFilteredSteamApps,
      //   ).toHaveBeenCalledBefore(this.steamClientMock.getSteamAppHtmlDetailsPage);
      // });

      it("getSteamAppHtmlDetailsPage was called once", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(1);
      });

      it("getSteamAppHtmlDetailsPage was called once", function () {
        expect(this.testClientMock.myTest).toHaveBeenCalledTimes(1);
      });
    });
  });
});

function createSteamMock(steamHtmlPageRes) {
  return jasmine.createSpyObj("steamClient", ["getSteamAppHtmlDetailsPage"]);
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
