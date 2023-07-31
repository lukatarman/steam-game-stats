import {
  getSteamAppType,
  discoverGamesFromSteamWeb,
  updateTypeSideEffectFree,
  identifyGames,
  assignType,
  getReleaseDate,
  getDevelopers,
  getGenres,
  getGameDescription,
  updateMissingProperties,
  getSteamDbReleaseDate,
  getSteamDbDevelopers,
  getSteamDbGenres,
  getSteamDbDescription,
} from "./game.service.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";
import { feartressGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { glitchhikersSoundtrackHtmlDetailsPage } from "../../../../assets/steam-details-pages/glitchhikers.soundtrack.html.details.page.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../../assets/steam-details-pages/gta.5.age.restricted.html.details.page.js";
import { padakVideoHtmlDetailsPage } from "../../../../assets/steam-details-pages/padak.video.html.details.page.js";
import { theSims4dlcHtmlDetailsPage } from "../../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { Game } from "../../../models/game.js";
import { SteamApp } from "../../../models/steam.app.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { crusaderKingsDetailsPage } from "../../../../assets/steam-details-pages/crusader.kings.multiple.developers.html.details.page.js";
import { riskOfRainHtmlDetailsPageMissingInfo } from "../../../../assets/steam-details-pages/risk.of.rain.missing.additional.info.page.js";
import { ValidDataSources } from "../../../utils/valid.data.sources.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import { karmazooHtmlDetailsPageSteamDb } from "../../../../assets/steamdb-details-pages/karmazoo.html.details.page.js";
import { starfieldHtmlDetailsSteamDb } from "../../../../assets/steamdb-details-pages/starfield.html.details.page.js";

describe("game.service.js", () => {
  describe(".getSteamAppType", () => {
    describe("game is age restricted - there is no .blockbg class on the page", () => {
      let appType;

      beforeAll(async () => {
        appType = getSteamAppType(gta5ageRestrictedHtmlDetailsPage);
      });

      it("the function returns 'unknown'", () => {
        expect(appType).toBe(SteamApp.validTypes.unknown);
      });
    });

    describe("if there is no 'All Software' or 'All Games' in the first breadcrumb child text", () => {
      let appType;

      beforeAll(async () => {
        appType = getSteamAppType(padakVideoHtmlDetailsPage);
      });

      it("the function returns 'unknown'", () => {
        expect(appType).toBe(SteamApp.validTypes.unknown);
      });
    });

    describe("if the text 'Downloadable Content' is in one of the breadcrumbs", () => {
      let appType;

      beforeAll(async () => {
        appType = getSteamAppType(theSims4dlcHtmlDetailsPage);
      });

      it("the function returns 'downloadableContent'", () => {
        expect(appType).toBe(SteamApp.validTypes.downloadableContent);
      });
    });

    describe(".blockbg class is on the page, 'All Software' or 'All Games' is in the first breadcrumb and there is no 'Downloadable Content' text in the breadcrumbs", () => {
      let appType;

      beforeAll(async () => {
        appType = getSteamAppType(feartressGameHtmlDetailsPage);
      });

      it("the function returns 'game'", () => {
        expect(appType).toBe(SteamApp.validTypes.game);
      });
    });
  });

  describe(".discoverGamesFromSteamWeb", function () {
    describe("discovers one game out of a batch of one stemApp, so", function () {
      beforeEach(function () {
        this.steamApps = [
          {
            appid: 1,
            name: "Animaddicts",
          },
        ];
        this.htmlDetailsPages = [animaddicts2gameHtmlDetailsPage];

        this.games = discoverGamesFromSteamWeb(this.steamApps, this.htmlDetailsPages);
      });

      it("the length of games is 1", function () {
        expect(this.games.length).toBe(1);
      });

      it("the name of the first game array entry is 'Animaddicts'", function () {
        expect(this.games[0].name).toBe("Animaddicts");
      });

      it("the first entry in the games array is an instance of game", function () {
        expect(this.games[0]).toBeInstanceOf(Game);
      });
    });

    describe("discovers one game out of a batch of two steamApps, so", function () {
      beforeEach(function () {
        this.steamApps = [
          {
            appid: 1,
            name: "Animaddicts",
          },
          {
            appid: 2,
            name: "Glitchhikers Soundtrack 2",
          },
        ];

        this.htmlDetailsPages = [
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
        ];

        this.games = discoverGamesFromSteamWeb(this.steamApps, this.htmlDetailsPages);
      });

      it("the length of games is 1", function () {
        expect(this.games.length).toBe(1);
      });

      it("the name of the first game array entry is 'Animaddicts'", function () {
        expect(this.games[0].name).toBe("Animaddicts");
      });

      it("the first entry in the games array is an instance of game", function () {
        expect(this.games[0]).toBeInstanceOf(Game);
      });
    });

    describe("discovers two games out of a batch of three steamApps, so", function () {
      beforeEach(function () {
        this.steamApps = [
          {
            appid: 1,
            name: "Animaddicts",
          },
          {
            appid: 2,
            name: "Glitchhikers Soundtrack 2",
          },
          {
            appid: 3,
            name: "Feartress",
          },
        ];

        this.htmlDetailsPages = [
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
          feartressGameHtmlDetailsPage,
        ];

        this.games = discoverGamesFromSteamWeb(this.steamApps, this.htmlDetailsPages);
      });

      it("the length of games is 1", function () {
        expect(this.games.length).toBe(2);
      });

      it("the name of the first game array entry is 'Animaddicts'", function () {
        expect(this.games[0].name).toBe("Animaddicts");
      });

      it("the first entry in the games array is an instance of game", function () {
        expect(this.games[0]).toBeInstanceOf(Game);
      });

      it("the name of the second game array entry is 'Feartress'", function () {
        expect(this.games[1].name).toBe("Feartress");
      });

      it("the first entry in the games array is an instance of game", function () {
        expect(this.games[1]).toBeInstanceOf(Game);
      });
    });
  });

  describe(".getReleaseDate checks for a release date in the provided HTML page.", function () {
    describe("if the provided HTML page does not include a release date,", function () {
      beforeEach(function () {
        this.result = getReleaseDate(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty string", function () {
        expect(this.result).toBe("");
      });
    });

    describe("if the provided HTML page includes a release date,", function () {
      beforeEach(function () {
        this.result = getReleaseDate(mortalDarknessGameHtmlDetailsPage);
      });

      it("the result is a date", function () {
        expect(this.result).toBeInstanceOf(Date);
      });
      it("the result is 'Aug 2023'", function () {
        expect(this.result).toEqual(new Date(this.result));
      });
    });
  });

  describe(".getDevelopers checks for developers in the provided HTML page.", function () {
    describe("if the provided HTML page does not include any developers,", function () {
      beforeEach(function () {
        this.result = getDevelopers(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("if the provided HTML page includes one developer,", function () {
      beforeEach(function () {
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
      beforeEach(function () {
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
      beforeEach(function () {
        this.result = getGenres(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("if the provided HTML page includes genres,", function () {
      beforeEach(function () {
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
      beforeEach(function () {
        this.result = getGameDescription(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the result is an empty string", function () {
        expect(this.result).toEqual("");
      });
    });

    describe("if the provided HTML page includes a description,", function () {
      beforeEach(function () {
        this.result = getGameDescription(mortalDarknessGameHtmlDetailsPage);
      });

      it("the resulting is a specific string", function () {
        expect(this.result).toBe(
          "“One grim dawn and noble I wake, The darkness is rampant, our oath shall break. A noble warrior soon shall rise, and clear the air of the darkened skies.”",
        );
      });
    });
  });

  describe(".updateTypeSideEffectFree", function () {
    describe("discovers one steamApp out of a batch of one, so", function () {
      beforeEach(function () {
        this.apps = [
          {
            appid: 1,
            name: "Glitchhikers Soundtrack 2",
          },
        ];

        this.steamApps = SteamApp.manyFromSteamApi(this.apps);

        this.htmlDetailsPages = [glitchhikersSoundtrackHtmlDetailsPage];

        this.updatedSteamApps = updateTypeSideEffectFree(
          this.steamApps,
          this.htmlDetailsPages,
        );
      });

      it("the length of updatedSteamApps is 1", function () {
        expect(this.updatedSteamApps.length).toBe(1);
      });

      it("the first entry in the updatedSteamApps array is an instance of SteamApp", function () {
        expect(this.updatedSteamApps[0]).toBeInstanceOf(SteamApp);
      });

      it("the name of the first updatedSteamApps array entry is 'Glitchhikers Soundtrack 2'", function () {
        expect(this.updatedSteamApps[0].name).toBe(this.apps[0].name);
      });

      it("the first array entry in updatedSteamApps has a property 'triedVia', and it's value is 'steamWeb'", function () {
        expect(this.updatedSteamApps[0].triedVia[0]).toBe(
          ValidDataSources.validDataSources.steamWeb,
        );
      });

      it("the first array entry in updatedSteamApps has a property 'type', and it's value is 'unknown'", function () {
        expect(this.updatedSteamApps[0].type).toBe(SteamApp.validTypes.unknown);
      });
    });

    describe("discovers one game and one downloadable content out of a batch of three steamApps, so", function () {
      beforeEach(function () {
        this.apps = [
          {
            appid: 1,
            name: "Glitchhikers Soundtrack 2",
          },
          {
            appid: 2,
            name: "Animaddicts",
          },
          {
            appid: 3,
            name: "The Sims 4 Cats and Dogs DLC",
          },
        ];

        this.steamApps = SteamApp.manyFromSteamApi(this.apps);

        this.htmlDetailsPages = [
          glitchhikersSoundtrackHtmlDetailsPage,
          animaddicts2gameHtmlDetailsPage,
          theSims4dlcHtmlDetailsPage,
        ];

        this.updatedSteamApps = updateTypeSideEffectFree(
          this.steamApps,
          this.htmlDetailsPages,
        );
      });

      it("the length of updatedSteamApps is 3", function () {
        expect(this.updatedSteamApps.length).toBe(3);
      });

      it("the first entry in the updatedSteamApps array is an instance of SteamApp", function () {
        expect(this.updatedSteamApps[0]).toBeInstanceOf(SteamApp);
      });

      it("the second entry in the updatedSteamApps array is an instance of SteamApp", function () {
        expect(this.updatedSteamApps[1]).toBeInstanceOf(SteamApp);
      });

      it("the third entry in the updatedSteamApps array is an instance of SteamApp", function () {
        expect(this.updatedSteamApps[2]).toBeInstanceOf(SteamApp);
      });

      it("the name of the first updatedSteamApps array entry is 'Glitchhikers Soundtrack 2'", function () {
        expect(this.updatedSteamApps[0].name).toBe(this.apps[0].name);
      });

      it("the name of the second updatedSteamApps array entry is 'Animaddicts'", function () {
        expect(this.updatedSteamApps[1].name).toBe(this.apps[1].name);
      });

      it("the name of the third updatedSteamApps array entry is 'The Sims 4 Cats and Dogs DLC'", function () {
        expect(this.updatedSteamApps[2].name).toBe(this.apps[2].name);
      });

      it("the first array entry in updatedSteamApps has a property 'triedVia', and it's value is 'steamWeb'", function () {
        expect(this.updatedSteamApps[0].triedVia[0]).toBe(
          ValidDataSources.validDataSources.steamWeb,
        );
      });

      it("the second array entry in updatedSteamApps has a property 'triedVia', and it's value is 'steamWeb'", function () {
        expect(this.updatedSteamApps[1].triedVia[0]).toBe(
          ValidDataSources.validDataSources.steamWeb,
        );
      });

      it("the third array entry in updatedSteamApps has a property 'triedVia', and it's value is 'steamWeb'", function () {
        expect(this.updatedSteamApps[2].triedVia[0]).toBe(
          ValidDataSources.validDataSources.steamWeb,
        );
      });

      it("the first entry in updatedSteamApps has a property 'type', and it's value is 'unknown'", function () {
        expect(this.updatedSteamApps[0].type).toBe(SteamApp.validTypes.unknown);
      });

      it("the second entry in updatedSteamApps has a property 'type', and it's value is 'game'", function () {
        expect(this.updatedSteamApps[1].type).toBe(SteamApp.validTypes.game);
      });

      it("the third entry in updatedSteamApps has a property 'type', and it's value is 'downloadableContent'", function () {
        expect(this.updatedSteamApps[2].type).toBe(
          SteamApp.validTypes.downloadableContent,
        );
      });

      it("the second entry in updatedSteamApps has a property 'type', and it's value is 'game'", function () {
        expect(this.updatedSteamApps[1].type).toBe(SteamApp.validTypes.game);
      });

      it("the third entry in updatedSteamApps has a property 'type', and it's value is 'downloadableContent'", function () {
        expect(this.updatedSteamApps[2].type).toBe(
          SteamApp.validTypes.downloadableContent,
        );
      });
    });
  });

  describe(".identifyGames", function () {
    describe("checks which steam apps are games and instantiates them, so", function () {
      describe("when no games out of a batch of one steamApp is passed in,", function () {
        beforeEach(function () {
          this.updatedSteamApps = [
            {
              appid: 1,
              name: "Glitchiker Soundtrack",
            },
          ];

          this.instantiatedApps = SteamApp.manyFromSteamApi(this.updatedSteamApps);
          this.result = identifyGames(this.instantiatedApps);
        });

        it("the method returns an empty array", function () {
          expect(this.result).toEqual([]);
        });
      });

      describe("when one game out of a batch of two steamApps is passed in,", function () {
        beforeEach(function () {
          this.updatedSteamApps = [
            {
              appid: 1,
              name: "Glitchiker Soundtrack",
            },
            {
              appid: 2,
              name: "Feartress",
            },
          ];

          this.instantiatedApps = SteamApp.manyFromSteamApi(this.updatedSteamApps);
          this.instantiatedApps[1].type = SteamApp.validTypes.game;

          this.result = identifyGames(this.instantiatedApps);
        });

        it("the returned array length is one", function () {
          expect(this.result.length).toBe(1);
        });

        it("the name property in the first returned array index is 'Feartress'", function () {
          expect(this.result[0].name).toBe(this.updatedSteamApps[1].name);
        });
      });

      describe("when two games out of a batch of three steamApps is passed in,", function () {
        beforeEach(function () {
          this.updatedSteamApps = [
            {
              appid: 1,
              name: "Glitchiker Soundtrack",
            },
            {
              appid: 2,
              name: "Feartress",
            },
            {
              appid: 3,
              name: "Elden Ring",
            },
          ];

          this.instantiatedApps = SteamApp.manyFromSteamApi(this.updatedSteamApps);
          this.instantiatedApps[1].type = SteamApp.validTypes.game;
          this.instantiatedApps[2].type = SteamApp.validTypes.game;

          this.result = identifyGames(this.instantiatedApps);
        });

        it("the returned array length is two", function () {
          expect(this.result.length).toBe(2);
        });

        it("the name property in the first returned array index is 'Feartress'", function () {
          expect(this.result[0].name).toBe(this.updatedSteamApps[1].name);
        });

        it("the name property in the first returned array index is 'Elden Ring'", function () {
          expect(this.result[1].name).toBe(this.updatedSteamApps[2].name);
        });
      });
    });
  });

  describe(".assignType", function () {
    describe("checks if result contains a value. If so, sets the type property to 'games'. So", function () {
      describe("when result does not contain a value,", function () {
        beforeEach(function () {
          this.app = { id: 1, name: "Feartress" };
          this.steamApp = SteamApp.oneFromSteamApi(this.app);

          this.result = assignType(undefined, this.steamApp);
        });

        it("the function returns the steamApp. The type property remains 'unknown'", function () {
          expect(this.result.type).toBe(SteamApp.validTypes.unknown);
        });
      });

      describe("when the result contains a value,", function () {
        beforeEach(function () {
          this.app = { id: 1, name: "Feartress" };
          this.steamApp = SteamApp.oneFromSteamApi(this.app);

          this.result = assignType(true, this.steamApp);
        });

        it("the function returns the steamApp. The type property is 'game'", function () {
          expect(this.result.type).toBe(SteamApp.validTypes.game);
        });
      });
    });
  });

  describe(".updateMissingProperties.", function () {
    describe("When all the properties of three games are missing,", function () {
      beforeEach(function () {
        const games = [
          Game.fromSteamcharts({ appid: 1, name: "Counter-Strike" }),
          Game.fromSteamcharts({ appid: 2, name: "Risk of Rain" }),
          Game.fromSteamcharts({ appid: 3, name: "Starfield" }),
        ];

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
          starfieldHtmlDetailsSteamDb,
        ];

        this.result = updateMissingProperties(games, htmlDetailsPages);
      });

      it("three games are returned", function () {
        expect(this.result.length).toBe(3);
      });

      it("the name of the first game is 'Counter-Strike", function () {
        expect(this.result[0].name).toBe("Counter-Strike");
      });

      it("the first game's properties are added", function () {
        expect(this.result[0].releaseDate).toEqual(new Date("21 August 2012"));
        expect(this.result[0].developers).toEqual(["Valve", "Hidden Path Entertainment"]);
        expect(this.result[0].genres).toEqual(["Action", "Free to Play"]);
        expect(this.result[0].description).toBe(
          "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
        );
      });

      it("the second game is 'Risk of Rain", function () {
        expect(this.result[1].name).toBe("Risk of Rain");
      });

      it("the second game's properties are added", function () {
        expect(this.result[1].releaseDate).toEqual(new Date("11 August 2020"));
        expect(this.result[1].developers).toEqual(["Hopoo Games"]);
        expect(this.result[1].genres).toEqual(["Action", "Indie"]);
        expect(this.result[1].description).toBe(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });

      it("the third game is 'Starfield'", function () {
        expect(this.result[2].name).toBe("Starfield");
      });

      it("the third game's properties are added", function () {
        expect(this.result[2].releaseDate).toEqual(new Date("6 September 2023"));
        expect(this.result[2].developers).toEqual(["Bethesda Game Studios"]);
        expect(this.result[2].genres).toEqual(["RPG"]);
        expect(this.result[2].description).toBe(
          "Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4.",
        );
      });
    });

    describe("When one property of a game is missing", function () {
      beforeEach(function () {
        const steamApp = {
          appid: 1,
          name: "Counter-Strike",
        };

        this.releaseDate = "";
        this.developers = [];
        this.genres = [];
        this.description = "Best game";

        const instantiatedGames = [
          Game.fromSteamApp(
            steamApp,
            this.releaseDate,
            this.developers,
            this.genres,
            this.description,
          ),
        ];

        const htmlDetailsPages = [counterStrikeHtmlDetailsSteamDb];

        this.result = updateMissingProperties(instantiatedGames, htmlDetailsPages);
      });

      it("one game is returned", function () {
        expect(this.result.length).toBe(1);
      });

      it("the name of the game is 'Counter-Strike", function () {
        expect(this.result[0].name).toBe("Counter-Strike");
      });

      it("the game's properties remain unchanged", function () {
        expect(this.result[0].releaseDate).toEqual(new Date("21 August 2012"));
        expect(this.result[0].developers).toEqual(["Valve", "Hidden Path Entertainment"]);
        expect(this.result[0].genres).toEqual(["Action", "Free to Play"]);
        expect(this.result[0].description).toBe(this.description);
      });
    });

    describe("When the game's properties are already there,", function () {
      beforeEach(function () {
        const steamApp = {
          appid: 1,
          name: "Counter-Strike",
        };

        this.releaseDate = "21 July 2019";
        this.developers = ["Valve", "Hopoo Games"];
        this.genres = ["Action", "Adventure"];
        this.description = "Best game";

        const instantiatedGames = [
          Game.fromSteamApp(
            steamApp,
            this.releaseDate,
            this.developers,
            this.genres,
            this.description,
          ),
        ];

        const htmlDetailsPages = [counterStrikeHtmlDetailsSteamDb];

        this.result = updateMissingProperties(instantiatedGames, htmlDetailsPages);
      });

      it("one game is returned", function () {
        expect(this.result.length).toBe(1);
      });

      it("the name of the game is 'Counter-Strike", function () {
        expect(this.result[0].name).toBe("Counter-Strike");
      });

      it("the game's properties remain unchanged", function () {
        expect(this.result[0].releaseDate).toBe(this.releaseDate);
        expect(this.result[0].developers).toEqual(this.developers);
        expect(this.result[0].genres).toEqual(this.genres);
        expect(this.result[0].description).toBe(this.description);
      });
    });
  });

  describe(".getSteamDbReleaseDate returns the release date from the provided html page.", function () {
    describe("When the specific page content does not contain a valid date,", function () {
      beforeEach(function () {
        this.result = getSteamDbReleaseDate(karmazooHtmlDetailsPageSteamDb);
      });

      it("the returned value is 'Coming soon'", function () {
        expect(this.result).toBe("Coming soon");
      });
    });

    describe("When the release date is a valid date,", function () {
      beforeEach(function () {
        this.date = new Date("11 August 2020");

        this.result = getSteamDbReleaseDate(riskOfRainHtmlDetailsSteamDb);
      });

      it("a date is returned'", function () {
        expect(this.result).toBeInstanceOf(Date);
      });

      it("the returned date is '11 August 2020'", function () {
        expect(this.result).toEqual(this.date);
      });
    });

    describe("When no release date is found", function () {
      beforeEach(function () {
        this.result = getSteamDbReleaseDate(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the returned value is an empty string", function () {
        expect(this.result).toBe("");
      });
    });
  });

  describe(".getSteamDbDevelopers returns the developers from the provided html page.", function () {
    describe("When the developers are found,", function () {
      beforeEach(function () {
        this.result = getSteamDbDevelopers(riskOfRainHtmlDetailsSteamDb);
      });

      it("one developer is returned", function () {
        expect(this.result.length).toBe(1);
      });

      it('the developer is "Hopoo Games"', function () {
        expect(this.result[0]).toBe("Hopoo Games");
      });
    });

    describe("When no developers are found", function () {
      beforeEach(function () {
        this.result = getSteamDbDevelopers(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the returned value is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbGenres returns the genres from the provided html page.", function () {
    describe("When the genres are found,", function () {
      beforeEach(function () {
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

    describe("When no genres are found", function () {
      beforeEach(function () {
        this.result = getSteamDbGenres(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the returned value is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbDescription returns the description from the provided html page.", function () {
    describe("When the description is found,", function () {
      beforeEach(function () {
        this.result = getSteamDbDescription(riskOfRainHtmlDetailsSteamDb);
      });

      it("the returned value is the page's game description'", function () {
        expect(this.result).toEqual(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });

    describe("When no description is found", function () {
      beforeEach(function () {
        this.result = getSteamDbDescription(riskOfRainHtmlDetailsPageMissingInfo);
      });

      it("the returned value is an empty string", function () {
        expect(this.result).toEqual("");
      });
    });
  });
});
