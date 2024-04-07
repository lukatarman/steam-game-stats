import { getParsedHtmlPages } from "../../../assets/html.details.pages.mock.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import { Game } from "./game.js";
import {
  getXGamesWithoutDetails,
  getXsteamchartsInstantiatedGames,
} from "./game.mocks.js";
import { GamesAggregate } from "./games.aggregate.js";

describe("GamesAggregate", function () {
  describe(".manyFromDbEntries", function () {
    beforeAll(function () {
      this.result = GamesAggregate.manyFromDbEntries(getXGamesWithoutDetails(2));
    });

    it("the result is an instance of GamesAggregate", function () {
      expect(this.result).toBeInstanceOf(GamesAggregate);
    });

    it("the result's games are instances of Game", function () {
      expect(this.result.games[0]).toBeInstanceOf(Game);
      expect(this.result.games[1]).toBeInstanceOf(Game);
    });
  });

  describe(".getIds", () => {
    describe("if the object contains two games,", function () {
      beforeAll(function () {
        const games = GamesAggregate.manyFromDbEntries(getXGamesWithoutDetails(2));

        this.result = games.ids;
      });

      it("the games' ids are returned.", function () {
        expect(this.result).toEqual([1, 2]);
      });
    });
  });

  describe(".isEmpty", function () {
    describe("when the games array is empty", function () {
      beforeAll(function () {
        const gamesArray = GamesAggregate.manyFromDbEntries([]);

        this.result = gamesArray.isEmpty();
      });

      it("the returned value is true", function () {
        expect(this.result).toBeTruthy();
      });
    });

    describe("when the games array is not empty", function () {
      beforeAll(function () {
        const gamesArray = GamesAggregate.manyFromDbEntries(getXGamesWithoutDetails(2));

        this.result = gamesArray.isEmpty();
      });

      it("the returned value is false", function () {
        expect(this.result).toBeFalsy();
      });
    });
  });

  describe(".updateGamesMissingDetails.", function () {
    describe("When we try to update two games with missing details,", function () {
      beforeAll(function () {
        this.result = GamesAggregate.manyFromDbEntries(getXGamesWithoutDetails(2));

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ];

        const parsedPages = getParsedHtmlPages(htmlDetailsPages);

        this.result.updateGamesMissingDetails(parsedPages);
      });

      it("the first game's details are updated", function () {
        expect(this.result.games[0].developers).toEqual([
          "Valve",
          "Hidden Path Entertainment",
        ]);
        expect(this.result.games[0].genres).toEqual(["Action", "Free to Play"]);
        expect(this.result.games[0].description).toBe(
          "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
        );
      });

      it("the second game's details are updated", function () {
        expect(this.result.games[1].developers).toEqual(["Hopoo Games"]);
        expect(this.result.games[1].genres).toEqual(["Action", "Indie"]);
        expect(this.result.games[1].description).toBe(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });
  });

  describe(".updateMissingReleaseDates.", function () {
    describe("When we try to update two games with missing release dates,", function () {
      beforeAll(function () {
        const games = getXsteamchartsInstantiatedGames(2);
        this.gamesArray = GamesAggregate.manyFromDbEntries(games);

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ];

        const parsedPages = getParsedHtmlPages(htmlDetailsPages);

        this.gamesArray.updateMissingReleaseDates(parsedPages);
      });

      it("the first game's release date is updated", function () {
        expect(this.gamesArray.games[0].releaseDate).toEqual(
          new Date("21 August 2012 UTC"),
        );
      });

      it("the second game's release date is updated", function () {
        expect(this.gamesArray.games[1].releaseDate).toEqual(
          new Date("11 August 2020 UTC"),
        );
      });
    });
  });
});
