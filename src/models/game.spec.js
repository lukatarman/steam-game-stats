import { Game } from "./game.js";
import { PlayerHistory } from "./player.history.js";

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

          this.releaseDate = "24.08.2023";

          this.developers = ["Two Giants Studios"];

          this.genres = ["Action", "Adventure"];

          this.description = ["A game description"];

          this.result = Game.fromSteamApp(
            this.testObject,
            this.releaseDate,
            this.developers,
            this.genres,
            this.description,
          );
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

        it("has a 'releaseDate' property which equals '24.08.2023", function () {
          expect(this.result.releaseDate).toBe(this.releaseDate);
        });

        it("has a 'developers' property which is an array with a length of 1", function () {
          expect(this.result.developers.length).toBe(1);
        });

        it("has a 'developers' property which equals 'Two Giants Studios'", function () {
          expect(this.result.developers[0]).toBe(this.developers[0]);
        });

        it("has a 'genres' property which is an array with a length of 2", function () {
          expect(this.result.genres.length).toBe(2);
        });

        it("'s first value of the genres property equals 'Action'", function () {
          expect(this.result.genres[0]).toBe(this.genres[0]);
        });

        it("'s second value of the genres property equals 'Adventure'", function () {
          expect(this.result.genres[1]).toBe(this.genres[1]);
        });

        it("has a 'description' property which equals 'A game description'", function () {
          expect(this.result.description).toBe(this.description);
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

      describe("is called with appropriate attributes, but the releaseDate and Developers are empty the returned value", function () {
        beforeEach(function () {
          this.testObject = {
            appid: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          };

          this.releaseDate = "";
          this.developers = [];

          this.result = Game.fromSteamApp(
            this.testObject,
            this.releaseDate,
            this.developers,
          );
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

        it("has a 'releaseDate' property which equals an empty string", function () {
          expect(this.result.releaseDate).toBe("");
        });

        it("has a 'developers' property which equals an empty array", function () {
          expect(this.result.developers).toEqual([]);
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

    describe(".fromSteamcharts", function () {
      describe("is called with no arguments, ", function () {
        it("an Error is thrown", function () {
          expect(Game.fromSteamcharts).toThrowError();
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
          expect(Game.fromSteamcharts.bind(this.testObject)).toThrowError();
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

          this.result = Game.fromSteamcharts(this.testObject);
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

        it("has a 'releaseDate' property which equals an empty string", function () {
          expect(this.result.releaseDate).toBe("");
        });

        it("has a 'developers' property which equals an empty array", function () {
          expect(this.result.developers).toEqual([]);
        });

        it("has a 'genres' property which equals an empty array", function () {
          expect(this.result.genres).toEqual([]);
        });

        it("has a 'description' property which equals an empty string", function () {
          expect(this.result.description).toEqual("");
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
            releaseDate: "3 Mar, 2022",
            developers: ["Crossplatform"],
            genres: ["Action", "Adventure"],
            description: "A game's description",
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

        it("has a 'releaseDate' property which equals '3 Mar, 2022", function () {
          expect(this.result.releaseDate).toBe("3 Mar, 2022");
        });

        it("has a 'developers' property which equals 'Crossplatform", function () {
          expect(this.result.developers[0]).toBe("Crossplatform");
        });

        it("has a 'genres' property which is an array with a length of 2", function () {
          expect(this.result.genres.length).toBe(2);
        });

        it("first genres value equals 'Action'", function () {
          expect(this.result.genres[0]).toBe("Action");
        });

        it("second genres value equals 'Adventure'", function () {
          expect(this.result.genres[1]).toBe("Adventure");
        });

        it("has a 'description' property which equals 'A game's description'", function () {
          expect(this.result.description).toBe("A game's description");
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

      describe("When this month's player history entry does not exist yet", function () {
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
          });

          it("this month's entry is created", function () {
            expect(this.result.playerHistory.length).toBe(2);
            expect(this.result.playerHistory[1]).toBeInstanceOf(PlayerHistory);
          });

          it("the last time we checked the game was played by 33 players", function () {
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

        this.releaseDate = "";
        this.developers = [];

        this.result = Game.fromSteamApp(steamApp, this.releaseDate, this.developers);

        this.result.pushCurrentPlayers(513);

        const gameHistories = [];
        gameHistories.push(PlayerHistory.fromRawData(5, "April 2020"));
        gameHistories.push(PlayerHistory.fromRawData(15, "July 2020"));
        gameHistories.push(PlayerHistory.fromRawData(55, "February 2020"));

        this.result.pushSteamchartsPlayerHistory(gameHistories);
      });

      it("The result is an instance of Game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("The result has a property release date, which equals an empty string", function () {
        expect(this.result.releaseDate).toBe("");
      });

      it("The result has a property developers, which equals an empty array", function () {
        expect(this.result.developers).toEqual([]);
      });

      it("The game has three new player history entries", function () {
        expect(this.result.playerHistory.length).toBe(4);
      });

      it("All player history entries are in correct order", function () {
        expect(this.result.playerHistory[0].averagePlayers).toBe(55);
        expect(this.result.playerHistory[1].averagePlayers).toBe(5);
        expect(this.result.playerHistory[2].averagePlayers).toBe(15);
        expect(this.result.playerHistory[3].averagePlayers).toBe(513);
      });

      it("The games player history entries are new PlayerHistory class instances", function () {
        expect(this.result.playerHistory[0]).toBeInstanceOf(PlayerHistory);
        expect(this.result.playerHistory[1]).toBeInstanceOf(PlayerHistory);
        expect(this.result.playerHistory[2]).toBeInstanceOf(PlayerHistory);
        expect(this.result.playerHistory[3]).toBeInstanceOf(PlayerHistory);
      });
    });
  });

  describe(".updateMissingProperties updates the game with the provided properties.", function () {
    describe("When all the properties are provided", function () {
      beforeEach(function () {
        const steamApp = {
          appid: 1,
          name: "Test Game",
          releaseDate: "",
          developers: [],
          genres: [],
          description: "",
        };

        this.propertiesObject = {
          releaseDate: new Date("23 July 2023"),
          developers: ["Valve", "Hopoo Games"],
          genres: ["Action", "RPG"],
          description: "This game is awesome!",
        };

        const game = Game.fromSteamApp(steamApp);
        this.result = game.updateMissingProperties(this.propertiesObject);
      });

      it("The result is an instance of Game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("All the provided properties are added to the game", function () {
        expect(this.result.releaseDate).toBe(this.propertiesObject.releaseDate);
        expect(this.result.developers).toEqual(this.propertiesObject.developers);
        expect(this.result.genres).toEqual(this.propertiesObject.genres);
        expect(this.result.description).toBe(this.propertiesObject.description);
      });
    });

    describe("When no new properties are provided", function () {
      beforeEach(function () {
        const steamApp = {
          appid: 1,
          name: "Test Game",
        };

        const releaseDate = "";
        const developers = [];
        const genres = [];
        const description = "";

        const propertiesObject = {
          releaseDate: "",
          developers: [],
          genres: [],
          description: "",
        };

        this.game = Game.fromSteamApp(
          steamApp,
          releaseDate,
          developers,
          genres,
          description,
        );

        this.result = this.game.updateMissingProperties(propertiesObject);
      });

      it("The result is an instance of Game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("The game's properties stay unchanged.", function () {
        expect(this.result.releaseDate).toBe(this.game.releaseDate);
        expect(this.result.developers).toEqual(this.game.developers);
        expect(this.result.genres).toEqual(this.game.genres);
        expect(this.result.description).toBe(this.game.description);
      });
    });
  });
});
