import { getParsedHtmlPage } from "../../../assets/html.details.pages.mock.js";
import { crusaderKingsDetailsPage } from "../../../assets/steam-details-pages/crusader.kings.multiple.developers.html.details.page.js";
import { feartressGameHtmlDetailsPage } from "../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { mortalDarknessGameHtmlDetailsPage } from "../../../assets/steam-details-pages/mortal.darkness.game.html.details.page.js";
import { riskOfRainHtmlDetailsPageMissingInfo } from "../../../assets/steam-details-pages/risk.of.rain.missing.additional.info.page.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { eldenRingHtmlDetailsPageDb } from "../../../assets/steamdb-details-pages/elden.ring.html.details.page.js";
import { karmazooHtmlDetailsPageSteamDb } from "../../../assets/steamdb-details-pages/karmazoo.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import { Game } from "./game.js";
import {
  getOneGameWithPlayerHistory,
  getOneSteamAppInstantiatedGame,
  getXGamesWithoutDetails,
} from "./game.mocks.js";
import { PlayerHistory } from "./player.history.js";
import { getXSampleSteamApps } from "./steam.app.mocks.js";

describe("Game", function () {
  describe(".copy", function () {
    beforeAll(function () {
      this.game = getOneGameWithPlayerHistory();
      this.result = this.game.copy();

      this.game.id = 99;
    });

    it("the result is a copy of game", function () {
      expect(this.result).toBeInstanceOf(Game);
      expect(this.result.playerHistory[0]).toBeInstanceOf(PlayerHistory);
    });

    it("the result has the correct values", function () {
      expect(this.result.id).toBe(239140);
      expect(this.result.name).toBe("Dying Light");
      expect(this.result.releaseDate).toBe("21.09.1989");
      expect(this.result.developers).toEqual(["Techland"]);
      expect(this.result.genres).toEqual(["Action", "RPG"]);
      expect(this.result.description).toBe("Best game");
    });
  });

  describe(".fromSteamApp", function () {
    describe("when the method is called", function () {
      beforeAll(function () {
        const steamApp = getXSampleSteamApps(1)[0];
        const page = getParsedHtmlPage(feartressGameHtmlDetailsPage);

        this.result = Game.fromSteamApp(steamApp, page);
      });

      it("is an instance of Game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("the game has the correct values", function () {
        expect(this.result.id).toBe(1);
        expect(this.result.name).toBe("Game #1");
        expect(this.result.releaseDate).toEqual(new Date("Jan 1 2001 UTC"));
        expect(this.result.developers).toEqual(["Frederik List", "Aaron Miles"]);
        expect(this.result.imageUrl).toBe(
          `https://cdn.akamai.steamstatic.com/steam/apps/1/header.jpg`,
        );
        expect(this.result.playerHistory).toEqual([]);
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
      beforeAll(function () {
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
      beforeAll(function () {
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
      beforeAll(function () {
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
      beforeAll(function () {
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
        beforeAll(function () {
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
        beforeAll(function () {
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
    beforeAll(function () {
      const steamApp = getXSampleSteamApps(1);

      this.result = Game.fromSteamcharts(steamApp);

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

  describe(".getReleaseDate", function () {
    describe("if the provided HTML page does not include a release date section,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getReleaseDate(page);
      });

      it("the result is an empty string", function () {
        expect(this.result).toBe("");
      });
    });

    describe("if the provided HTML page includes a release date,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(mortalDarknessGameHtmlDetailsPage);

        this.result = game.getReleaseDate(page);
      });

      it("the result is a date", function () {
        expect(this.result).toBeInstanceOf(Date);
      });
      it("the result is the correct date'", function () {
        expect(this.result.toISOString()).toEqual("2023-08-01T00:00:00.000Z");
      });
    });
  });

  describe(".getDevelopers", function () {
    describe("if the provided HTML page does not include any developers,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getDevelopers(page);
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("if the provided HTML page includes one developer,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(mortalDarknessGameHtmlDetailsPage);

        this.result = game.getDevelopers(page);
      });

      it("the result is 'Dark Faction Games'", function () {
        expect(this.result).toEqual(["Dark Faction Games"]);
      });
    });

    describe("if the provided HTML page includes two developers,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(crusaderKingsDetailsPage);

        this.result = game.getDevelopers(page);
      });

      it("the result has the correct values", function () {
        expect(this.result).toEqual(["Paradox Development Studio", "Paradox Thalassic"]);
      });
    });
  });

  describe(".getGenres", function () {
    describe("if the provided HTML page does not include any genres,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getGenres(page);
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });

    describe("if the provided HTML page includes genres,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(mortalDarknessGameHtmlDetailsPage);

        this.result = game.getGenres(page);
      });

      it("the result has the correct values", function () {
        expect(this.result).toEqual(["Action", "Adventure", "Indie", "RPG"]);
      });
    });
  });

  describe(".getDescription", function () {
    describe("if the provided HTML page does not include a game description,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getDescription(page);
      });

      it("the result is an empty string", function () {
        expect(this.result).toEqual("");
      });
    });

    describe("if the provided HTML page includes a description,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(mortalDarknessGameHtmlDetailsPage);

        this.result = game.getDescription(page);
      });

      it("the resulting is a specific string", function () {
        expect(this.result).toBe(
          "“One grim dawn and noble I wake, The darkness is rampant, our oath shall break. A noble warrior soon shall rise, and clear the air of the darkened skies.”",
        );
      });
    });
  });

  describe(".updateGameDetails", function () {
    describe("When we try to update a game's details", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        const page = getParsedHtmlPage(karmazooHtmlDetailsPageSteamDb);

        this.game.updateGameDetails(page);
      });

      it("the game's details are updated", function () {
        expect(this.game.developers).toEqual(["Pastagames"]);
        expect(this.game.genres).toEqual(["Action", "Casual"]);
        expect(this.game.description).toEqual(
          "Share the love and die trying! KarmaZoo is a joyful, altruistic, cooperative platformer where up to 10 random players help each other with the unique abilities of 50 different characters - all for the sake of good Karma.",
        );
      });
    });
  });

  describe(".updateDevelopers", function () {
    describe("When we try to update a game with existing developers", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        this.developers = ["Valve", "Hopoo Games"];

        this.game.developers = this.developers;

        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.game.updateDevelopers(page);
      });

      it("the game's developers stays unchanged", function () {
        expect(this.game.developers).toBe(this.developers);
      });
    });

    describe("When we try to update a game with no existing developers", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        const page = getParsedHtmlPage(eldenRingHtmlDetailsPageDb);

        this.game.updateDevelopers(page);
      });

      it("the game's developers are updated", function () {
        expect(this.game.developers).toEqual(["FromSoftware Inc."]);
      });
    });
  });

  describe(".updateGenres", function () {
    describe("When we try to update a game with existing genres", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        this.genres = ["Action", "RPG"];

        this.game.genres = this.genres;

        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.game.updateGenres(page);
      });

      it("the game's genres stays unchanged", function () {
        expect(this.game.genres).toBe(this.genres);
      });
    });

    describe("When we try to update a game with no existing genres", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        const page = getParsedHtmlPage(karmazooHtmlDetailsPageSteamDb);

        this.game.updateGenres(page);
      });

      it("the game's genres are updated", function () {
        expect(this.game.genres).toEqual(["Action", "Casual"]);
      });
    });
  });

  describe(".updateDescription", function () {
    describe("When we try to update a game with an existing description", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        this.description = "Test description";

        this.game.description = this.description;

        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.game.updateDescription(page);
      });

      it("the game's description stays unchanged", function () {
        expect(this.game.description).toBe(this.description);
      });
    });

    describe("When we try to update a game with no existing genres", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        const page = getParsedHtmlPage(karmazooHtmlDetailsPageSteamDb);

        this.game.updateDescription(page);
      });

      it("the game's description is updated", function () {
        expect(this.game.description).toEqual(
          "Share the love and die trying! KarmaZoo is a joyful, altruistic, cooperative platformer where up to 10 random players help each other with the unique abilities of 50 different characters - all for the sake of good Karma.",
        );
      });
    });
  });

  describe(".updateReleaseDate", function () {
    describe("When we try to update the date of a game with an existing release date,", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];
        this.date = new Date("23 July 2023");

        this.game.releaseDate = this.date;

        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.game.updateReleaseDate(page);
      });

      it("a game is returned.", function () {
        expect(this.game).toBeInstanceOf(Game);
      });

      it("the game's release date stays unchanged", function () {
        expect(this.game.releaseDate).toBe(this.date);
      });
    });

    describe("When we try to use a page that has no release date", function () {
      beforeAll(function () {
        this.game = getXGamesWithoutDetails(1)[0];

        const page = getParsedHtmlPage(karmazooHtmlDetailsPageSteamDb);

        this.game.updateReleaseDate(page);
      });

      it("a game is returned.", function () {
        expect(this.game).toBeInstanceOf(Game);
      });

      it("the game's release date stays empty", function () {
        expect(this.game.releaseDate).toBe("");
      });
    });
  });

  describe(".getSteamDbDevelopers.", function () {
    describe("When we provide a html page that contains two developers,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(counterStrikeHtmlDetailsSteamDb);

        this.result = game.getSteamDbDevelopers(page);
      });

      it("two developers are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the developer is 'Valve'", function () {
        expect(this.result[0]).toBe("Valve");
      });

      it("the developer is 'Hidden Path Entertainment'", function () {
        expect(this.result[1]).toBe("Hidden Path Entertainment");
      });
    });

    describe("When we provide a html page that doesn't contain a developer section", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getSteamDbDevelopers(page);
      });

      it("an empty array is returned", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbGenres.", function () {
    describe("When we provide a html page that contains the genres,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.result = game.getSteamDbGenres(page);
      });

      it("two genres are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first genre is 'Action'", function () {
        expect(this.result[0]).toBe("Action");
      });

      it("the second genre is 'Indie'", function () {
        expect(this.result[1]).toBe("Indie");
      });
    });

    describe("When we provide a html page that doesn't contain a genres section,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getSteamDbGenres(page);
      });

      it("an empty array is returned", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbDescription.", function () {
    describe("When we provide a html page that contains the description,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.result = game.getSteamDbDescription(page);
      });

      it("the returned value is the game's description'", function () {
        expect(this.result).toEqual(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });

    describe("When we provide a html page that doesn't contain a description section,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getSteamDbDescription(page);
      });

      it("an empty string is returned", function () {
        expect(this.result).toEqual("");
      });
    });
  });

  describe(".getSteamDbReleaseDate.", function () {
    describe("When we provide a html page that doesn't contain a valid release date,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(karmazooHtmlDetailsPageSteamDb);

        this.result = game.getSteamDbReleaseDate(page);
      });

      it("an empty string is returned", function () {
        expect(this.result).toBe("");
      });
    });

    describe("When we provide a html page that doesn't contain a date section", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = game.getSteamDbReleaseDate(page);
      });

      it("an empty string is returned", function () {
        expect(this.result).toBe("");
      });
    });

    describe("When we provide a html page that contains a valid release date,", function () {
      beforeAll(function () {
        const game = getXGamesWithoutDetails(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.result = game.getSteamDbReleaseDate(page);
      });

      it("the correct date is returned", function () {
        expect(this.result).toEqual(new Date("11 August 2020 UTC"));
      });
    });
  });
});
