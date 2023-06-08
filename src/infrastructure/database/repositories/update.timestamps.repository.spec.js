import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { UpdateTimestampsRepository } from "./update.timestamps.repository.js";

fdescribe("player.history.repository.js", function () {
  describe(".updatePlayerHistoriesById updated the player histories of all matching objects.", function () {
    describe("If two out of four matching objects are provided, ", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["update_timestamps"]);

        const updateTimestampRepository = new UpdateTimestampsRepository(
          this.databaseClient,
        );

        this.date = new Date("August 2023");

        await updateTimestampRepository.insertOneUpdateTimestamp(this.date);
        this.result = await this.databaseClient.getAll("update_timestamps");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 1", function () {
        expect(this.result.length).toBe(1);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].updatedOn).toEqual(this.date);
      });
    });

    describe("If no games are provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["update_timestamps"]);

        this.result = await this.databaseClient.getAll("update_timestamps");
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
