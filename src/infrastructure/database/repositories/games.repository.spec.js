import { GamesRepository } from "./games.repository.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";

describe("games.repository.js", function () {
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

    fdescribe("If nothing is inserted, the result", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "history_checks"]);

        this.result = await this.databaseClient.get("games").find({}).toArray();
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
        this.databaseClient = await initiateInMemoryDatabase();

        this.databaseClient.insertOne("games", { id: 1, name: "Risk of Rain" });

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
        this.databaseClient = await initiateInMemoryDatabase();

        this.databaseClient.insertOne("games", { id: 2, name: "Risk of Rain" });

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
});
