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

    describe(".pushCurrentPlayers creates a new player history entry or updates an existing one.", function () {
      describe("When this month's player history entry already exists,", function () {
        describe("players are added to the existing entry.", function () {
          beforeEach(function () {
            this.currentPlayers = 45;

            const playerHistory = [
              {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                averagePlayers: 0,
                trackedPlayers: [],
              },
            ];

            this.historyLength = playerHistory.length;

            const game = {
              id: 1,
              name: "Test Game",
              playerHistory: PlayerHistory.manyFromDbEntry(playerHistory),
            };

            this.result = Game.fromDbEntry(game);

            this.result.pushCurrentPlayers(this.currentPlayers);
          });

          it("No new entry is created", function () {
            expect(this.result.playerHistory.length).toBe(this.historyLength);
          });
          it("The existing entry is updated.", function () {
            expect(this.result.playerHistory[0]).toBeInstanceOf(PlayerHistory);
            expect(this.result.playerHistory[0].trackedPlayers[0].players).toBe(
              this.currentPlayers,
            );
          });
        });
      });

      fdescribe("When this month's player history entry does not exist yet", function () {
        describe("An entry for the current month is created. So,", function () {
          beforeEach(function () {
            this.currentPlayers = 33;

            const playerHistory = [
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
              playerHistory: PlayerHistory.manyFromDbEntry(playerHistory),
            };

            this.result = Game.fromDbEntry(this.game);

            this.result.pushCurrentPlayers(this.currentPlayers);
            debugger;
          });

          it("this month's entry is created", function () {
            expect(this.result.playerHistory.length).toBe(2);
            expect(this.result.playerHistory[1]).toBeInstanceOf(PlayerHistory);
          });
          it("the resulting object's second playerHistory entry has a property called players, which equals 33", function () {
            expect(this.result.playerHistory[1].trackedPlayers[0].players).toBe(
              this.currentPlayers,
            );
          });
          it("the existing entry does not change", function () {
            expect(this.game.playerHistory[0]).toEqual(this.result.playerHistory[0]);
          });
        });
      });
    });

    describe(".pushSteamchartsPlayerHistory adds player histories from Steamcharts to existing entries while keeping the order intact.", function () {
      beforeEach(function () {
        const steamApp = {
          appid: 1,
          name: "Test Game",
        };

        this.result = Game.fromSteamApp(steamApp);

        this.result.pushCurrentPlayers(513);

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

        this.result.pushSteamchartsPlayerHistory(this.gameHistories);

        this.gameHistories[0].month = "55";
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
      it("The resulting object's playerHistory array is in the correct order", function () {
        expect(this.result.playerHistory[0].averagePlayers).toBe(55);
        expect(this.result.playerHistory[1].averagePlayers).toBe(5);
        expect(this.result.playerHistory[2].averagePlayers).toBe(15);
        expect(this.result.playerHistory[3].averagePlayers).toBe(513);
      });
      it("The resulting object's playerHistory array does not change when changing the original playerHistory array", function () {
        expect(this.gameHistories[0].month).toBe("55");
        expect(this.result.playerHistory[0].month).toBe("3");
      });
    });
  });
});
