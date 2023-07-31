import { GamesRepository } from "./games.repository.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { daysToMs, hoursToMs } from "../../../utils/time.utils.js";
import {
  getGamesWithEmptyPlayerHistories,
  getGamesWithTrackedPlayersNoDate,
  getTrendingGamesMockData,
} from "../../../models/game.mocks.js";
import { getGamesRepositoryMock } from "./games.repository.mock.js";

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

  describe(".getGamesWithoutDetails", function () {
    describe("When the database contains 5 matching games", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getGamesRepositoryMock());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getGamesWithoutDetails(5);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("five games are returned", function () {
        expect(this.result.length).toBe(5);
      });

      it("the first game is 'Dying Light'", function () {
        expect(this.result[0].id).toBe(239140);
        expect(this.result[0].name).toBe("Dying Light");
        expect(this.result[0].releaseDate).toBe("");
        expect(this.result[0].developers).toEqual([]);
        expect(this.result[0].genres).toEqual([]);
        expect(this.result[0].description).toBe("");
      });

      it("the second game is 'Call of Duty: Black Ops III'", function () {
        expect(this.result[1].id).toBe(311210);
        expect(this.result[1].name).toBe("Call of Duty: Black Ops III");
        expect(this.result[1].releaseDate).toBe("");
        expect(this.result[1].developers).toEqual([]);
        expect(this.result[1].genres).toEqual([]);
        expect(this.result[1].description).toBe("");
      });

      it("the third game is 'Killing Floor 2'", function () {
        expect(this.result[2].id).toBe(232090);
        expect(this.result[2].name).toBe("Killing Floor 2");
        expect(this.result[2].releaseDate).toBe("");
        expect(this.result[2].developers).toEqual([]);
        expect(this.result[2].genres).toEqual(["Indie", "RPG", "Strategy"]);
        expect(this.result[2].description).toBe(
          "Killing Floor 2 is a challenging gothic roguelike turn-based RPG about the psychological stresses of adventuring. Recruit, train, and lead a team of flawed heroes against unimaginable horrors, stress, disease, and the ever-encroaching dark. Can you keep your heroes together when all hope is lost?",
        );
      });

      it("the fourth game is 'Noita'", function () {
        expect(this.result[3].id).toBe(881100);
        expect(this.result[3].name).toBe("Noita");
        expect(this.result[3].releaseDate).toBe("14 Oct 2020");
        expect(this.result[3].developers).toEqual(["Nolla Games"]);
        expect(this.result[3].genres).toEqual([]);
        expect(this.result[3].description).toBe(
          "Noita is a magical action roguelite set in a world where every pixel is physically simulated. Fight, explore, melt, burn, freeze and evaporate your way through the procedurally generated world using spells you've created yourself.",
        );
      });

      it("the fifth game is 'Portal 2'", function () {
        expect(this.result[4].id).toBe(620);
        expect(this.result[4].name).toBe("Portal 2");
        expect(this.result[4].releaseDate).toBe("17 Apr 2011");
        expect(this.result[4].developers).toEqual(["Valve"]);
        expect(this.result[4].genres).toEqual(["Action", "Adventure"]);
        expect(this.result[4].description).toBe("");
      });
    });

    describe("When the database contains 6 matching games", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", getGamesRepositoryMock());

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getGamesWithoutDetails(6);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("six games are returned", function () {
        expect(this.result.length).toBe(6);
      });

      it("the first game is 'Dying Light'", function () {
        expect(this.result[0].id).toBe(239140);
        expect(this.result[0].name).toBe("Dying Light");
      });

      it("the second game is 'Call of Duty: Black Ops III'", function () {
        expect(this.result[1].id).toBe(311210);
        expect(this.result[1].name).toBe("Call of Duty: Black Ops III");
      });

      it("the third game is 'Killing Floor 2'", function () {
        expect(this.result[2].id).toBe(232090);
        expect(this.result[2].name).toBe("Killing Floor 2");
      });

      it("the fourth game is 'Noita'", function () {
        expect(this.result[3].id).toBe(881100);
        expect(this.result[3].name).toBe("Noita");
      });

      it("the fifth game is 'Portal 2'", function () {
        expect(this.result[4].id).toBe(620);
        expect(this.result[4].name).toBe("Portal 2");
      });

      it("the sixth game is 'The Crew 2'", function () {
        expect(this.result[5].id).toBe(646910);
        expect(this.result[5].name).toBe("The Crew 2");
      });
    });
  });

  describe(".updateGameDetails", function () {
    describe("When the details of 3 games are to be updated", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        this.games = [
          {
            id: 239140,
            name: "Dying Light",
            releaseDate: "21.09.1989",
            developers: ["Techland"],
            genres: ["Action", "RPG"],
            description: "Best game",
          },
          {
            id: 311210,
            name: "Call of Duty: Black Ops III",
            releaseDate: "21.09.1989",
            developers: ["Treyarch"],
            genres: ["Action", "RPG"],
            description: "Best one",
          },
          {
            id: 232090,
            name: "Killing Floor 2",
            releaseDate: "21.09.1989",
            developers: ["Tripwire Interactive"],
            genres: [],
            description: "",
          },
        ];

        await this.databaseClient.insertMany("games", getGamesRepositoryMock());

        const gamesRepo = new GamesRepository(this.databaseClient);

        await gamesRepo.updateGameDetails(this.games);

        this.result = await Promise.all(
          this.games.map(async (game) => gamesRepo.getOneGameById(game.id)),
        );
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the first game is 'Dying Light'", function () {
        expect(this.result[0].id).toBe(this.games[0].id);
        expect(this.result[0].name).toBe(this.games[0].name);
        expect(this.result[0].releaseDate).toBe(this.games[0].releaseDate);
        expect(this.result[0].developers).toEqual(this.games[0].developers);
        expect(this.result[0].genres).toEqual(this.games[0].genres);
        expect(this.result[0].description).toBe(this.games[0].description);
      });

      it("the second game is 'Call of Duty: Black Ops III'", function () {
        expect(this.result[1].id).toBe(this.games[1].id);
        expect(this.result[1].name).toBe(this.games[1].name);
        expect(this.result[1].releaseDate).toBe(this.games[1].releaseDate);
        expect(this.result[1].developers).toEqual(this.games[1].developers);
        expect(this.result[1].genres).toEqual(this.games[1].genres);
        expect(this.result[1].description).toBe(this.games[1].description);
      });
      it("the third game is 'Killing Floor 2'", function () {
        expect(this.result[2].id).toBe(this.games[2].id);
        expect(this.result[2].name).toBe(this.games[2].name);
        expect(this.result[2].genres).toEqual(this.games[2].genres);
        expect(this.result[2].description).toBe(this.games[2].description);
      });
    });
  });

  describe(".getXgamesWithUncheckedPlayerHistory.", function () {
    describe("When two games are found,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "history_checks"]);

        await this.databaseClient.insertMany("games", getGamesWithEmptyPlayerHistories());

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

      it("the result has two games", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Risk of Train");
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].id).toBe(3);
        expect(this.result[1].name).toBe("Risk of Brain");
      });
    });

    describe("If the amount of 1 is passed in, with three valid documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "history_checks"]);

        await this.databaseClient.insertMany("games", getGamesWithEmptyPlayerHistories());

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
        expect(this.result[0].name).toBe("Risk of Train");
      });
    });
  });

  describe(".getXgamesCheckedMoreThanYmsAgo returns an array of games last checked more than a specified time ago.", function () {
    describe("If the amount of 3 is passed in, with two valid documents", function () {
      beforeAll(async function () {
        jasmine.clock().mockDate(new Date("13:00 21 September 2022"));

        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          {
            id: 1,
            name: "Risk of Train",
            playerHistory: [
              { trackedPlayers: [{ date: new Date("12:00 21 September 2022") }] },
            ],
          },
          {
            id: 2,
            name: "Risk of Rain",
            playerHistory: [
              { trackedPlayers: [{ date: new Date("9:00 21 September 2022") }] },
            ],
          },
          {
            id: 3,
            name: "Risk of Brain",
            playerHistory: [],
          },
        ]);

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
        expect(this.result[0].name).toBe("Risk of Rain");
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].id).toBe(3);
        expect(this.result[1].name).toBe("Risk of Brain");
      });
    });

    describe("If the amount of 1 is passed in, with two valid documents", function () {
      beforeAll(async function () {
        jasmine.clock().mockDate(new Date("14:00 21 September 2022"));

        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          {
            id: 1,
            name: "Risk of Train",
            playerHistory: [
              { trackedPlayers: [{ date: new Date("10:00 21 September 2022") }] },
            ],
          },
          {
            id: 2,
            name: "Risk of Rain",
            playerHistory: [
              { trackedPlayers: [{ date: new Date("11:24 21 September 2022") }] },
            ],
          },
        ]);

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
        expect(this.result[0].name).toBe("Risk of Train");
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
