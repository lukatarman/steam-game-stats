import {
  getReleaseDate,
  getDevelopers,
  getGenres,
  getDescription,
  getSteamDbReleaseDate,
  getSteamDbDevelopers,
  getSteamDbGenres,
  getSteamDbDescription,
  updateMissingReleaseDates,
  getGames,
  getSteamWebAppType,
  recordAttemptsViaSource,
  updateGamesMissingDetails,
  getSteamchartsAppType,
  getGamesIds,
  recordHtmlAttempt,
} from "./game.service.js";
import { feartressGameHtmlDetailsPage } from "../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../assets/steam-details-pages/gta.5.age.restricted.html.details.page.js";
import { padakVideoHtmlDetailsPage } from "../../../assets/steam-details-pages/padak.video.html.details.page.js";
import { theSims4dlcHtmlDetailsPage } from "../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { Game } from "../models/game.js";
import { SteamApp } from "../models/steam.app.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { crusaderKingsDetailsPage } from "../../../assets/steam-details-pages/crusader.kings.multiple.developers.html.details.page.js";
import { riskOfRainHtmlDetailsPageMissingInfo } from "../../../assets/steam-details-pages/risk.of.rain.missing.additional.info.page.js";
import { ValidDataSources } from "../models/valid.data.sources.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import { karmazooHtmlDetailsPageSteamDb } from "../../../assets/steamdb-details-pages/karmazoo.html.details.page.js";
import {
  getXGamesWithoutDetails,
  getXsteamchartsInstantiatedGames,
} from "../models/game.mocks.js";
import { createHtmlDetailsPages } from "../../../assets/html.details.pages.mock.js";
import { getXSampleSteamApps } from "../models/steam.app.mocks.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";

describe("game.service.js", () => {
  describe(".recordHtmlAttempt", () => {
    describe("if an html page is empty", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];
        this.source = ValidDataSources.validDataSources.steamWeb;
        const page = "";

        recordHtmlAttempt(this.app, page, this.source);
      });

      it("the app will be marked as tried via provided source", function () {
        expect(this.app.triedVia).toEqual([this.source]);
      });

      it("the app will be marked as failed via provided source", function () {
        expect(this.app.failedVia).toEqual([this.source]);
      });
    });

    describe("if an html page is not empty", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];
        this.source = ValidDataSources.validDataSources.steamWeb;
        const page = feartressGameHtmlDetailsPage;

        recordHtmlAttempt(this.app, page, this.source);
      });

      it("the app will be marked as tried via provided source", function () {
        expect(this.app.triedVia).toEqual([this.source]);
      });

      it("the app will not be marked as failed via provided source", function () {
        expect(this.app.failedVia).toEqual([]);
      });
    });
  });

  describe(".getSteamWebAppType", function () {
    describe("game is age restricted - there is no .blockbg class on the page", function () {
      beforeAll(async function () {
        this.appType = getSteamWebAppType(gta5ageRestrictedHtmlDetailsPage);
      });

      it("the function returns 'unknown'", function () {
        expect(this.appType).toBe(SteamApp.validTypes.unknown);
      });
    });

    describe("if there is no 'All Software' or 'All Games' in the first breadcrumb child text", function () {
      beforeAll(async function () {
        this.appType = getSteamWebAppType(padakVideoHtmlDetailsPage);
      });

      it("the function returns 'unknown'", function () {
        expect(this.appType).toBe(SteamApp.validTypes.unknown);
      });
    });

    describe("if the text 'Downloadable Content' is in one of the breadcrumbs", function () {
      beforeAll(async function () {
        this.appType = getSteamWebAppType(theSims4dlcHtmlDetailsPage);
      });

      it("the function returns 'downloadableContent'", function () {
        expect(this.appType).toBe(SteamApp.validTypes.downloadableContent);
      });
    });

    describe(".blockbg class is on the page, 'All Software' or 'All Games' is in the first breadcrumb and there is no 'Downloadable Content' text in the breadcrumbs", function () {
      beforeAll(async function () {
        this.appType = getSteamWebAppType(feartressGameHtmlDetailsPage);
      });

      it("the function returns 'game'", function () {
        expect(this.appType).toBe(SteamApp.validTypes.game);
      });
    });
  });

  describe(".getSteamchartsAppType", function () {
    describe("the provided html page is empty", function () {
      beforeAll(async function () {
        this.result = getSteamchartsAppType("");
      });

      it("the result is 'unknown'", function () {
        expect(this.result).toBe(SteamApp.validTypes.unknown);
      });
    });

    describe("the provided html page is not empty", function () {
      beforeAll(async function () {
        this.result = getSteamchartsAppType(eldenRingHttpDetailsSteamcharts);
      });

      it("the result is 'game'", function () {
        expect(this.result).toBe(SteamApp.validTypes.game);
      });
    });
  });

  describe(".getGames", () => {
    describe("gets no games out of 2 steam apps,", function () {
      beforeAll(function () {
        const apps = getXSampleSteamApps(2);
        apps[0].appType = SteamApp.validTypes.unknown;
        apps[1].appType = SteamApp.validTypes.unknown;
        const pages = ["", ""];

        this.result = getGames(apps, pages);
      });

      it("no games is returned", function () {
        expect(this.result.length).toBe(0);
      });
    });

    describe("gets one game out of 2 steam apps,", function () {
      beforeAll(function () {
        const apps = getXSampleSteamApps(2);
        apps[0].appType = SteamApp.validTypes.game;
        apps[1].appType = SteamApp.validTypes.unknown;
        const pages = ["", ""];

        this.result = getGames(apps, pages);
      });

      it("one game is returned", function () {
        expect(this.result.length).toBe(1);
      });

      it("the result is an instance on Game", function () {
        expect(this.result[0]).toBeInstanceOf(Game);
      });

      it("the game has the correct id", function () {
        expect(this.result[0].id).toBe(1);
      });
    });
  });

  describe(".getReleaseDate checks for a release date in the provided HTML page.", function () {
    describe("if the provided HTML page does not include a release date section,", function () {
      beforeAll(function () {
        this.result = getReleaseDate(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty string", function () {
        expect(this.result).toBe("");
      });
    });

    describe("if the provided HTML page includes a release date,", function () {
      beforeAll(function () {
        this.result = getReleaseDate(mortalDarknessGameHtmlDetailsPage);
      });

      it("the result is a date", function () {
        expect(this.result).toBeInstanceOf(Date);
      });
      it("the result is the correct date'", function () {
        expect(this.result.toISOString()).toEqual("2023-08-01T00:00:00.000Z");
      });
    });
  });

  describe(".getDevelopers checks for developers in the provided HTML page.", function () {
    describe("if the provided HTML page does not include any developers,", function () {
      beforeAll(function () {
        this.result = getDevelopers(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("if the provided HTML page includes one developer,", function () {
      beforeAll(function () {
        this.result = getDevelopers(mortalDarknessGameHtmlDetailsPage);
      });

      it("the result is an array with one value", function () {
        expect(this.result.length).toBe(1);
      });

      it("the result is 'Dark Faction Games'", function () {
        expect(this.result[0]).toBe("Dark Faction Games");
      });
    });

    describe("if the provided HTML page includes two developers,", function () {
      beforeAll(function () {
        this.result = getDevelopers(crusaderKingsDetailsPage);
      });

      it("the result is an array with two values", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first result is 'Paradox Development Studio'", function () {
        expect(this.result[0]).toBe("Paradox Development Studio");
      });

      it("the second result is 'Paradox Thalassic'", function () {
        expect(this.result[1]).toBe("Paradox Thalassic");
      });
    });
  });

  describe(".getGenres checks for genres in the provided HTML page.", function () {
    describe("if the provided HTML page does not include any genres,", function () {
      beforeAll(function () {
        this.result = getGenres(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("if the provided HTML page includes genres,", function () {
      beforeAll(function () {
        this.result = getGenres(mortalDarknessGameHtmlDetailsPage);
      });

      it("the resulting array has a length of 4", function () {
        expect(this.result.length).toBe(4);
      });
      it("the first result is 'Action'", function () {
        expect(this.result[0]).toBe("Action");
      });
      it("the fourth result is 'RPG'", function () {
        expect(this.result[3]).toBe("RPG");
      });
    });
  });

  describe(".getDescription checks for a game's description in the provided HTML page.", function () {
    describe("if the provided HTML page does not include a game description,", function () {
      beforeAll(function () {
        this.result = getDescription(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty string", function () {
        expect(this.result).toEqual("");
      });
    });

    describe("if the provided HTML page includes a description,", function () {
      beforeAll(function () {
        this.result = getDescription(mortalDarknessGameHtmlDetailsPage);
      });

      it("the resulting is a specific string", function () {
        expect(this.result).toBe(
          "“One grim dawn and noble I wake, The darkness is rampant, our oath shall break. A noble warrior soon shall rise, and clear the air of the darkened skies.”",
        );
      });
    });
  });

  describe(".getGamesIds", () => {
    describe("if two games are passed in", function () {
      beforeAll(function () {
        const games = getXGamesWithoutDetails(2);

        this.result = getGamesIds(games);
      });

      it("two ids are returned", function () {
        expect(this.result[0]).toBe(1);
        expect(this.result[1]).toBe(2);
      });
    });
  });

  describe(".recordAttemptsViaSource", function () {
    describe("via steamDb", function () {
      describe("if one of the pages is empty", function () {
        beforeAll(function () {
          const source = ValidDataSources.validDataSources.steamDb;

          this.apps = getXSampleSteamApps(2);

          this.pages = createHtmlDetailsPages([counterStrikeHtmlDetailsSteamDb, ""]);

          this.result = recordAttemptsViaSource(this.apps, this.pages, source);

          this.apps[0].appid = 5;
          this.apps[1].appid = 5;
        });

        it("the first app has the correct values", function () {
          expect(this.result[0].triedVia).toEqual([
            ValidDataSources.validDataSources.steamDb,
          ]);
          expect(this.result[0].failedVia).toEqual([]);
        });

        it("the second app has the correct values", function () {
          expect(this.result[1].triedVia).toEqual([
            ValidDataSources.validDataSources.steamDb,
          ]);
          expect(this.result[1].failedVia).toEqual([
            ValidDataSources.validDataSources.steamDb,
          ]);
        });

        it("the resulting apps are copies", function () {
          expect(this.result[0].appid).toBe(1);
          expect(this.result[1].appid).toBe(2);
        });
      });

      describe("if none of the pages are empty", function () {
        beforeAll(function () {
          const source = ValidDataSources.validDataSources.steamDb;
          this.apps = getXSampleSteamApps(2);

          this.pages = createHtmlDetailsPages([
            counterStrikeHtmlDetailsSteamDb,
            karmazooHtmlDetailsPageSteamDb,
          ]);

          this.result = recordAttemptsViaSource(this.apps, this.pages, source);

          this.apps[0].appid = 5;
          this.apps[1].appid = 5;
        });

        it("the first app has the correct values", function () {
          expect(this.result[0].triedVia).toEqual([
            ValidDataSources.validDataSources.steamDb,
          ]);
          expect(this.result[0].failedVia).toEqual([]);
        });

        it("the second app has the correct values", function () {
          expect(this.result[1].triedVia).toEqual([
            ValidDataSources.validDataSources.steamDb,
          ]);
          expect(this.result[1].failedVia).toEqual([]);
        });

        it("the resulting apps are copies", function () {
          expect(this.result[0].appid).toBe(1);
          expect(this.result[1].appid).toBe(2);
        });
      });
    });
  });

  describe(".updateGamesMissingDetails.", function () {
    describe("When we try to update two games with missing details,", function () {
      beforeAll(function () {
        this.games = getXsteamchartsInstantiatedGames(2);

        const htmlDetailsPages = createHtmlDetailsPages([
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ]);

        this.result = updateGamesMissingDetails(this.games, htmlDetailsPages);
      });

      it("two games are returned", function () {
        expect(this.games.length).toBe(2);
      });

      it("the first game's details are updated", function () {
        expect(this.result[0].developers).toEqual(["Valve", "Hidden Path Entertainment"]);
        expect(this.result[0].genres).toEqual(["Action", "Free to Play"]);
        expect(this.result[0].description).toBe(
          "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
        );
      });

      it("the second game's details are updated", function () {
        expect(this.result[1].developers).toEqual(["Hopoo Games"]);
        expect(this.result[1].genres).toEqual(["Action", "Indie"]);
        expect(this.result[1].description).toBe(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });
  });

  describe(".getSteamDbDevelopers.", function () {
    describe("When we provide a html page that contains two developers,", function () {
      beforeAll(function () {
        this.result = getSteamDbDevelopers(counterStrikeHtmlDetailsSteamDb);
      });

      it("two developers are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the developer is 'Valve'", function () {
        expect(this.result[0]).toBe("Valve");
      });

      it("the developer is 'Hidden Path Entertainment'", function () {
        expect(this.result[1]).toBe("Hidden Path Entertainment");
      });
    });

    describe("When we provide a html page that doesn't contain a developer section", function () {
      beforeAll(function () {
        this.result = getSteamDbDevelopers(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("an empty array is returned", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbGenres.", function () {
    describe("When we provide a html page that contains the genres,", function () {
      beforeAll(function () {
        this.result = getSteamDbGenres(riskOfRainHtmlDetailsSteamDb);
      });

      it("two genres are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first genre is 'Action'", function () {
        expect(this.result[0]).toBe("Action");
      });

      it("the second genre is 'Indie'", function () {
        expect(this.result[1]).toBe("Indie");
      });
    });

    describe("When we provide a html page that doesn't contain a genres section,", function () {
      beforeAll(function () {
        this.result = getSteamDbGenres(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("an empty array is returned", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbDescription.", function () {
    describe("When we provide a html page that contains the description,", function () {
      beforeAll(function () {
        this.result = getSteamDbDescription(riskOfRainHtmlDetailsSteamDb);
      });

      it("the returned value is the game's description'", function () {
        expect(this.result).toEqual(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });

    describe("When we provide a html page that doesn't contain a description section,", function () {
      beforeAll(function () {
        this.result = getSteamDbDescription(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("an empty string is returned", function () {
        expect(this.result).toEqual("");
      });
    });
  });

  describe(".updateMissingReleaseDates.", function () {
    describe("When we try to update two games with missing release dates,", function () {
      beforeAll(function () {
        this.games = getXsteamchartsInstantiatedGames(2);

        const htmlDetailsPages = createHtmlDetailsPages([
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ]);

        this.result = updateMissingReleaseDates(this.games, htmlDetailsPages);
      });

      it("two games are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first game's release date is updated", function () {
        expect(this.result[0].releaseDate).toEqual(new Date("21 August 2012 UTC"));
      });

      it("the second game's release date is updated", function () {
        expect(this.result[1].releaseDate).toEqual(new Date("11 August 2020 UTC"));
      });
    });
  });

  describe(".getSteamDbReleaseDate.", function () {
    describe("When we provide a html page that doesn't contain a valid release date,", function () {
      beforeAll(function () {
        this.result = getSteamDbReleaseDate(karmazooHtmlDetailsPageSteamDb);
      });

      it("an empty string is returned", function () {
        expect(this.result).toBe("");
      });
    });

    describe("When we provide a html page that contains a valid release date,", function () {
      beforeAll(function () {
        this.date = new Date("11 August 2020 UTC");

        this.result = getSteamDbReleaseDate(riskOfRainHtmlDetailsSteamDb);
      });

      it("a date is returned'", function () {
        expect(this.result).toBeInstanceOf(Date);
      });

      it("the correct date is returned", function () {
        expect(this.result).toEqual(this.date);
      });
    });

    describe("When we provide a html page that doesn't contain a date section", function () {
      beforeAll(function () {
        this.result = getSteamDbReleaseDate(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("an empty string is returned", function () {
        expect(this.result).toBe("");
      });
    });
  });
});
