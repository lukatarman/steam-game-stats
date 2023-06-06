import { MongoMemoryServer } from "mongodb-memory-server";
import { DatabaseClient } from "./database.client.js";

export const initiateInMemoryDatabase = async (collections) => {
  const mongoServer = await MongoMemoryServer.create();

  const databaseOptions = {
    url: mongoServer.getUri(),
    databaseName: "game-stats",
    collections: collections,
  };

  const databaseClient = await new DatabaseClient().init(databaseOptions);

  return databaseClient;
};
