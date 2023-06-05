import { GamesRepository } from "./games.repository.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";

describe("games.repository.js", function () {
  describe(".getOneGameById returns a document based on an id.", function () {
    describe("If an existing id is passed in, the result is an object ", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase();

        this.databaseClient.insertOne("games", { id: 1, name: "Risk of Rain" });

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getOneGameById(1);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("with an id property that equals one", function () {
        expect(this.result.id).toBe(1);
      });

      it("with a name property that equals 'Risk of Rain'", function () {
        expect(this.result.name).toBe("Risk of Rain");
      });
    });

    describe("If an non-existing id is passed in, the result is an object ", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase();

        this.databaseClient.insertOne("games", { id: 2, name: "Risk of Rain" });

        const gamesRepo = new GamesRepository(this.databaseClient);

        this.result = await gamesRepo.getOneGameById(1);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("with an id property that equals null", function () {
        expect(this.result).toBe(null);
      });
    });
  });
});
