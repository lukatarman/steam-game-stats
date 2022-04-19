import { gamesMock } from "../../../assets/small.data.set.js";
import { filterSteamAppsByName, tagNonGames } from "./game.service.js";

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

  describe(".tagNonGames", () => {
    describe("tags an entry as not a game", () => {
      let games;

      beforeAll(() => {
        const game = {
          appid: 1903570,
          name: "MY HERO ONE'S JUSTICE 2 DLC Pack 9 Midnight",
        };
        games = tagNonGames([game]);
      });

      it("adds isGame=false if name includes 'dlc' keyword", () => {
        expect(games[0].isGame).toBeFalse();
      });
    });

    describe("tags an entry as not a game", () => {
      let games;

      beforeAll(() => {
        const game = {
          appid: 1902590,
          name: "Logic World Soundtrack",
        };
        games = tagNonGames([game]);
      });

      it("adds isGame=false if name includes 'soundtrack' keyword", () => {
        expect(games[0].isGame).toBeFalse();
      });
    });

    describe("does not tag if the name contains no keywords", () => {
      let games;

      beforeAll(() => {
        const game = {
          appid: 1902630,
          name: "Lighthouse of Madness Playtest",
        };
        games = tagNonGames([game]);
      });

      it("does not add isGame property", () => {
        expect(games[0].isGame).toBeUndefined();
      });
    });

    describe("tags every game as not a game which contains the keywords 'dlc' or 'soundtrack' in its name", () => {
      let games;

      beforeAll(() => {
        games = tagNonGames(gamesMock);
      });

      it("the array has 15 entries", () => {
        const isGameFalseCounter = games.filter(
          (games) => games.isGame !== undefined
        ).length;
        expect(isGameFalseCounter).toBe(28);
      });
    });
  });
});
