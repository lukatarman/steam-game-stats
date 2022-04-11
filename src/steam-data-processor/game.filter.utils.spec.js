import { gamesMock } from "../../assets/small.data.set.js";
import { checkIfIncludesKeywords, tagNonGames } from "./game.filter.utils.js";

describe("game.filter.utils.js", () => {
  describe(".checkIfIncludesKeywords", () => {
    describe("if steamApp.name string ends with 'DLC' keyword", () => {
      let includesKeyword;

      beforeAll(() => {
        const steamApp = {
          appid: 1234,
          name: "Holy smokes DLC",
        };
        includesKeyword = checkIfIncludesKeywords(steamApp);
      });

      it("function checkIfIncludesKeywords returns true", () => {
        expect(includesKeyword).toBeTrue();
      });
    });

    describe("if steamApp.name string ends with 'soundtrack' keyword", () => {
      let includesKeyword;

      beforeAll(() => {
        const steamApp = {
          appid: 1235,
          name: "The Mire Soundtrack",
        };
        includesKeyword = checkIfIncludesKeywords(steamApp);
      });

      it("function checkIfIncludesKeywords returns true", () => {
        expect(includesKeyword).toBeTrue();
      });
    });

    describe("if steamApp.name string does not end with dlc or soundtrack keyword", () => {
      let includesKeyword;

      beforeAll(() => {
        const steamApp = {
          appid: 1236,
          name: "Fantasy Grounds - Deneb Adventure 1: The Lost Duke",
        };
        includesKeyword = checkIfIncludesKeywords(steamApp);
      });

      it("function checkIfIncludesKeywords returns false", () => {
        expect(includesKeyword).toBe(false);
      });
    });

    //   describe("tags an entry as not a game when 'dlc' keyword is the last word", () => {
    //     let games;

    //     beforeAll(() => {
    //       const game = {
    //         appid: 1900190,
    //         name: "BLACKJACK and WAIFUS 18+ DLC",
    //       };
    //       games = filterNonGames([game]);
    //     });

    //     it("adds isGame=false if name includes 'dlc' keyword", () => {
    //       expect(games[0].isGame).toBeFalse();
    //     });
    //   });

    //   describe("tags an entry as not a game when 'soundtrack' keyword is the last word", () => {
    //     let games;

    //     beforeAll(() => {
    //       const game = {
    //         appid: 1902590,
    //         name: "Logic World Soundtrack",
    //       };
    //       games = filterNonGames([game]);
    //     });

    //     it("adds isGame=false if name includes 'soundtrack' keyword", () => {
    //       expect(games[0].isGame).toBeFalse();
    //     });
    //   });

    //   describe("does not tag if the name contains no keywords", () => {
    //     let games;

    //     beforeAll(() => {
    //       const game = {
    //         appid: 1902630,
    //         name: "Lighthouse of Madness Playtest",
    //       };
    //       games = filterNonGames([game]);
    //     });

    //     it("does not add isGame property", () => {
    //       expect(games[0].isGame).toBeUndefined();
    //     });
    //   });

    //   describe("tags every game as not a game which contains the keywords 'dlc' or 'soundtrack' as the last word", () => {
    //     let games;

    //     beforeAll(() => {
    //       games = filterNonGames(gamesMock);
    //     });

    //     it("adds isGame=false to 15 games", () => {
    //       const isGameFalseCounter = games.filter(
    //         (games) => games.isGame !== undefined
    //       ).length;
    //       expect(isGameFalseCounter).toBe(15);
    //     });
    //   });
    // });

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

        it("adds isGame=false to 28 games", () => {
          const isGameFalseCounter = games.filter(
            (games) => games.isGame !== undefined
          ).length;
          expect(isGameFalseCounter).toBe(28);
        });
      });
    });
  });
});
