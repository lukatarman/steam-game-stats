import { getParsedHtmlPages } from "../../../assets/html.details.pages.mock.js";
import { counterStrikeSteamApiData } from "../../../assets/steam-api-responses/counter.strike.js";
import { eldenRingSteamApiData } from "../../../assets/steam-api-responses/elden.ring.js";
import { feartressGameHtmlDetailsPage } from "../../../assets/steam-web-html-details-pages/feartress.game.html.details.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-web-html-details-pages/mortal.darkness.game.html.details.page.js";
import { getXSampleSteamApiApps } from "../../../assets/steam.api.responses.mock.js";
import { Game } from "./game.js";
import { SteamApp } from "./steam.app.js";
import {
  getXSampleSteamApps,
  getXSampleSteamAppsMarkedAsGames,
  getXSampleSteamAppsMarkedAsNotGames,
} from "./steam.app.mocks.js";
import { SteamAppsAggregate } from "./steam.apps.aggregate.js";
import { ValidDataSources } from "./valid.data.sources.js";

describe("SteamAppsAggregate", function () {
  describe(".content", () => {
    describe("if we try to get the content of the class", function () {
      beforeAll(function () {
        const steamApps = getXSampleSteamApps(2);
        const steamAppsAggregate = new SteamAppsAggregate(steamApps);

        this.contentCopy = steamAppsAggregate.content;

        steamApps[0].triedVia.push(ValidDataSources.validDataSources.steamWeb);
        steamApps[1].triedVia.push(ValidDataSources.validDataSources.steamWeb);
      });

      it("the returned games are true deep copies", function () {
        expect(this.contentCopy[0].triedVia).toEqual([]);
        expect(this.contentCopy[1].triedVia).toEqual([]);
      });
    });
  });

  describe(".isEmpty", function () {
    describe("when the aggregate contains no steam apps", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate([]);

        this.result = steamAppsArray.isEmpty;
      });

      it("the emptyness check returns true", function () {
        expect(this.result).toBeTruthy();
      });
    });

    describe("when the aggregate contains steam apps", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(2));

        this.result = steamAppsArray.isEmpty;
      });

      it("the emptyness check returns false", function () {
        expect(this.result).toBeFalsy();
      });
    });
  });

  describe(".identifyTypesViaSteamWeb", function () {
    describe("When we try to identify two steam apps", function () {
      beforeAll(function () {
        this.steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(2));

        const pages = getParsedHtmlPages(["", mortalDarknessGameHtmlDetailsPage]);

        this.steamAppsArray.identifyTypesViaSteamWeb(pages);
      });

      it("the first app is correctly identified", function () {
        expect(this.steamAppsArray.content[0].appid).toBe(1);
        expect(this.steamAppsArray.content[0].triedVia).toEqual(["steamWeb"]);
        expect(this.steamAppsArray.content[0].failedVia).toEqual(["steamWeb"]);
        expect(this.steamAppsArray.content[0].type).toBe("restricted");
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

        this.result = steamAppsArray.extractGamesFromSteamWeb(pages);
      });

      it("no games are returned", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("when one out of two steam apps is marked as a game", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(2));
        const pages = getParsedHtmlPages(["", mortalDarknessGameHtmlDetailsPage]);

        steamAppsArray.identifyTypesViaSteamWeb(pages);

        this.result = steamAppsArray.extractGamesFromSteamWeb(pages);
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

        this.result = steamAppsArray.extractGamesFromSteamWeb(pages);
      });

      it("two games are returned", function () {
        expect(this.result.length).toBe(2);
        expect(this.result[0]).toBeInstanceOf(Game);
        expect(this.result[1]).toBeInstanceOf(Game);
      });
    });
  });

  describe(".identifyTypesViaSteamApi", function () {
    describe("When we try to identify four steam apps", function () {
      beforeAll(function () {
        this.steamAppsArray = new SteamAppsAggregate(getXSampleSteamApps(4));

        const steamApiApps = getXSampleSteamApiApps(3);

        this.steamAppsArray.identifyTypesViaSteamApi(steamApiApps);
      });

      it("the first app is correctly identified", function () {
        expect(this.steamAppsArray.content[0].appid).toBe(1);
        expect(this.steamAppsArray.content[0].triedVia).toEqual(["steamApi"]);
        expect(this.steamAppsArray.content[0].failedVia).toEqual([]);
        expect(this.steamAppsArray.content[0].type).toBe(SteamApp.validTypes.game);
      });

      it("the second app is correctly identified", function () {
        expect(this.steamAppsArray.content[1].appid).toBe(2);
        expect(this.steamAppsArray.content[1].triedVia).toEqual(["steamApi"]);
        expect(this.steamAppsArray.content[1].failedVia).toEqual([]);
        expect(this.steamAppsArray.content[1].type).toBe(
          SteamApp.validTypes.downloadableContent,
        );
      });

      it("the third app is correctly identified", function () {
        expect(this.steamAppsArray.content[2].appid).toBe(3);
        expect(this.steamAppsArray.content[2].triedVia).toEqual(["steamApi"]);
        expect(this.steamAppsArray.content[2].failedVia).toEqual([]);
        expect(this.steamAppsArray.content[2].type).toBe(SteamApp.validTypes.unknown);
      });

      it("the fourth app is correctly identified", function () {
        expect(this.steamAppsArray.content[3].appid).toBe(4);
        expect(this.steamAppsArray.content[3].triedVia).toEqual(["steamApi"]);
        expect(this.steamAppsArray.content[3].failedVia).toEqual(["steamApi"]);
        expect(this.steamAppsArray.content[3].type).toBe(SteamApp.validTypes.unknown);
      });
    });
  });

  describe(".extractGamesfromSteamApi", function () {
    describe("when no steam apps are marked as games", function () {
      beforeAll(function () {
        const steamAppsArray = new SteamAppsAggregate(
          getXSampleSteamAppsMarkedAsNotGames(2),
        );

        const steamApiApps = [eldenRingSteamApiData, counterStrikeSteamApiData];

        this.result = steamAppsArray.extractGamesfromSteamApi(steamApiApps);
      });

      it("no games are returned", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("when two out of two steam apps are marked as games", function () {
      beforeAll(function () {
        const gameIds = [1245620, 730];

        const steamAppsArray = new SteamAppsAggregate(
          getXSampleSteamAppsMarkedAsGames(2, gameIds),
        );

        const steamApiApps = [eldenRingSteamApiData, counterStrikeSteamApiData];

        this.result = steamAppsArray.extractGamesfromSteamApi(steamApiApps);
      });

      it("two games are returned", function () {
        expect(this.result.length).toBe(2);
        expect(this.result[0]).toBeInstanceOf(Game);
        expect(this.result[1]).toBeInstanceOf(Game);
      });
    });
  });

  describe(".recordAttemptsViaSteamApi", function () {
    describe("when recording attempts via steam api", function () {
      beforeAll(function () {
        this.steamAppsArray = new SteamAppsAggregate(
          getXSampleSteamApps(2, [1245620, 130]),
        );

        const steamApiApps = [eldenRingSteamApiData, ""];

        this.steamAppsArray.recordAttemptsViaSteamApi(steamApiApps);
      });

      it("the first apps attempts are successfully recorded", function () {
        expect(this.steamAppsArray.content[0].triedVia).toEqual(["steamApi"]);
        expect(this.steamAppsArray.content[0].failedVia).toEqual([]);
      });

      it("the second apps attempts are successfully recorded", function () {
        expect(this.steamAppsArray.content[1].triedVia).toEqual(["steamApi"]);
        expect(this.steamAppsArray.content[1].failedVia).toEqual(["steamApi"]);
      });
    });
  });
});
