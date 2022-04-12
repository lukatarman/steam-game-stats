import { axios as httpClient } from "axios";
import { DatabaseClient } from "./infrastructure/database.client";
import { SteamClient } from "./infrastructure/steam.client";
import { SteamGameListProcessor } from "./steam-game-list-processor/steam.game.list.processor";

// our entry point = main
function main() {
  // setup phase
  const databaseOptions = {
    url: "mongodb://localhost:27017",
    databaseName: "game-stats",
    collections: ["games", "steam_apps"],
  };
  const databaseClient = new DatabaseClient().init(databaseOptions);
  const steamClient = new SteamClient(httpClient);
  const steamDataProcessor = new SteamGameListProcessor(
    steamClient,
    databaseClient
  );

  // run phase
  steamDataProcessor.addGamesToCollection();
}
