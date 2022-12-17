import { Game } from "./game.js";
import { PlayerHistory } from "./player.history.js";
import { TrackedPlayers } from "./tracked.players.js";

describe("game.js", function () {
  describe("Game", function () {
    describe(".fromSteamApp", function () {
      describe("is called with no arguments, ", function () {
        it("an Error is thrown", function () {
          expect(Game.fromSteamApp).toThrowError();
        });
      });

      describe("is called with incomplete arguments, ", function () {
        beforeEach(function () {
          this.testObject = {
            id: 123,
            name: "test game",
          };
        });

        it("an Error is thrown", function () {
          expect(Game.fromSteamApp.bind(this.testObject)).toThrowError();
        });
      });

      describe("is called with appropriate attributes, the returned value", function () {
        beforeEach(function () {
          this.testObject = {
            appid: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          };

          this.result = Game.fromSteamApp(this.testObject);
        });

        it("is an instance of Game", function () {
          expect(this.result).toBeInstanceOf(Game);
        });

        it("has an 'id' property which equals 123", function () {
          expect(this.result.id).toBe(this.testObject.appid);
        });

        it("has a 'name' property which equals 'test game'", function () {
          expect(this.result.name).toBe(this.testObject.name);
        });

        it("has an 'imageUrl' property which equals a link", function () {
          expect(this.result.imageUrl).toBe(
            `https://cdn.akamai.steamstatic.com/steam/apps/${this.testObject.appid}/header.jpg`,
          );
        });

        it("has a 'playerHistory' property which equals an empty array", function () {
          expect(this.result.playerHistory).toEqual(this.testObject.playerHistory);
        });
      });
    });

    describe(".fromDbEntry", function () {
      describe("is called with no arguments, ", function () {
        it("an Error is thrown", function () {
          expect(Game.fromDbEntry).toThrowError();
        });
      });

      describe("is called with incomplete arguments, ", function () {
        beforeEach(function () {
          this.testObject = {
            id: 123,
            name: "test game",
          };
        });

        it("an Error is thrown", function () {
          expect(Game.fromDbEntry.bind(this.testObject)).toThrowError();
        });
      });

      describe("is called with appropriate attributes, the returned value", function () {
        beforeEach(function () {
          this.testObject = {
            id: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          };

          this.result = Game.fromDbEntry(this.testObject);
        });

        it("is an instance of Game", function () {
          expect(this.result).toBeInstanceOf(Game);
        });

        it("has an 'id' property which equals 123", function () {
          expect(this.result.id).toBe(this.testObject.id);
        });

        it("has a 'name' property which equals 'test game'", function () {
          expect(this.result.name).toBe(this.testObject.name);
        });

        it("has an 'imageUrl' property which equals 'test url'", function () {
          expect(this.result.imageUrl).toBe(this.testObject.imageUrl);
        });

        it("has a 'playerHistory' property which equals an empty array", function () {
          expect(this.result.playerHistory).toEqual(this.testObject.playerHistory);
        });
      });
    });

    describe(".addOnePlayerHistoryEntry adds a trackedPlayers entry to the correct playerHistory array entry.", function () {
      describe("When this month's entry already exists,", function () {
        describe("players get added into the existing playerHistory entry.", function () {
          beforeEach(function () {
            this.currentPlayers = 45;
            this.playerHistory = [
              {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                averagePlayers: 0,
                trackedPlayers: [],
              },
            ];

            this.game = {
              id: 1,
              name: "Test Game",
              playerHistory: PlayerHistory.manyFromDbEntry(this.playerHistory),
            };

            this.result = Game.fromDbEntry(this.game);

            this.result.addOnePlayerHistoryEntry(this.currentPlayers);
          });

          it("The resulting object's playerHistory value is an instance of Players.", function () {
            expect(this.result.playerHistory[0]).toBeInstanceOf(PlayerHistory);
          });
          it("The resulting object has a property called players, which equals 45", function () {
            expect(this.result.playerHistory[0].trackedPlayers[0].players).toBe(45);
          });
        });
      });

      describe("When this month's entry does not exist yet", function () {
        describe("players get added into a new playerHistory entry.", function () {
          beforeEach(function () {
            this.currentPlayers = 33;
            this.playerHistory = [
              {
                year: "2022",
                month: "10",
                averagePlayers: 75,
                trackedPlayers: [],
              },
            ];

            this.game = {
              id: 1,
              name: "Test Game",
              playerHistory: PlayerHistory.manyFromDbEntry(this.playerHistory),
            };

            this.result = Game.fromDbEntry(this.game);

            this.result.addOnePlayerHistoryEntry(this.currentPlayers);
          });

          it("The resulting object's playerHistory value has a length of 2", function () {
            expect(this.result.playerHistory.length).toBe(2);
          });
          it("The resulting object's second playerHistory entry has a property called players, which equals 33", function () {
            expect(this.result.playerHistory[1].trackedPlayers[0].players).toBe(33);
          });
        });
      });
    });

    describe(".addHistoriesFromSteamcharts", function () {
      describe("adds a game's Steamcharts history entries in the correct format. ", function () {
        beforeEach(function () {
          this.steamApp = {
            appid: 1,
            name: "Test Game",
          };

          this.result = Game.fromSteamApp(this.steamApp);

          this.result.addOnePlayerHistoryEntry(513);

          this.gameHistories = [
            {
              year: "2020",
              month: "5",
              averagePlayers: 5,
              trackedPlayers: [new TrackedPlayers("5", "April 2020")],
            },
            {
              year: "2020",
              month: "7",
              averagePlayers: 15,
              trackedPlayers: [new TrackedPlayers("15", "July 2020")],
            },
            {
              year: "2020",
              month: "3",
              averagePlayers: 55,
              trackedPlayers: [new TrackedPlayers("55", "February 2020")],
            },
          ];

          this.result.addHistoriesFromSteamcharts(this.gameHistories);
        });

        it("The resulting object's playerHistory array has a length of 4", function () {
          expect(this.result.playerHistory.length).toBe(4);
        });
        it("The resulting object's playerHistory array is in the correct order", function () {
          expect(this.result.playerHistory[0].averagePlayers).toBe(55);
          expect(this.result.playerHistory[1].averagePlayers).toBe(5);
          expect(this.result.playerHistory[2].averagePlayers).toBe(15);
          expect(this.result.playerHistory[3].averagePlayers).toBe(513);
        });
      });
    });
  });
});
