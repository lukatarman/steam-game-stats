import { GamesRepository } from "./games.repository.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { hoursToMs } from "../../../utils/time.utils.js";

fdescribe("games.repository.js", function () {
  describe(".insertManyGames inserts an array ob objects into the database.", function () {
    describe("If two games are inserted,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "history_checks"]);

        const gamesRepo = new GamesRepository(this.databaseClient);

        await gamesRepo.insertManyGames([
          { id: 1, name: "First Game" },
          { id: 2, name: "Second Game" },
        ]);

        this.result = await this.databaseClient
          .get("games")
          .find({ id: { $ne: 0 } })
          .toArray();
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array's name property is 'First Game' and its id is '1'", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("First Game");
      });

      it("the second array's name property is 'Second Game' and its id is '2'", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].name).toBe("Second Game");
      });
    });

    describe("If nothing is inserted, the result", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        this.result = await this.databaseClient.getAll("games");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getOneGameById returns a document based on the id passed in.", function () {
    describe("If an existing id is passed in, the resulting object ", function () {
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

    it("the resulting array has a length of 2", function () {
      expect(this.result.length).toBe(2);
    });

    it("the first array's name property is 'Risk of Train' and its id is '1'", function () {
      expect(this.result[0].id).toBe(1);
      expect(this.result[0].name).toBe("Risk of Train");
    });

    it("the second array's name property is 'Risk of Rain' and its id is '2'", function () {
      expect(this.result[1].id).toBe(2);
      expect(this.result[1].name).toBe("Risk of Rain");
    });
  });

  describe(".getXgamesWithoutPlayerHistory returns an array of games without player histories.", function () {
    describe("If an amount of '2' is passed in, with two valid documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          { id: 1, name: "Risk of Train", playerHistory: [] },
          { id: 2, name: "Risk of Histories", playerHistory: ["Fake History"] },
          { id: 3, name: "Risk of Rain", playerHistory: [] },
        ]);

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXgamesWithoutPlayerHistory(2);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array's name property is 'Risk of Train' and its id is '1'", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Risk of Train");
      });

      it("the second array's name property is 'Risk of Rain' and its id is '2'", function () {
        expect(this.result[1].id).toBe(3);
        expect(this.result[1].name).toBe("Risk of Rain");
      });
    });

    describe("If an amount of '1' is passed in, with 2 valid documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          { id: 1, name: "Risk of Train", playerHistory: [] },
          { id: 2, name: "Risk of Histories", playerHistory: ["Fake History"] },
          { id: 3, name: "Risk of Rain", playerHistory: [] },
        ]);

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXgamesWithoutPlayerHistory(1);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(1);
      });

      it("the first array's name property is 'Risk of Train' and its id is '1'", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Risk of Train");
      });
    });

    describe("If amount of '0' is passed in, with three valid documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          { id: 1, name: "Risk of Train", playerHistory: [] },
          { id: 2, name: "Risk of Histories", playerHistory: ["Fake History"] },
          { id: 3, name: "Risk of Rain", playerHistory: [] },
          { id: 4, name: "Risk of Brain", playerHistory: [] },
        ]);

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getXgamesWithoutPlayerHistory(0);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 3", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first array's name property is 'Risk of Train' and its id is '1'", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Risk of Train");
      });

      it("the second array's name property is 'Risk of Rain' and its id is '2'", function () {
        expect(this.result[1].id).toBe(3);
        expect(this.result[1].name).toBe("Risk of Rain");
      });

      it("the second array's name property is 'Risk of Brain' and its id is '4'", function () {
        expect(this.result[2].id).toBe(4);
        expect(this.result[2].name).toBe("Risk of Brain");
      });
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

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array's name property is 'Risk of Train' and its id is '1'", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Risk of Train");
      });

      it("the second array's name property is 'Risk of Brain' and its id is '3'", function () {
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

      it("the first array's name property is 'Risk of Train' and its id is '1'", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Risk of Train");
      });
    });
  });

  describe(".getXgamesCheckedMoreThanYmsAgo returns an array of games checked more than a specified time ago.", function () {
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

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array's name property is 'Risk of Rain' and its id is '2'", function () {
        expect(this.result[0].id).toBe(2);
        expect(this.result[0].name).toBe("Risk of Rain");
      });

      it("the second array's name property is 'Risk of Brain' and its id is '3'", function () {
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

      it("the first array's name property is 'Risk of Train' and its id is '1'", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("Risk of Train");
      });
    });
  });
});
