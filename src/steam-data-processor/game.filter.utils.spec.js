import { gamesMock } from "../../assets/small.data.set.js";
import { filterNonGames } from "./game.filter.utils.js";

describe("game.filter.utils.js", () => {
  describe(".filterNonGames", () => {
    describe("tags an entry as not a game when 'dlc' keyword is the last word", () => {
      let games;

      beforeAll(() => {
        const game = {
          appid: 1900190,
          name: "BLACKJACK and WAIFUS 18+ DLC",
        };
        games = filterNonGames([game]);
      });

      it("adds isGame=false if name includes 'dlc' keyword", () => {
        expect(games[0].isGame).toBeFalse();
      });
    });

    describe("tags an entry as not a game when 'soundtrack' keyword is the last word", () => {
      let games;

      beforeAll(() => {
        const game = {
          appid: 1902590,
          name: "Logic World Soundtrack",
        };
        games = filterNonGames([game]);
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
        games = filterNonGames([game]);
      });

      it("does not add isGame property", () => {
        expect(games[0].isGame).toBeUndefined();
      });
    });

    describe("tags every game as not a game which contains the keywords 'dlc' or 'soundtrack' as the last word", () => {
      let games;

      beforeAll(() => {
        games = filterNonGames(gamesMock);
      });

      it("adds isGame=false to 15 games", () => {
        const isGameFalseCounter = games.filter(
          (games) => games.isGame !== undefined
        ).length;
        expect(isGameFalseCounter).toBe(15);
      });
    });
  });
});
