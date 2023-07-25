import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { PlayerHistoryRepository } from "./player.history.repository.js";

describe("PlayerHistoryRepository", function () {
  describe(".updatePlayerHistoriesById updates the player histories of all matching documents.", function () {
    describe("If two out of four provided objects match, ", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          { id: 1, playerHistory: [] },
          { id: 2, playerHistory: [] },
          { id: 3, playerHistory: [] },
          { id: 4, playerHistory: [] },
        ]);

        const playerHistoryRepo = new PlayerHistoryRepository(this.databaseClient);

        const games = [
          { id: 1, playerHistory: [1, 2] },
          { id: 2, playerHistory: [2, 3] },
          { id: 6, playerHistory: [11, 24] },
          { id: 18, playerHistory: [51, 77] },
        ];

        await playerHistoryRepo.updatePlayerHistoriesById(games);

        this.result = await this.databaseClient.getAll("games");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 4", function () {
        expect(this.result.length).toBe(4);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].playerHistory[0]).toBe(1);
        expect(this.result[0].playerHistory[1]).toBe(2);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].playerHistory[0]).toBe(2);
        expect(this.result[1].playerHistory[1]).toBe(3);
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].id).toBe(3);
        expect(this.result[2].playerHistory).toEqual([]);
      });

      it("the fourth array has the correct values", function () {
        expect(this.result[3].id).toBe(4);
        expect(this.result[3].playerHistory).toEqual([]);
      });
    });
  });
});
