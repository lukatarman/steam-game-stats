import { initiateInMemoryDatabase } from "./in.memory.database.client.js";

describe("in.memory.database.client.js", function () {
  describe(".initiateInMemoryDatabase initiates the database with the provided collections", function () {
    describe("When two collections are provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games", "steam_apps"]);

        this.firstResult = await this.databaseClient.getAll("games");
        this.secondResult = await this.databaseClient.getAll("steam_apps");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the first result is an empty array", function () {
        expect(this.firstResult).toEqual([]);
      });

      it("the second result is an empty array", function () {
        expect(this.secondResult).toEqual([]);
      });
    });
  });
});
