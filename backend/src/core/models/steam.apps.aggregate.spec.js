import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { theSims4dlcHtmlDetailsPage } from "../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { createLoggerMock } from "../../common/logger.mock.js";
import { SteamApp } from "./steam.app.js";
import {
  getXSampleSteamApps,
  getXSampleSteamAppsMarkedAsGames,
} from "./steam.app.mocks.js";
import { SteamAppsAggregate } from "./steam.apps.aggregate.js";
import { ValidDataSources } from "./valid.data.sources.js";

describe("SteamAppsAggregate", function () {
  describe(".manyFromDbEntries", function () {
    beforeAll(function () {
      this.result = SteamAppsAggregate.manyFromDbEntries(
        getXSampleSteamApps(2),
        createLoggerMock(),
      );
    });

    it("the result is an instance of SteamAppsAggregate", function () {
      expect(this.result).toBeInstanceOf(SteamAppsAggregate);
    });

    it("the result's apps are instances of SteamApp", function () {
      expect(this.result.apps[0]).toBeInstanceOf(SteamApp);
    });
  });

  describe(".checkIfEmpty", function () {
    describe("when the steamApps array is empty", function () {
      beforeAll(function () {
        this.loggerMock = createLoggerMock();

        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries([], this.loggerMock);

        this.result = steamAppsArray.checkIfEmpty("");
      });

      it("the returned value is true", function () {
        expect(this.result).toBeTruthy();
      });

      it("the logger was called", function () {
        expect(this.loggerMock.debugc).toHaveBeenCalled();
      });
    });

    describe("when the steamApps array is not empty", function () {
      beforeAll(function () {
        this.loggerMock = createLoggerMock();

        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2),
          this.loggerMock,
        );

        this.result = steamAppsArray.checkIfEmpty("");
      });

      it("the returned value is false", function () {
        expect(this.result).toBeFalsy();
      });

      it("the logger was not called", function () {
        expect(this.loggerMock.debugc).not.toHaveBeenCalled();
      });
    });
  });

  describe(".identifyTypes", function () {
    describe("when attempting to identify steam app types", function () {
      beforeAll(function () {
        this.result = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2),
          createLoggerMock(),
        );

        const source = ValidDataSources.validDataSources.steamWeb;

        const htmlPages = [mortalDarknessGameHtmlDetailsPage, theSims4dlcHtmlDetailsPage];

        this.result.identifyTypes(htmlPages, source);
      });

      it("the first steam app has the correct values", function () {
        expect(this.result.apps[0].type).toBe(SteamApp.validTypes.game);
        expect(this.result.apps[0].triedVia).toEqual([
          ValidDataSources.validDataSources.steamWeb,
        ]);
      });

      it("the second steam app has the correct values", function () {
        expect(this.result.apps[1].type).toBe(SteamApp.validTypes.downloadableContent);
        expect(this.result.apps[1].triedVia).toEqual([
          ValidDataSources.validDataSources.steamWeb,
        ]);
      });
    });
  });

  describe(".getGames", function () {
    describe("when no steam apps are marked as games", function () {
      beforeAll(function () {
        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2),
          createLoggerMock(),
        );

        this.result = steamAppsArray.getGames(["", ""]);
      });

      it("no games are returned", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("when one out of two steam apps is marked as a game", function () {
      beforeAll(function () {
        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries(
          [getXSampleSteamApps(1)[0], getXSampleSteamAppsMarkedAsGames(1)[0]],
          createLoggerMock(),
        );

        this.result = steamAppsArray.getGames(["", ""]);
      });

      it("one game is returned", function () {
        expect(this.result.length).toBe(1);
      });
    });

    describe("when two out of two steam apps are marked as games", function () {
      beforeAll(function () {
        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamAppsMarkedAsGames(2),
          createLoggerMock(),
        );

        this.result = steamAppsArray.getGames(["", ""]);
      });

      it("two games are returned", function () {
        expect(this.result.length).toBe(2);
      });
    });
  });
});
