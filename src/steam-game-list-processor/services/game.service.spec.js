import axios from "axios";
import { gamesMock } from "../../../assets/small.data.set.js";
import { steamAppIsGame, filterSteamAppsByName, identifyGamesFromSteamHtmlDetailsPages } from "./game.service.js";
import { SteamClient } from "../../infrastructure/steam.client.js";
import { featressGameHtmlDetailsPage } from "../../../assets/steam-details-pages/feartress.game.html.detals.page.js";
import { goAceItGameHtmlDetailsPage } from "../../../assets/steam-details-pages/go.ace.it.game.html.details.page.js";
import { animaddicts2gameHtmlDetailsPage } from "../../../assets/steam-details-pages/animaddicts.2.game.html.detail.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { glitchhikersSoundtrackHtmlDetailsPage } from "../../../assets/steam-details-pages/glitchhikers.soundtrack.html.details.page.js";

describe("game.service.js", () => {
  describe(".filterSteamAppsByName", () => {
    describe("if steamApp.name string ends with 'DLC' keyword", () => {
      let includesKeywords;

      beforeAll(() => {
        const steamApp = {
          appid: 1234,
          name: "Holy smokes DLC",
        };
        includesKeywords = filterSteamAppsByName([steamApp]);
      });

      it("function filterSteamAppsByName returns true", () => {
        expect(includesKeywords.length).toBe(0);
      });
    });

    describe("if steamApp.name string ends with 'soundtrack' keyword", () => {
      let includesKeywords;

      beforeAll(() => {
        const steamApp = {
          appid: 1235,
          name: "The Mire Soundtrack",
        };
        includesKeywords = filterSteamAppsByName([steamApp]);
      });

      it("function filterSteamAppsByName returns true", () => {
        expect(includesKeywords.length).toBe(0);
      });
    });

    describe("if steamApp.name string does not end with dlc or soundtrack keyword", () => {
      let includesKeywords;

      beforeAll(() => {
        const steamApp = {
          appid: 1236,
          name: "Fantasy Grounds - Deneb Adventure 1: The Lost Duke",
        };
        includesKeywords = filterSteamAppsByName([steamApp]);
      });

      it("function filterSteamAppsByName returns false", () => {
        expect(includesKeywords.length).toBeTrue;
      });
    });

    describe("returns array of only the games that do not contain keywords 'dlc' or 'soundtrack' at the end of their names", () => {
      let games;

      beforeAll(() => {
        games = filterSteamAppsByName(gamesMock);
      });

      it("returns array with 15 entries", () => {
        const isGameFalseCounter = games.length;
        expect(isGameFalseCounter).toBe(gamesMock.length - 15);
      });
    });
  });

  // todo: update tests - remove steam client
  xdescribe(".steamAppIsGame", () => {
    describe("if there is no .blockbg class on the page", () => {
      let isGame;

      beforeAll(async () => {
        const steamClient = new SteamClient(axios);
        const steamApp = { id: 271590 };
        const httpDetails = await steamClient.getSteamAppHtmlDetailsPage(steamApp);
        isGame = steamAppIsGame(httpDetails);
      });

      it("the function returns false", () => {
        expect(isGame).toBe(false);
      });
    });

    describe("if there is no 'All Software' or 'All Games' in the first breadcrumb child text", () => {
      let isGame;

      beforeAll(async () => {
        const steamClient = new SteamClient(axios);
        const steamApp = { id: 1701720 };
        const httpDetails = await steamClient.getSteamAppHtmlDetailsPage(steamApp);
        isGame = steamAppIsGame(httpDetails);
      });

      it("the function returns false", () => {
        expect(isGame).toBe(false);
      });
    });

    describe("if the text 'Downloadable Content' is in one of the breadcrumbs", () => {
      let isGame;

      beforeAll(async () => {
        const steamClient = new SteamClient(axios);
        const steamApp = { id: 1656330 };
        const httpDetails = await steamClient.getSteamAppHtmlDetailsPage(steamApp);
        isGame = steamAppIsGame(httpDetails);
      });

      it("the function returns false", () => {
        expect(isGame).toBe(false);
      });
    });

    describe(".blockbg class is on the page, 'All Software' or 'All Games' is in the first breadcrumb and there is no 'Downloadable Content' text in the breadcrumbs", () => {
      let isGame;

      beforeAll(async () => {
        const steamClient = new SteamClient(axios);
        const steamApp = { id: 1794680 };
        const httpDetails = await steamClient.getSteamAppHtmlDetailsPage(steamApp);
        isGame = steamAppIsGame(httpDetails);
      });

      it("the function returns true", () => {
        expect(isGame).toBe(true);
      });
    });
  });

 describe(".identifyGamesFromSteamHtmlDetailsPages", () => {
    let steamApps;
    let htmlDetailsPages;
    let games;
    let identifiedPages;

    describe("identifies one game successfully", () => {
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

        [games, identifiedPages] = identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);
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

      it("returns an array of identifiedPages with the same length as htmlDetailsPages", () => {
        expect(identifiedPages.length).toBe(htmlDetailsPages.length);
      });

      it("the identified game page has the string 'identified' in its place in the array", () => {
        expect(identifiedPages[0]).toBe('identified');
      });
    });

    describe("identifies two games successfully", () => {
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

        [games, identifiedPages] = identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);
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

      it("returns an array of identifiedPages with the same length as htmlDetailsPages", () => {
        expect(identifiedPages.length).toBe(htmlDetailsPages.length);
      });

      it("the first identified game page has the string 'identified' in its place in the array", () => {
        expect(identifiedPages[0]).toBe('identified');
      });

      it("the second identified game page has the string 'identified' in its place in the array", () => {
        expect(identifiedPages[2]).toBe('identified');
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

        [games, identifiedPages] = identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);
      });

      it("returns an empty array of games with length 0", () => {
        expect(games.length).toBe(0);
      });

      it("returns an array of identifiedPages with the same length as htmlDetailsPages", () => {
        expect(identifiedPages.length).toBe(htmlDetailsPages.length);
      });

      it("identifiedPages array has no entry with the 'identified' string'", () => {
        expect(identifiedPages.indexOf('identified')).toBe(-1);
      });
    });
  });
});
