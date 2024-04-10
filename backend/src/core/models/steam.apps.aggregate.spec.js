import { getParsedHtmlPages } from "../../../assets/html.details.pages.mock.js";
import { feartressGameHtmlDetailsPage } from "../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
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
      this.result = new SteamAppsAggregate(getXSampleSteamApps(2));
    });

    it("the result is an instance of SteamAppsAggregate", function () {
      expect(this.result).toBeInstanceOf(SteamAppsAggregate);
    });

    it("the result's apps are instances of SteamApp", function () {
      expect(this.result.content[0]).toBeInstanceOf(SteamApp);
    });
  });

  describe(".isEmpty", function () {
    describe("when the steamApps array is empty", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate([]);

        this.result = steamAppsArray.isEmpty;
      });

      it("the returned value is true", function () {
        expect(this.result).toBeTruthy();
      });
    });

    describe("when the steamApps array is not empty", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(2));

        this.result = steamAppsArray.isEmpty;
      });

      it("the returned value is false", function () {
        expect(this.result).toBeFalsy();
      });
    });
  });

  describe(".identifyTypes", function () {
    describe("When we try to identify two steam apps", function () {
      beforeAll(function () {
        this.steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(2));

        const source = ValidDataSources.validDataSources.steamWeb;
        const pages = getParsedHtmlPages(["", mortalDarknessGameHtmlDetailsPage]);

        this.steamAppsArray.identifyTypes(pages, source);
      });

      it("the first app is correctly identified", function () {
        expect(this.steamAppsArray.content[0].appid).toBe(1);
        expect(this.steamAppsArray.content[0].triedVia).toEqual(["steamWeb"]);
        expect(this.steamAppsArray.content[0].failedVia).toEqual(["steamWeb"]);
        expect(this.steamAppsArray.content[0].type).toBe("unknown");
      });

      it("the second app is correctly identified", function () {
        expect(this.steamAppsArray.content[1].appid).toBe(2);
        expect(this.steamAppsArray.content[1].triedVia).toEqual(["steamWeb"]);
        expect(this.steamAppsArray.content[1].failedVia).toEqual([]);
        expect(this.steamAppsArray.content[1].type).toBe("game");
      });
    });
  });

  describe(".extractGames", function () {
    describe("when no steam apps are marked as games", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(2));
        const pages = getParsedHtmlPages(["", ""]);

        this.result = steamAppsArray.extractGames(pages);
      });

      it("no games are returned", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("when one out of two steam apps is marked as a game", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(2));
        const source = ValidDataSources.validDataSources.steamWeb;
        const pages = getParsedHtmlPages(["", mortalDarknessGameHtmlDetailsPage]);

        steamAppsArray.identifyTypes(pages, source);

        this.result = steamAppsArray.extractGames(pages);
      });

      it("one game is returned", function () {
        expect(this.result.length).toBe(1);
      });
    });

    describe("when two out of two steam apps are marked as games", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate(
          getXSampleSteamAppsMarkedAsGames(2),
        );
        const pages = getParsedHtmlPages([
          feartressGameHtmlDetailsPage,
          mortalDarknessGameHtmlDetailsPage,
        ]);

        this.result = steamAppsArray.extractGames(pages);
      });

      it("two games are returned", function () {
        expect(this.result.length).toBe(2);
      });
    });
  });
});
