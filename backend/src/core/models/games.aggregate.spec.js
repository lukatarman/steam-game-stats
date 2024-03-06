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
    });
  });

  describe(".getGamesIds", () => {
    describe("if two games are passed in", function () {
      beforeAll(function () {
        const games = GamesAggregate.manyFromDbEntries(getXGamesWithoutDetails(2));

        this.result = games.getIds();
      });

      it("two ids are returned", function () {
        expect(this.result[0]).toBe(1);
        expect(this.result[1]).toBe(2);
      });
    });
  });

  describe(".isEmpty", function () {
    describe("when the steamApps array is empty", function () {
      beforeAll(function () {
        const gamesArray = GamesAggregate.manyFromDbEntries([]);

        this.result = gamesArray.isEmpty("", "");
      });

      it("the returned value is true", function () {
        expect(this.result).toBeTruthy();
      });
    });

    describe("when the steamApps array is not empty", function () {
      beforeAll(function () {
        const gamesArray = GamesAggregate.manyFromDbEntries(getXGamesWithoutDetails(2));

        this.result = gamesArray.isEmpty("", "");
      });

      it("the returned value is false", function () {
        expect(this.result).toBeFalsy();
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
