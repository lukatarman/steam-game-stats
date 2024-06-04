import { getParsedHtmlPage } from "../../../assets/html.details.pages.mock.js";
import { eldenRingSteamApiData } from "../../../assets/steam-api-responses/elden.ring.js";
import { crusaderKingsDetailsPage } from "../../../assets/steam-web-html-details-pages/crusader.kings.multiple.developers.html.details.page.js";
import { eldenRingGameHtmlDetailsPage } from "../../../assets/steam-web-html-details-pages/elden.ring.game.html.details.page.js";
import { riskOfRainHtmlDetailsPageMissingInfo } from "../../../assets/steam-web-html-details-pages/risk.of.rain.missing.additional.info.page.js";
import { Game } from "./game.js";
import {
  getEldenRingGameWithDetails,
  getXGamesWithDetails,
  getXGamesWithoutDetails,
} from "./game.mocks.js";
import { PlayerHistory } from "./player.history.js";
import { getSamplePlayerHistory } from "./player.history.mocks.js";
import { getEldenRingSteamApp, getXSampleSteamApps } from "./steam.app.mocks.js";
import { getRawSteamApiApp, getXSampleRawSteamApiApps } from "./steam.app.raw.mock.js";

describe("Game", function () {
  describe(".copy", function () {
    beforeAll(function () {
      this.game = getEldenRingGameWithDetails(true);
      this.result = this.game.copy();

      this.game.id = 99;
    });

    it("the result is a copy of game", function () {
      expect(this.result).toBeInstanceOf(Game);
      expect(this.result.playerHistory[0]).toBeInstanceOf(PlayerHistory);
    });

    it("the copy has identical values to the original", function () {
      expect(this.result).toEqual(getEldenRingGameWithDetails(true));
    });
  });

  describe(".fromSteamApp", function () {
    describe("when the method is called", function () {
      beforeAll(function () {
        const steamApp = getEldenRingSteamApp;
        const page = getParsedHtmlPage(eldenRingGameHtmlDetailsPage);

        this.result = Game.fromSteamApp(steamApp, page);
      });

      it("the game has the correct values", function () {
        expect(this.result).toEqual(getEldenRingGameWithDetails());
      });
    });

    describe("if the provided HTML page does not include any developers,", function () {
      beforeAll(function () {
        const steamApp = getXSampleSteamApps(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = Game.fromSteamApp(steamApp, page);
      });

      it("the result is an instance of game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("the games developers do not get updated", function () {
        expect(this.result.developers).toEqual([]);
      });
    });

    describe("if the provided HTML page includes two developers,", function () {
      beforeAll(function () {
        const steamApp = getXSampleSteamApps(1)[0];
        const page = getParsedHtmlPage(crusaderKingsDetailsPage);

        this.result = Game.fromSteamApp(steamApp, page);
      });

      it("the result is an instance of game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("the game's developers get updated with the correct values", function () {
        expect(this.result.developers).toEqual([
          "Paradox Development Studio",
          "Paradox Thalassic",
        ]);
      });
    });

    describe("if the provided HTML page does not include any genres,", function () {
      beforeAll(function () {
        const steamApp = getXSampleSteamApps(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = Game.fromSteamApp(steamApp, page);
      });

      it("the result is an instance of game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("the game's genres do not get updated", function () {
        expect(this.result.genres).toEqual([]);
      });
    });

    describe("if the provided HTML page does not include a game description,", function () {
      beforeAll(function () {
        const steamApp = getXSampleSteamApps(1)[0];
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = Game.fromSteamApp(steamApp, page);
      });

      it("the result is an instance of game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("the game's description does not get updated", function () {
        expect(this.result.description).toEqual("");
      });
    });
  });

  describe(".fromSteamApi", function () {
    describe("when the method is called", function () {
      beforeAll(function () {
        this.expectedResult = getEldenRingGameWithDetails();
        this.result = Game.fromSteamApi(getRawSteamApiApp(eldenRingSteamApiData));
      });

      it("is an instance of Game", function () {
        expect(this.result).toBeInstanceOf(Game);
      });

      it("the game has the correct values", function () {
        expect(this.result).toEqual(this.expectedResult);
      });
    });

    describe("if the provided steam api app doesn't include developers", function () {
      beforeAll(function () {
        this.result = Game.fromSteamApi(getXSampleRawSteamApiApps(1)[0]);
      });

      it("the game's developers will be set to an empty array", function () {
        expect(this.result.developers).toEqual([]);
      });
    });

    describe("if the provided steam api app doesn't include genres", function () {
      beforeAll(function () {
        this.result = Game.fromSteamApi(getXSampleRawSteamApiApps(1)[0]);
      });

      it("the game's genres will be set to an empty array", function () {
        expect(this.result.genres).toEqual([]);
      });
    });

    describe("if the provided steam api app doesn't include a description", function () {
      beforeAll(function () {
        this.result = Game.fromSteamApi(getXSampleRawSteamApiApps(1)[0]);
      });

      it("the game's description will be set to an empty string", function () {
        expect(this.result.description).toBe("");
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
          releaseDate: {
            date: "3 Mar, 2022",
            comingSoon: false,
          },
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
        expect(this.result.releaseDate.date).toBe("3 Mar, 2022");
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
          jasmine.clock().install();
          jasmine.clock().mockDate(new Date("May 2024"));
          this.result = getXGamesWithDetails(1)[0];

          this.result.playerHistory = getSamplePlayerHistory();

          this.result.pushCurrentPlayers(45);
        });

        afterAll(function () {
          jasmine.clock().uninstall();
        });

        it("No new entry is created", function () {
          expect(this.result.playerHistory.length).toBe(1);
        });

        it("The existing entry is updated with the added players.", function () {
          expect(this.result.playerHistory[0]).toBeInstanceOf(PlayerHistory);
          expect(this.result.playerHistory[0].trackedPlayers[2].players).toBe(45);
        });
      });
    });

    describe("When this month's player history entry does not exist yet", function () {
      describe("An entry for the current month is created. So,", function () {
        beforeAll(function () {
          this.result = getXGamesWithDetails(1)[0];

          this.result.pushCurrentPlayers(33);
        });

        it("this month's entry is created", function () {
          expect(this.result.playerHistory.length).toBe(1);
          expect(this.result.playerHistory[0]).toBeInstanceOf(PlayerHistory);
        });

        it("the last time we checked the game was played by 33 players", function () {
          expect(this.result.playerHistory[0].trackedPlayers[0].players).toBe(33);
        });
      });
    });
  });

  describe(".pushSteamchartsPlayerHistory adds player histories from Steamcharts to existing entries while keeping the order intact.", function () {
    beforeAll(function () {
      this.result = getXGamesWithoutDetails(1)[0];

      this.result.pushCurrentPlayers(513);

      const gameHistories = [];
      gameHistories.push(PlayerHistory.fromRawData(5, "April 2020"));
      gameHistories.push(PlayerHistory.fromRawData(15, "July 2020"));
      gameHistories.push(PlayerHistory.fromRawData(55, "February 2020"));

      this.result.pushSteamchartsPlayerHistory(gameHistories);
    });

    it("The game has four player history entries", function () {
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

  describe(".updateReleaseDateViaSteamApi", function () {
    describe("If the passed in date is null", function () {
      beforeAll(function () {
        this.existingDate = new Date("September 2, 2002");
        this.game = getXGamesWithoutDetails(1)[0];
        this.game.releaseDate = this.existingDate;

        this.game.updateReleaseDateViaSteamApi(null);
      });

      it("the game's release date stays unchanged", function () {
        expect(this.game.releaseDate).toBe(this.existingDate);
      });
    });

    describe("When we pass in a date", function () {
      beforeAll(function () {
        this.game = getXGamesWithDetails(1)[0];

        this.date = new Date("September 20, 2004");

        this.game.updateReleaseDateViaSteamApi(this.date);
      });

      it("the release date is properly updated", function () {
        expect(this.game.releaseDate.date).toEqual(this.date);
      });

      it("the release date release status is properly updated", function () {
        expect(this.game.releaseDate.comingSoon).toBeFalse();
      });
    });
  });
});
