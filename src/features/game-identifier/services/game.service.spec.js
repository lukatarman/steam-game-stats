import { gamesMock } from "../../../../assets/small.data.set.js";
import { steamAppIsGame, discoverGamesFromSteamHtmlDetailsPages } from "./game.service.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../../assets/steam-details-pages/animaddicts.2.game.html.details.page.js";
import { feartressGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { glitchhikersSoundtrackHtmlDetailsPage } from "../../../../assets/steam-details-pages/glitchhikers.soundtrack.html.details.page.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../../assets/steam-details-pages/gta.5.age.restricted.html.details.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { padakVideoHtmlDetailsPage } from "../../../../assets/steam-details-pages/padak.video.html.details.page.js";
import { theSims4catsAndDogsHtmlDetailsPage } from "../../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";

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

 describe(".discoverGamesFromSteamHtmlDetailsPages", () => {
    let steamApps;
    let htmlDetailsPages;
    let games;
    let discoveredPages;

    describe("discovers one game successfully", () => {
      beforeAll(() => {
        steamApps = [
          {
            appid: 1904380,
            name: "Mortal Darkness",
          },
          {
            appid: 1898200,
            name: "Glitchhikers: The Spaces Between Deluxe Soundtrack 5-Volume Set",
          },
        ];
        htmlDetailsPages = [mortalDarknessGameHtmlDetailsPage, glitchhikersSoundtrackHtmlDetailsPage];

        [games, discoveredPages] = discoverGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);
      });

      it("returns an array of games with length 1", () => {
        expect(games.length).toBe(1);
      });

      it("the game has the same id as the steam app", () => {
        expect(games[0].id).toBe(steamApps[0].appid);
      });

      it("the game has the same name as the steam app", () => {
        expect(games[0].name).toBe(steamApps[0].name);
      });

      it("returns an array of discoveredPages with the same length as htmlDetailsPages", () => {
        expect(discoveredPages.length).toBe(htmlDetailsPages.length);
      });

      it("the discovered game page has the string 'discovered' in its place in the array", () => {
        expect(discoveredPages[0]).toBe('discovered');
      });
    });

    describe("discovers two games successfully", () => {
      beforeAll(() => {
        steamApps = [
          {
            appid: 1904380,
            name: "Mortal Darkness",
          },
          {
            appid: 1898200,
            name: "Glitchhikers: The Spaces Between Deluxe Soundtrack 5-Volume Set",
          },
          {
            appid: 1904320,
            name: "Animaddicts 2",
          },
        ];
        htmlDetailsPages = [
          mortalDarknessGameHtmlDetailsPage,
          glitchhikersSoundtrackHtmlDetailsPage,
          animaddicts2gameHtmlDetailsPage
        ];

        [games, discoveredPages] = discoverGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);
      });

      it("returns an array of games with length 2", () => {
        expect(games.length).toBe(2);
      });

      it("the first game has the same id as the according steam app", () => {
        expect(games[0].id).toBe(steamApps[0].appid);
      });

      it("the first game has the same name as the according steam app", () => {
        expect(games[0].name).toBe(steamApps[0].name);
      });

      it("the second game has the same id as the according steam app", () => {
        expect(games[1].id).toBe(steamApps[2].appid);
      });

      it("the second game has the same name as the according steam app", () => {
        expect(games[1].name).toBe(steamApps[2].name);
      });

      it("returns an array of discoveredPages with the same length as htmlDetailsPages", () => {
        expect(discoveredPages.length).toBe(htmlDetailsPages.length);
      });

      it("the first discovered game page has the string 'discovered' in its place in the array", () => {
        expect(discoveredPages[0]).toBe('discovered');
      });

      it("the second discovered game page has the string 'discovered' in its place in the array", () => {
        expect(discoveredPages[2]).toBe('discovered');
      });
    });

    describe("can not identify any games", () => {
      beforeAll(() => {
        steamApps = [
          {
            appid: 1898200,
            name: "Glitchhikers: The Spaces Between Deluxe Soundtrack 5-Volume Set",
          },
        ];
        htmlDetailsPages = [
          glitchhikersSoundtrackHtmlDetailsPage,
        ];

        [games, discoveredPages] = discoverGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);
      });

      it("returns an empty array of games with length 0", () => {
        expect(games.length).toBe(0);
      });

      it("returns an array of discoveredPages with the same length as htmlDetailsPages", () => {
        expect(discoveredPages.length).toBe(htmlDetailsPages.length);
      });

      it("discoveredPages array has no entry with the 'discovered' string'", () => {
        expect(discoveredPages.indexOf('discovered')).toBe(-1);
      });
    });
  });
});