import { MongoMemoryServer } from "mongodb-memory-server";
import { DatabaseClient } from "./database.client.js";

export const initiateInMemoryDatabase = async () => {
  const mongoServer = await MongoMemoryServer.create();

  const databaseOptions = {
    url: mongoServer.getUri(),
    databaseName: "game-stats",
    collections: ["games", "history_checks"],
  };

  const databaseClient = await new DatabaseClient().init(databaseOptions);

  return databaseClient;
};
