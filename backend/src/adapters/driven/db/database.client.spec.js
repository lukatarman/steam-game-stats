import { Collection } from "mongodb";
import { initiateInMemoryDatabase } from "./in.memory.database.client.js";

describe("DatabaseClient", function () {
  describe(".init initiates the databased with the provided options", function () {
    describe("When the correct options are provided", function () {
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

  describe(".disconnect disconnects the database.", function () {
    describe("When we try to run a method on the class after disconnecting,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.disconnect();
      });

      it("the method thorws an error", function () {
        expect(function () {
          this.databaseClient.getAll("games");
        }).toThrowError();
      });
    });
  });

  describe(".insertOne inserts one document into the provided collection.", function () {
    describe("If we provide the collection and data to the method,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertOne("games", { id: 1, name: "My Game" });

        this.result = await this.databaseClient.getAll("games");
      });

      it("the resulting array has a length of 1", function () {
        expect(this.result.length).toBe(1);
      });

      it("the first resulting aray has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("My Game");
      });
    });
  });

  describe(".insertMany inserts all the provided documents into the collection.", function () {
    describe("If we provide three documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        const documents = [
          { id: 1, name: "My Game" },
          { id: 2, name: "My Name" },
          { id: 3, name: "My Tame" },
        ];

        await this.databaseClient.insertMany("games", documents);

        this.result = await this.databaseClient.getAll("games");
      });

      it("the resulting array has a length of 3", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first resulting aray has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("My Game");
      });

      it("the second resulting aray has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].name).toBe("My Name");
      });

      it("the third resulting aray has the correct values", function () {
        expect(this.result[2].id).toBe(3);
        expect(this.result[2].name).toBe("My Tame");
      });
    });
  });

  describe(".getAll gets all the documents from the collection that match a filter.", function () {
    describe("If one out of two documents matches the provided filter", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertOne("games", { id: 1, name: "My Game" });
        await this.databaseClient.insertOne("games", { id: 2, name: "My Name" });

        this.result = await this.databaseClient.getAll("games", { id: 2 });
      });

      it("the resulting array has a length of 1", function () {
        expect(this.result.length).toBe(1);
      });

      it("the first aray has the correct values", function () {
        expect(this.result[0].id).toBe(2);
        expect(this.result[0].name).toBe("My Name");
      });
    });

    describe("If we don't provide a filter", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertOne("games", { id: 1, name: "My Game" });
        await this.databaseClient.insertOne("games", { id: 2, name: "My Name" });

        this.result = await this.databaseClient.getAll("games");
      });

      it("the result has two games", function () {
        expect(this.result).toHaveSize(2);
      });

      it("the first aray has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("My Game");
      });

      it("the second aray has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].name).toBe("My Name");
      });
    });
  });

  describe(".getCount returns the number of documents in a collection", function () {
    describe("Given one document is in the collection", function () {
      it("the count will be one", async function () {
        const dbClient = await initiateInMemoryDatabase(["games"]);
        await dbClient.insertOne("games", { id: 1, name: "My Game" });
        expect(await dbClient.getCount("games")).toBe(1);
      });
    });

  });

  describe(".get selects the provided collection.", function () {
    describe("When the method runs", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        this.result = await this.databaseClient.get("games");
      });

      it("the result is the provided collection", function () {
        expect(this.result).toBeInstanceOf(Collection);
      });

      it("the result is the provided collection", function () {
        expect(this.result.s.namespace.collection).toBe("games");
      });
    });
  });

  describe(".updateOne updates one filtered document, with the provided data.", function () {
    describe("When the correct arguments are provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [{ id: 1 }, { id: 2 }, { id: 3 }]);

        await this.databaseClient.updateOne(
          "games",
          { id: 1 },
          { $set: { tested: true } },
        );

        this.result = await this.databaseClient.getAll("games");
      });

      it("the resulting array has a length of 3", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first aray has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].tested).toBeTrue();
      });

      it("the second aray has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].tested).toBeUndefined();
      });
    });
  });

  describe(".deleteMany deletes documents of the provided collection, that pass a filter.", function () {
    describe("When 2 out of 4 documents in the collection pass the filter,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          { id: 1, name: "DayZ" },
          { id: 2, name: "Half-Life" },
          { id: 3, name: "Counter-Strike" },
          { id: 4, name: "Monster Hunter" },
        ]);

        await this.databaseClient.deleteMany("games", { id: { $gt: 2 } });

        this.result = await this.databaseClient.getAll("games");
      });

      it("the result has two games", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first aray has the correct values", function () {
        expect(this.result[0].id).toBe(1);
        expect(this.result[0].name).toBe("DayZ");
      });

      it("the second aray has the correct values", function () {
        expect(this.result[1].id).toBe(2);
        expect(this.result[1].name).toBe("Half-Life");
      });
    });
  });

  describe(".getLast gets the last document in the collection", function () {
    describe("When the method runs,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["games"]);

        await this.databaseClient.insertMany("games", [
          { id: 1, name: "DayZ" },
          { id: 2, name: "Half-Life" },
          { id: 3, name: "Counter-Strike" },
          { id: 4, name: "Monster Hunter" },
        ]);

        this.result = await this.databaseClient.getLast("games");
      });

      it("the result has the correct values", function () {
        expect(this.result.id).toBe(4);
        expect(this.result.name).toBe("Monster Hunter");
      });
    });
  });
});
