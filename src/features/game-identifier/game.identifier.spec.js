import { GameIdentifier } from "./game.identifier.js";

describe("game.identifier.js", function () {
  describe(".tryViaSteamWeb", function () {
    describe("gets zero steamApps from the database and stops. So, ", function () {
      beforeEach(function () {
        this.databaseClientMock = jasmine.createSpyObj("databaseClient", {
          getSteamWebUntriedFilteredSteamApps: Promise.resolve([]),
        });

        this.steamClientMock = jasmine.createSpyObj("steamClient", {
          getSteamAppHtmlDetailsPage: Promise.resolve(undefined),
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

      it("getSteamAppHtmlDetailsPage was not called", function () {
        expect(this.steamClientMock.getSteamAppHtmlDetailsPage).toHaveBeenCalledTimes(0);
      });
    });
  });
});
