import { ValidDataSources } from "../../../utils/valid.data.sources.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { HistoryChecksRepository } from "./history.checks.repository.js";

describe("HistoryChecksRepository", function () {
  describe(".insertManyHistoryChecks inserts history check documents into the database.", function () {
    describe("If two documents are inserted,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["history_checks"]);

        const historyChecksRepo = new HistoryChecksRepository(this.databaseClient);

        await historyChecksRepo.insertManyHistoryChecks([
          { id: 1, name: "First Game" },
          { id: 2, name: "Second Game" },
        ]);

        this.result = await this.databaseClient.getAll("history_checks");
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

  describe(".updateHistoryChecks modifies the provided database documents.", function () {
    describe("When three history checks are provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["history_checks"]);

        const historyChecksRepo = new HistoryChecksRepository(this.databaseClient);

        await historyChecksRepo.insertManyHistoryChecks([
          { gameId: 1, checked: false, found: false },
          { gameId: 2, checked: false, found: false },
          { gameId: 3, checked: false, found: false },
        ]);

        const updatedHistoryChecks = [
          {
            gameId: 1,
            checked: true,
            found: true,
            source: ValidDataSources.validDataSources.steamcharts,
          },
          {
            gameId: 2,
            checked: true,
            found: false,
            source: ValidDataSources.validDataSources.steamcharts,
          },
          {
            gameId: 3,
            checked: true,
            found: true,
            source: ValidDataSources.validDataSources.steamcharts,
          },
        ];

        await historyChecksRepo.updateHistoryChecks(updatedHistoryChecks);

        this.result = await this.databaseClient.getAll("history_checks");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 3", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].gameId).toBe(1);
        expect(this.result[0].checked).toBeTrue();
        expect(this.result[0].found).toBeTrue();
        expect(this.result[0].source).toBe(ValidDataSources.validDataSources.steamcharts);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].gameId).toBe(2);
        expect(this.result[1].checked).toBeTrue();
        expect(this.result[1].found).toBeFalse();
        expect(this.result[1].source).toBe(ValidDataSources.validDataSources.steamcharts);
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].gameId).toBe(3);
        expect(this.result[2].checked).toBeTrue();
        expect(this.result[2].found).toBeTrue();
        expect(this.result[2].source).toBe(ValidDataSources.validDataSources.steamcharts);
      });
    });
  });
});
