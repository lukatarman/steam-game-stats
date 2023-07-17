import { GamesRepository } from "./games.repository.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { daysToMs, hoursToMs } from "../../../utils/time.utils.js";

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

  describe(".getXgamesWithUncheckedPlayerHistory returns an array of games with unchecked player histories.", function () {
    describe("If the amount of 3 is passed in, with two valid documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "history_checks"]);

        await this.databaseClient.insertMany("games", [
          {
            id: 1,
            name: "Risk of Train",
            playerHistory: [],
          },
          {
            id: 2,
            name: "Risk of Rain",
            playerHistory: [],
          },
          {
            id: 3,
            name: "Risk of Brain",
            playerHistory: [],
          },
        ]);

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

        await this.databaseClient.insertMany("games", [
          {
            id: 1,
            name: "Risk of Train",
            playerHistory: [],
          },
          {
            id: 2,
            name: "Risk of Rain",
            playerHistory: [],
          },
          {
            id: 3,
            name: "Risk of Brain",
            playerHistory: [],
          },
        ]);

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

        await this.databaseClient.insertMany("games", [
          {
            id: 1,
            name: "Risk of Train",
            playerHistory: [
              { trackedPlayers: [{ players: 4 }] },
              { trackedPlayers: [{ players: 6 }] },
            ],
          },
          {
            id: 2,
            name: "Risk of Rain",
            playerHistory: [
              { trackedPlayers: [{ players: 15 }] },
              { trackedPlayers: [{ players: 24 }] },
            ],
          },
          {
            id: 3,
            name: "Risk of Brain",
            playerHistory: [
              { trackedPlayers: [{ players: 64 }] },
              { trackedPlayers: [{ players: 87 }] },
            ],
          },
        ]);

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

        await this.databaseClient.insertMany("games", [
          {
            id: 1,
            name: "Risk of Train",
            playerHistory: [
              { trackedPlayers: [{ players: 4 }] },
              { trackedPlayers: [{ players: 6 }] },
            ],
          },
          {
            id: 2,
            name: "Risk of Rain",
            playerHistory: [
              { trackedPlayers: [{ players: 15 }] },
              { trackedPlayers: [{ players: 24 }] },
            ],
          },
          {
            id: 3,
            name: "Risk of Brain",
            playerHistory: [
              { trackedPlayers: [{ players: 64 }] },
              { trackedPlayers: [{ players: 87 }] },
            ],
          },
          {
            id: 4,
            name: "Risk of Strain",
            playerHistory: [],
          },
          {
            id: 4,
            name: "Risk of No",
            playerHistory: [
              { trackedPlayers: [{ players: 34 }] },
              { trackedPlayers: [{ players: 11 }] },
            ],
          },
        ]);

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
    describe("If a specific time period is passed in", function () {
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

      it("the resulting array has a length of 2", function () {
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

    describe("If a specific time period, return amount, and minimum players are passed in", function () {
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

      it("the resulting array has a length of 1", function () {
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

const getTrendingGamesMockData = () => {
  const todaysDate = new Date();
  const oneWeekAgo = new Date(new Date() - daysToMs(7));

  return [
    {
      id: 1,
      name: "Risk of Train",
      playerHistory: [
        { year: "year", month: "month", averagePlayers: 120 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 23 },
            { date: oneWeekAgo, players: 44 },
            { date: todaysDate, players: 15 },
            { date: todaysDate, players: 45 },
          ],
          averagePlayers: 105,
        },
      ],
    },
    {
      id: 2,
      name: "Risk of Rain",
      playerHistory: [{ averagePlayers: 85 }],
    },
    {
      id: 3,
      name: "Risk of Brain",
      playerHistory: [
        { averagePlayers: 70 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 53 },
            { date: oneWeekAgo, players: 78 },
            { date: todaysDate, players: 233 },
            { date: todaysDate, players: 455 },
          ],
          averagePlayers: 140,
        },
      ],
    },
    {
      id: 4,
      name: "Risk of Strain",
      playerHistory: [
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 22 },
            { date: oneWeekAgo, players: 44 },
            { date: todaysDate, players: 1400 },
            { date: todaysDate, players: 877 },
          ],
          averagePlayers: 102,
        },
      ],
    },
    {
      id: 5,
      name: "Risk of Crane",
      playerHistory: [
        { year: "year", month: "month", averagePlayers: 120 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 0 },
            { date: oneWeekAgo, players: null },
            { date: todaysDate, players: 0 },
            { date: todaysDate, players: null },
          ],
          averagePlayers: 105,
        },
      ],
    },
    {
      id: 6,
      name: "Risk of Hey",
      playerHistory: [
        { year: "year", month: "month", averagePlayers: 120 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 15 },
            { date: oneWeekAgo, players: 15 },
            { date: todaysDate, players: 15 },
            { date: todaysDate, players: 15 },
          ],
          averagePlayers: 105,
        },
      ],
    },
  ];
};
