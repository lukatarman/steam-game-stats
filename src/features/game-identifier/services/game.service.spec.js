import { steamAppIsGame, discoverGamesFromSteamWeb } from "./game.service.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";
import { feartressGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { glitchhikersSoundtrackHtmlDetailsPage } from "../../../../assets/steam-details-pages/glitchhikers.soundtrack.html.details.page.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../../assets/steam-details-pages/gta.5.age.restricted.html.details.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { padakVideoHtmlDetailsPage } from "../../../../assets/steam-details-pages/padak.video.html.details.page.js";
import { theSims4catsAndDogsHtmlDetailsPage } from "../../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { Game } from "../../../models/game.js";
import { steamApp } from "../../../models/steam.app.js";

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

        [this.games, this.unidentifiedSteamApps] = discoverGamesFromSteamWeb(
          this.steamApps,
          this.htmlDetailsPages,
        );
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

      it("the length of unidentifiedSteamApps is 0", function () {
        expect(this.unidentifiedSteamApps.length).toBe(0);
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

        [this.games, this.unidentifiedSteamApps] = discoverGamesFromSteamWeb(
          this.steamApps,
          this.htmlDetailsPages,
        );
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

      it("the length of unidentifiedSteamApps is 1", function () {
        expect(this.unidentifiedSteamApps.length).toBe(1);
      });

      it("the name of the first steamApp array entry is 'Glitchhikers Soundtrack 2'", function () {
        expect(this.unidentifiedSteamApps[0].name).toBe("Glitchhikers Soundtrack 2");
      });
    });

    describe("discovers two games out of a batch of four steamApps, so", function () {
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
            name: "Mortal Darkness",
          },
          {
            appid: 4,
            name: "GTA V",
          },
        ];

        this.htmlDetailsPages = [
          animaddicts2gameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
          mortalDarknessGameHtmlDetailsPage,
          gta5ageRestrictedHtmlDetailsPage,
        ];

        [this.games, this.unidentifiedSteamApps] = discoverGamesFromSteamWeb(
          this.steamApps,
          this.htmlDetailsPages,
        );
      });

      it("the length of games is 2", function () {
        expect(this.games.length).toBe(2);
      });

      it("the first entry in the games array is an instance of game", function () {
        expect(this.games[0]).toBeInstanceOf(Game);
      });

      it("the name of the first game array entry is 'Animaddicts'", function () {
        expect(this.games[0].name).toBe("Animaddicts");
      });

      it("the second entry in the games array is an instance of game", function () {
        expect(this.games[1]).toBeInstanceOf(Game);
      });

      it("the name of the second game array entry is 'Mortal Darkness'", function () {
        expect(this.games[1].name).toBe("Mortal Darkness");
      });

      it("the length of unidentifiedSteamApps is 2", function () {
        expect(this.unidentifiedSteamApps.length).toBe(2);
      });

      it("the name of the first steamApp array entry is 'Glitchhikers Soundtrack 2'", function () {
        expect(this.unidentifiedSteamApps[0].name).toBe("Glitchhikers Soundtrack 2");
      });

      it("the name of the second steamApp array entry is 'GTA V'", function () {
        expect(this.unidentifiedSteamApps[1].name).toBe("GTA V");
      });
    });

    describe("discovers no games out of a batch of one steamApp, so", function () {
      beforeEach(function () {
        this.steamApps = [
          {
            appid: 1,
            name: "Padak",
          },
        ];
        this.htmlDetailsPages = [padakVideoHtmlDetailsPage];

        [this.games, this.unidentifiedSteamApps] = discoverGamesFromSteamWeb(
          this.steamApps,
          this.htmlDetailsPages,
        );
      });

      it("the length of games is 0", function () {
        expect(this.games.length).toBe(0);
      });

      it("the length of unidentifiedSteamApps is 1", function () {
        expect(this.unidentifiedSteamApps.length).toBe(1);
      });

      it("the name of the first steamApp array entry is 'Padak'", function () {
        expect(this.unidentifiedSteamApps[0].name).toBe("Padak");
      });
    });
  });
});
