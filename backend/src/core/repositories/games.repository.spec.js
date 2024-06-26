import { initiateInMemoryDatabase } from "../../adapters/driven/db/in.memory.database.client.js";
import { GamesRepository } from "./games.repository.js";
import { daysToMs, hoursToMs } from "../../common/time.utils.js";
import {
  getGamesDatasetMock,
  getGamesWithTrackedPlayersNoDate,
  getOneGameWithDetails,
  getTrendingGamesMockData,
  getXGamesWithDetails,
} from "../models/game.mocks.js";
import { Game } from "../models/game.js";
import { GamesAggregate } from "../models/games.aggregate.js";

describe("GamesRepository", function () {
  describe(".insertManyGames inserts multiple games into the collection.", function () {
    describe("If two games are passed in,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        const gamesRepo = new GamesRepository(this.databaseClient);

        await gamesRepo.insertManyGames([
          { id: 1, name: "First Game" },
          { id: 2, name: "Second Game" },
        ]);

        this.result = await this.databaseClient.getAll("games");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result has two games", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("First Game");
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].name).toBe("Second Game");
      });
    });
  });

  describe(".getOneGameById returns a document that has the passed in id.", function () {
    describe("If an existing game's id is passed in, the resulting object", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertOne("games", { id: 1, name: "Risk of Rain" });

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getOneGameById(1);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("has an id property that equals one", function () {
        expect(this.result.id).toBe(1);
      });

      it("has a name property that equals 'Risk of Rain'", function () {
        expect(this.result.name).toBe("Risk of Rain");
      });
    });

    describe("If an non-existing id is passed in,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertOne("games", { id: 2, name: "Risk of Rain" });

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getOneGameById(1);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result is null", function () {
        expect(this.result).toBe(null);
      });
    });
  });

  describe(".getAllGames returns an array of all games from the database.", function () {
    beforeAll(async function () {
      this.databaseClient = await initiateInMemoryDatabase(["games"]);

      await this.databaseClient.insertMany("games", [
        { id: 1, name: "Risk of Train" },
        { id: 2, name: "Risk of Rain" },
      ]);

      const gamesRepo = new GamesRepository(this.databaseClient);

      this.result = await gamesRepo.getAllGames();
    });

    afterAll(function () {
      this.databaseClient.disconnect();
    });

    it("the result has two games", function () {
      expect(this.result.length).toBe(2);
    });

    it("the first array has the correct values", function () {
      expect(this.result[0].id).toBe(1);
      expect(this.result[0].name).toBe("Risk of Train");
    });

    it("the second array has the correct values", function () {
      expect(this.result[1].id).toBe(2);
      expect(this.result[1].name).toBe("Risk of Rain");
    });
  });

  describe(".getXUnreleasedGames", function () {
    describe("When 3 games without valid release dates are requested", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getGamesDatasetMock());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXUnreleasedGames(3);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result is an instance of GamesAggregate", function () {
        expect(this.result).toBeInstanceOf(GamesAggregate);
      });

      it("three games are returned", function () {
        expect(this.result.content.length).toBe(3);
      });

      it("the first game has the correct date", function () {
        expect(this.result.content[0].id).toBe(227300);
        expect(this.result.content[0].releaseDate.date).toEqual(
          new Date("Thu Oct 17 2999"),
        );
      });

      it("the second game is correctly missing a date", function () {
        expect(this.result.content[1].id).toBe(2218750);
        expect(this.result.content[1].releaseDate.date).toBe(null);
      });

      it("the third game is correctly missing a date", function () {
        expect(this.result.content[2].id).toBe(239140);
        expect(this.result.content[2].releaseDate.date).toBe(null);
      });
    });
  });

  describe(".updateReleaseDates", function () {
    describe("When the release date of 1 game is to be updated,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getGamesDatasetMock());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.games = getOneGameWithDetails();

        await gamesRepo.updateReleaseDates(this.games);

        this.result = await gamesRepo.getOneGameById(this.games[0].id);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the game's details are updated", function () {
        expect(this.result.id).toBe(this.games[0].id);
        expect(this.result.releaseDate).toEqual(this.games[0].releaseDate);
      });
    });
  });

  describe(".getXgamesWithUncheckedPlayerHistory.", function () {
    describe("When two games are found,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "history_checks"]);

        await this.databaseClient.insertMany("games", getXGamesWithDetails(3));

        await this.databaseClient.insertMany("history_checks", [
          { gameId: 1, checked: false },
          { gameId: 2, checked: true },
          { gameId: 3, checked: false },
        ]);

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXgamesWithUncheckedPlayerHistory(3);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("two games are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first game has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Game 1");
      });

      it("the second game has the correct values", function () {
        expect(this.result[1].id).toBe(3);
        expect(this.result[1].name).toBe("Game 3");
      });
    });

    describe("If the amount of 1 is passed in, with three valid documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "history_checks"]);

        await this.databaseClient.insertMany("games", getXGamesWithDetails(3));

        await this.databaseClient.insertMany("history_checks", [
          { gameId: 1, checked: false },
          { gameId: 2, checked: false },
          { gameId: 3, checked: false },
        ]);

        const gamesRepo = new GamesRepository(this.databaseClient);
        this.result = await gamesRepo.getXgamesWithUncheckedPlayerHistory(1);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 1", function () {
        expect(this.result.length).toBe(1);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Game 1");
      });
    });
  });

  describe(".getXgamesCheckedMoreThanYmsAgo returns an array of games last checked more than a specified time ago.", function () {
    describe("If the amount of 3 is passed in, with two valid documents", function () {
      beforeAll(async function () {
        jasmine.clock().mockDate(new Date("13:00 21 September 2022"));

        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        const games = getXGamesWithDetails(3);

        const firstGameHistories = [
          { trackedPlayers: [{ date: new Date("12:00 21 September 2022") }] },
        ];
        const secondGameHistories = [
          { trackedPlayers: [{ date: new Date("9:00 21 September 2022") }] },
        ];

        games[0].pushSteamchartsPlayerHistory(firstGameHistories);
        games[1].pushSteamchartsPlayerHistory(secondGameHistories);

        await this.databaseClient.insertMany("games", games);

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXgamesCheckedMoreThanYmsAgo(3, hoursToMs(2));
      });

      afterAll(function () {
        this.databaseClient.disconnect();
        jasmine.clock().uninstall();
      });

      it("the result has two games", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(2);
        expect(this.result[0].name).toBe("Game 2");
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].id).toBe(3);
        expect(this.result[1].name).toBe("Game 3");
      });
    });

    describe("If the amount of 1 is passed in, with two valid documents", function () {
      beforeAll(async function () {
        jasmine.clock().mockDate(new Date("14:00 21 September 2022"));

        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        const games = getXGamesWithDetails(2);

        const firstGameHistories = [
          { trackedPlayers: [{ date: new Date("10:00 21 September 2022") }] },
        ];
        const secondGameHistories = [
          { trackedPlayers: [{ date: new Date("11:24 21 September 2022") }] },
        ];

        games[0].pushSteamchartsPlayerHistory(firstGameHistories);
        games[1].pushSteamchartsPlayerHistory(secondGameHistories);

        await this.databaseClient.insertMany("games", games);

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXgamesCheckedMoreThanYmsAgo(1, hoursToMs(1));
      });

      afterAll(function () {
        this.databaseClient.disconnect();
        jasmine.clock().uninstall();
      });

      it("the resulting array has a length of 1", function () {
        expect(this.result.length).toBe(1);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Game 1");
      });
    });
  });

  describe(".getXgamesSortedByCurrentPlayers returns an array of games sorted by current players.", function () {
    describe("If the amount of 2 is passed in, with three valid documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getGamesWithTrackedPlayersNoDate());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXgamesSortedByCurrentPlayers(2);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result has two games", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(3);
        expect(this.result[0].name).toBe("Risk of Brain");
        expect(this.result[0].currentPlayers).toBe(87);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].name).toBe("Risk of Rain");
        expect(this.result[1].currentPlayers).toBe(24);
      });
    });
  });

  describe(".getGamesBySearchTerm returns an array of games based on a search term, sorted by current players.", function () {
    describe("If the term 'rain' is passed into a collection of five documents, three of which pass the filters,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getGamesWithTrackedPlayersNoDate());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getGamesBySearchTerm("rain");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 3", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(3);
        expect(this.result[0].name).toBe("Risk of Brain");
        expect(this.result[0].currentPlayers).toBe(87);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].name).toBe("Risk of Rain");
        expect(this.result[1].currentPlayers).toBe(24);
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].id).toBe(1);
        expect(this.result[2].name).toBe("Risk of Train");
        expect(this.result[2].currentPlayers).toBe(6);
      });
    });
  });

  describe(".getTrendingGames.", function () {
    describe("When trending games for the last seven days are requested,", function () {
      beforeAll(async function () {
        jasmine.clock().mockDate(new Date());

        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getTrendingGamesMockData());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getTrendingGames(daysToMs(7));
      });

      afterAll(function () {
        this.databaseClient.disconnect();
        jasmine.clock().uninstall();
      });

      it("two games will be returned.", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first game is 'Risk of Strain'", function () {
        expect(this.result[0].id).toBe(4);
        expect(this.result[0].name).toBe("Risk of Strain");
        expect(this.result[0].percentagePlayerIncrease).toBe(3350);
      });

      it("the second game is 'Risk of Brain'", function () {
        expect(this.result[1].id).toBe(3);
        expect(this.result[1].name).toBe("Risk of Brain");
        expect(this.result[1].percentagePlayerIncrease).toBe(425.2);
      });
    });

    describe("When a limit of one trending game within the last seven days, with a minimum amount of players of 104 is requested", function () {
      beforeAll(async function () {
        jasmine.clock().mockDate(new Date());

        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getTrendingGamesMockData());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getTrendingGames(daysToMs(7), 1, 104);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
        jasmine.clock().uninstall();
      });

      it("one game will be returned.", function () {
        expect(this.result.length).toBe(1);
      });

      it("the first game is 'Risk of Brain'", function () {
        expect(this.result[0].id).toBe(3);
        expect(this.result[0].name).toBe("Risk of Brain");
        expect(this.result[0].percentagePlayerIncrease).toBe(425.2);
      });
    });
  });
});
