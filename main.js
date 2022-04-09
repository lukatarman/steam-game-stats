import { axios as httpClient } from "axios";
import { DatabaseClient } from "./infrastructure/database.client";
import { SteamDataProcessor } from "./steam-data-processor/steam.data.processor";

// our entry point = main
function main() {
  // setup phase
  const databaseOptions = {
    url: "mongodb://localhost:27017",
    databaseName: "game-stats",
    collections: ["games"],
  };
  const databaseClient = new DatabaseClient().init(databaseOptions);
  const steamDataProcessor = new SteamDataProcessor(httpClient, databaseClient);

  // run phase
  steamDataProcessor.createGamesList();
  steamDataProcessor.sanitizeGamesListMOCK();
}
