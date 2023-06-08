import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { SteamAppsUpdateTimestampsRepository } from "./steam.apps.update.timestamps.repository.js";

describe("steam.apps.update.timestapms.repository.js", function () {
  describe(".insertOneSteamAppsUpdateTimestamp adds a collection to the document with the provided properties.", function () {
    describe("If a date is provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["update_timestamps"]);

        const updateTimestampRepository = new SteamAppsUpdateTimestampsRepository(
          this.databaseClient,
        );

        this.date = new Date("August 2023");

        await updateTimestampRepository.insertOneSteamAppsUpdateTimestamp(this.date);
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
  });

  xdescribe(".getLastSteamAppsUpdateTimestamp gets the last collection added to the database", function () {
    describe("If the method is run", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["update_timestamps"]);

        const updateTimestampRepository = new SteamAppsUpdateTimestampsRepository(
          this.databaseClient,
        );

        const firstDate = new Date("June 2021");
        const secondDate = new Date("June 2023");
        this.date = new Date("June 2020");

        await updateTimestampRepository.insertOneSteamAppsUpdateTimestamp(firstDate);
        await updateTimestampRepository.insertOneSteamAppsUpdateTimestamp(secondDate);
        await updateTimestampRepository.insertOneSteamAppsUpdateTimestamp(this.date);
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
  });
});
