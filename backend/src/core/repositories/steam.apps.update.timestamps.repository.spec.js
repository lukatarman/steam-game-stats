import { initiateInMemoryDatabase } from "../../adapters/driven/db/in.memory.database.client.js";
import { SteamAppsUpdateTimestampsRepository } from "./steam.apps.update.timestamps.repository.js";

describe("SteamAppsUpdateTimestampsRepository", function () {
  describe(".insertOneSteamAppsUpdateTimestamp adds a document containing the update timestamp to the collection", function () {
    describe("When a date is provided,", function () {
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

  describe(".getLastSteamAppsUpdateTimestamp gets the last update timestamp document added to the collection.", function () {
    describe("When the method is run", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["update_timestamps"]);

        const firstDocument = { updatedOn: new Date("June 2021") };
        const secondDocument = { updatedOn: new Date("July 2021") };
        this.thirdDocument = { updatedOn: new Date("August 2021") };

        await this.databaseClient.insertMany("update_timestamps", [
          firstDocument,
          secondDocument,
          this.thirdDocument,
        ]);

        const updateTimestampRepository = new SteamAppsUpdateTimestampsRepository(
          this.databaseClient,
        );

        this.result = await updateTimestampRepository.getLastSteamAppsUpdateTimestamp();
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result has a property 'updatedOn' which equals the last document's date", function () {
        expect(this.result.updatedOn).toEqual(this.thirdDocument.updatedOn);
      });
    });
  });
});
