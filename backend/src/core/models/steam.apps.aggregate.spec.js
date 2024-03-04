import { getParsedHtmlPages } from "../../../assets/html.details.pages.mock.js";
import { feartressGameHtmlDetailsPage } from "../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
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

  describe(".checkForGames", function () {
    describe("when no steam apps are marked as games", function () {
      beforeAll(function () {
        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2),
          createLoggerMock(),
        );
        const source = ValidDataSources.validDataSources.steamWeb;

        this.result = steamAppsArray.checkForGames(getParsedHtmlPages(["", ""]), source);
      });

      it("no games are returned", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("when one out of two steam apps is marked as a game", function () {
      beforeAll(function () {
        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2),
          createLoggerMock(),
        );
        const source = ValidDataSources.validDataSources.steamWeb;
        const pages = ["", mortalDarknessGameHtmlDetailsPage];

        this.result = steamAppsArray.checkForGames(getParsedHtmlPages(pages), source);
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
        const source = ValidDataSources.validDataSources.steamWeb;
        const pages = [feartressGameHtmlDetailsPage, mortalDarknessGameHtmlDetailsPage];

        this.result = steamAppsArray.checkForGames(getParsedHtmlPages(pages), source);
      });

      it("two games are returned", function () {
        expect(this.result.length).toBe(2);
      });
    });
  });
});
