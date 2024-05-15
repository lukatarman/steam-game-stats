import { eldenRingSteamApiData } from "../../../assets/steam-api-responses/elden.ring.js";
import { theLastNightSteamApiData } from "../../../assets/steam-api-responses/the.last.night.unreleased.js";
import { getXGamesWithoutDetails } from "./game.mocks.js";
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

  describe(".extractReleaseDatesViaSteamApi.", function () {
    describe("When we try to update two games with missing release dates, one of them missing a release date", function () {
      beforeAll(function () {
        const gameIds = [1245620, 612400];

        this.gamesArray = new GamesAggregate(getXGamesWithoutDetails(2, gameIds));

        const steamApiApps = [eldenRingSteamApiData, theLastNightSteamApiData];

        this.gamesArray.extractReleaseDatesViaSteamApi(steamApiApps);
      });

      it("the first game's release date is updated", function () {
        expect(this.gamesArray.content[0].releaseDate).toEqual(
          new Date("24 February 2022 UTC"),
        );
      });

      it("the second game's release date remains unchanged", function () {
        expect(this.gamesArray.content[1].releaseDate).toEqual("");
      });
    });
  });
});
