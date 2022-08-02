import {
  steamAppIsGame,
  discoverGamesFromSteamWeb,
  updateIdentificationStatusSideEffectFree,
  identifyGames,
  setAsIdentified,
} from "./game.service.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";
import { feartressGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { glitchhikersSoundtrackHtmlDetailsPage } from "../../../../assets/steam-details-pages/glitchhikers.soundtrack.html.details.page.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../../assets/steam-details-pages/gta.5.age.restricted.html.details.page.js";
import { padakVideoHtmlDetailsPage } from "../../../../assets/steam-details-pages/padak.video.html.details.page.js";
import { theSims4catsAndDogsHtmlDetailsPage } from "../../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { Game } from "../../../models/game.js";
import { SteamApp } from "../../../models/steam.app.js";

describe("game.service.js", () => {
  describe(".steamAppIsGame", () => {
    describe("game is age restricted - there is no .blockbg class on the page", () => {
      let isGame;

      beforeAll(async () => {
        isGame = steamAppIsGame(gta5ageRestrictedHtmlDetailsPage);
      });

      it("the function returns false", () => {
        expect(isGame).toBe(false);
      });
    });

    describe("if there is no 'All Software' or 'All Games' in the first breadcrumb child text", () => {
      let isGame;

      beforeAll(async () => {
        isGame = steamAppIsGame(padakVideoHtmlDetailsPage);
      });

      it("the function returns false", () => {
        expect(isGame).toBe(false);
      });
    });

    describe("if the text 'Downloadable Content' is in one of the breadcrumbs", () => {
      let isGame;

      beforeAll(async () => {
        isGame = steamAppIsGame(theSims4catsAndDogsHtmlDetailsPage);
      });

      it("the function returns false", () => {
        expect(isGame).toBe(false);
      });
    });

    describe(".blockbg class is on the page, 'All Software' or 'All Games' is in the first breadcrumb and there is no 'Downloadable Content' text in the breadcrumbs", () => {
      let isGame;

      beforeAll(async () => {
        isGame = steamAppIsGame(feartressGameHtmlDetailsPage);
      });

      it("the function returns true", () => {
        expect(isGame).toBe(true);
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

  describe(".updateIdentificationStatusSideEffectFree", function () {
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

        this.unidentifiedSteamApps = updateIdentificationStatusSideEffectFree(
          this.steamApps,
          this.htmlDetailsPages,
        );
      });

      it("the length of unidentifiedSteamApps is 1", function () {
        expect(this.unidentifiedSteamApps.length).toBe(1);
      });

      it("the first entry in the unidentifiedSteamApps array is an instance of SteamApp", function () {
        expect(this.unidentifiedSteamApps[0]).toBeInstanceOf(SteamApp);
      });

      it("the name of the first unidentifiedSteamApps array entry is 'Glitchhikers Soundtrack 2'", function () {
        expect(this.unidentifiedSteamApps[0].name).toBe(this.apps[0].name);
      });

      it("the first array entry in unidentifiedSteamApps has a property 'triedVia', and it's value is 'steamWeb'", function () {
        expect(this.unidentifiedSteamApps[0].triedVia[0]).toBe("steamWeb");
      });

      it("the first array entry in unidentifiedSteamApps has a property 'identified', and it's value is 'false'", function () {
        expect(this.unidentifiedSteamApps[0].identified).toBeFalse();
      });
    });

    describe("discovers one game out of a batch of two steamApps, so", function () {
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
        ];

        this.steamApps = SteamApp.manyFromSteamApi(this.apps);

        this.htmlDetailsPages = [
          glitchhikersSoundtrackHtmlDetailsPage,
          animaddicts2gameHtmlDetailsPage,
        ];

        this.unidentifiedSteamApps = updateIdentificationStatusSideEffectFree(
          this.steamApps,
          this.htmlDetailsPages,
        );
      });

      it("the length of unidentifiedSteamApps is 2", function () {
        expect(this.unidentifiedSteamApps.length).toBe(2);
      });

      it("the first entry in the unidentifiedSteamApps array is an instance of SteamApp", function () {
        expect(this.unidentifiedSteamApps[0]).toBeInstanceOf(SteamApp);
      });

      it("the second entry in the unidentifiedSteamApps array is an instance of SteamApp", function () {
        expect(this.unidentifiedSteamApps[1]).toBeInstanceOf(SteamApp);
      });

      it("the name of the first unidentifiedSteamApps array entry is 'Glitchhikers Soundtrack 2'", function () {
        expect(this.unidentifiedSteamApps[0].name).toBe(this.apps[0].name);
      });

      it("the name of the second unidentifiedSteamApps array entry is 'Animaddicts'", function () {
        expect(this.unidentifiedSteamApps[1].name).toBe(this.apps[1].name);
      });

      it("the first array entry in unidentifiedSteamApps has a property 'triedVia', and it's value is 'steamWeb'", function () {
        expect(this.unidentifiedSteamApps[0].triedVia[0]).toBe("steamWeb");
      });

      it("the second array entry in unidentifiedSteamApps has a property 'triedVia', and it's value is 'steamWeb'", function () {
        expect(this.unidentifiedSteamApps[1].triedVia[0]).toBe("steamWeb");
      });

      it("the first entry in unidentifiedSteamApps has a property 'identified', and it's value is 'false'", function () {
        expect(this.unidentifiedSteamApps[0].identified).toBeFalse();
      });

      it("the second entry in unidentifiedSteamApps has a property 'identified', and it's value is 'true'", function () {
        expect(this.unidentifiedSteamApps[1].identified).toBeTrue();
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
              identified: false,
              triedVia: ["steamcharts"],
            },
          ];

          this.result = identifyGames(this.updatedSteamApps);
        });

        it("the method returns undefined", function () {
          expect(this.result).toEqual([]);
        });
      });

      describe("when one game out of a batch of two steamApps is passed in,", function () {
        beforeEach(function () {
          this.updatedSteamApps = [
            {
              appid: 1,
              name: "Glitchiker Soundtrack",
              identified: false,
              triedVia: ["steamcharts"],
            },
            {
              appid: 2,
              name: "Feartress",
              identified: true,
              triedVia: ["steamcharts"],
            },
          ];

          this.result = identifyGames(this.updatedSteamApps);
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
              identified: false,
              triedVia: ["steamcharts"],
            },
            {
              appid: 2,
              name: "Feartress",
              identified: true,
              triedVia: ["steamcharts"],
            },
            {
              appid: 3,
              name: "Elden Ring",
              identified: true,
              triedVia: ["steamcharts"],
            },
          ];

          this.result = identifyGames(this.updatedSteamApps);
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

  fdescribe(".setAsIdentified", function () {
    describe("checks if result contains a value. If so, identifies the steamApp. So", function () {
      describe("when result does not contain a value,", function () {
        beforeEach(function () {
          this.app = { id: 1, name: "Feartress" };
          this.steamApp = SteamApp.oneFromSteamApi(this.app);

          this.result = setAsIdentified(undefined, this.steamApp);
        });

        it("the function returns the steamApp. The identify property remains false", function () {
          expect(this.result.identified).toBe(false);
        });
      });

      describe("when the result contains a value,", function () {
        beforeEach(function () {
          this.app = { id: 1, name: "Feartress" };
          this.steamApp = SteamApp.oneFromSteamApi(this.app);

          this.result = setAsIdentified(true, this.steamApp);
        });

        it("the function returns the steamApp. The identify property is true", function () {
          expect(this.result.identified).toBe(true);
        });
      });
    });
  });
});
