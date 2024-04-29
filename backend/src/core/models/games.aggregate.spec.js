import { getParsedHtmlPages } from "../../../assets/html.details.pages.mock.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import {
  getXGamesWithoutDetails,
  getXsteamchartsInstantiatedGames,
} from "./game.mocks.js";
import { GamesAggregate } from "./games.aggregate.js";

describe("GamesAggregate", function () {
  describe(".content", () => {
    describe("if we try to get the content of the class", function () {
      beforeAll(function () {
        const games = getXGamesWithoutDetails(2);
        const gamesAggregate = new GamesAggregate(games);

        this.contentCopy = gamesAggregate.content;

        games[0].developers.push("test");
        games[1].developers.push("test");
      });

      it("the returned games are true deep copies", function () {
        expect(this.contentCopy[0].developers).toEqual([]);
        expect(this.contentCopy[1].developers).toEqual([]);
      });
    });
  });

  describe(".getIds", () => {
    describe("if the aggregate contains two games,", function () {
      beforeAll(function () {
        const games = new GamesAggregate(getXGamesWithoutDetails(2));

        this.result = games.ids;
      });

      it("the games' ids are returned.", function () {
        expect(this.result).toEqual([1, 2]);
      });
    });
  });

  describe(".isEmpty", function () {
    describe("when the aggregate contains no games", function () {
      beforeAll(function () {
        const gamesArray = new GamesAggregate([]);

        this.result = gamesArray.isEmpty;
      });

      it("the emptyness check is true", function () {
        expect(this.result).toBeTruthy();
      });
    });

    describe("when the aggregate contains games", function () {
      beforeAll(function () {
        const gamesArray = new GamesAggregate(getXGamesWithoutDetails(2));

        this.result = gamesArray.isEmpty;
      });

      it("the emptyness check is false", function () {
        expect(this.result).toBeFalsy();
      });
    });
  });

  describe(".updateGameDetailsFrom.", function () {
    describe("When we try to update two games with missing details,", function () {
      beforeAll(function () {
        this.result = new GamesAggregate(getXGamesWithoutDetails(2));

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ];

        const parsedPages = getParsedHtmlPages(htmlDetailsPages);

        this.result.updateGameDetailsFrom(parsedPages);
      });

      it("the first game's details are updated", function () {
        expect(this.result.content[0].developers).toEqual([
          "Valve",
          "Hidden Path Entertainment",
        ]);
        expect(this.result.content[0].genres).toEqual(["Action", "Free to Play"]);
        expect(this.result.content[0].description).toBe(
          "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
        );
      });

      it("the second game's details are updated", function () {
        expect(this.result.content[1].developers).toEqual(["Hopoo Games"]);
        expect(this.result.content[1].genres).toEqual(["Action", "Indie"]);
        expect(this.result.content[1].description).toBe(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });
  });

  describe(".extractReleaseDatesFrom.", function () {
    describe("When we try to update two games with missing release dates,", function () {
      beforeAll(function () {
        const games = getXsteamchartsInstantiatedGames(2);
        this.gamesArray = new GamesAggregate(games);

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ];

        const parsedPages = getParsedHtmlPages(htmlDetailsPages);

        this.gamesArray.extractReleaseDatesFrom(parsedPages);
      });

      it("the first game's release date is updated", function () {
        expect(this.gamesArray.content[0].releaseDate).toEqual(
          new Date("21 August 2012 UTC"),
        );
      });

      it("the second game's release date is updated", function () {
        expect(this.gamesArray.content[1].releaseDate).toEqual(
          new Date("11 August 2020 UTC"),
        );
      });
    });
  });
});
