import { MongoMemoryServer } from "mongodb-memory-server";
import { DatabaseClient } from "./database.client.js";
import { createLoggerMock } from "../../utils/logger.mock.js";

export const initiateInMemoryDatabase = async (collections) => {
  const mongoServer = await MongoMemoryServer.create();

  const databaseOptions = {
    url: mongoServer.getUri(),
    databaseName: "game-stats",
    collections: collections,
  };

  const databaseClient = await new DatabaseClient(createLoggerMock()).init(
    databaseOptions,
  );

  return databaseClient;
};
