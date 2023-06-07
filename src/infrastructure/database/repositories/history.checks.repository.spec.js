import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { HistoryChecksRepository } from "./history.checks.repository.js";

describe("history.checks.repository.js", function () {
  describe(".insertManyHistoryChecks inserts an array ob objects into the database.", function () {
    describe("If two history checks are inserted,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["history_checks"]);

        const historyRepo = new HistoryChecksRepository(this.databaseClient);

        await historyRepo.insertManyHistoryChecks([
          { id: 1, name: "First Game" },
          { id: 2, name: "Second Game" },
        ]);

        this.result = await this.databaseClient.getAll("history_checks");
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

  describe(".updateHistoryChecks modified the provided database entries.", function () {
    describe("When two history checks are provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["history_checks"]);

        const historyRepo = new HistoryChecksRepository(this.databaseClient);

        const historyChecks = [
          { gameId: 1, checked: true, found: true, source: "Steamcharts" },
          { gameId: 2, checked: true, found: false, source: "Steamcharts" },
          { gameId: 3, checked: true, found: true, source: "Steamcharts" },
        ];

        await historyRepo.insertManyHistoryChecks([
          { gameId: 1, checked: false, found: false },
          { gameId: 2, checked: false, found: false },
          { gameId: 3, checked: false, found: false },
        ]);

        await historyRepo.updateHistoryChecks(historyChecks);

        this.result = await this.databaseClient.getAll("history_checks");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].gameId).toBe(1);
        expect(this.result[0].checked).toBeTrue();
        expect(this.result[0].found).toBeTrue();
        expect(this.result[0].source).toBe("Steamcharts");
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].gameId).toBe(2);
        expect(this.result[1].checked).toBeTrue();
        expect(this.result[1].found).toBeFalse();
        expect(this.result[1].source).toBe("Steamcharts");
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].gameId).toBe(3);
        expect(this.result[2].checked).toBeTrue();
        expect(this.result[2].found).toBeTrue();
        expect(this.result[2].source).toBe("Steamcharts");
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
});
