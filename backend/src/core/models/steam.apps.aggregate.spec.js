import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { theSims4dlcHtmlDetailsPage } from "../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { createLoggerMock } from "../../common/logger.mock.js";
import { SteamApp } from "./steam.app.js";
import { getXSampleSteamApps } from "./steam.app.mocks.js";
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

  describe(".identifySteamAppTypes", function () {
    describe("when attempting to identify steam app types", function () {
      beforeAll(function () {
        this.result = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2),
          createLoggerMock(),
        );

        const source = ValidDataSources.validDataSources.steamWeb;

        const htmlPages = [mortalDarknessGameHtmlDetailsPage, theSims4dlcHtmlDetailsPage];

        this.result.identifySteamAppTypes(htmlPages, source);
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
});
