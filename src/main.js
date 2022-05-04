import { axios as httpClient } from "axios";
import { DatabaseClient } from "./infrastructure/database.client";
import { SteamClient } from "./infrastructure/steam.client";
import { SteamGameListProcessor } from "./steam-game-list-processor/steam.game.list.processor";
import { SteamPlayerProcessor } from "./steam-player-processor/steam.player.processor";

// our entry point = main
function main() {
  // setup phase
  const databaseOptions = {
    url: "mongodb://localhost:27017",
    databaseName: "game-stats",
    collections: ["games", "steam_apps", "update_timestamps"],
  };
  const databaseClient = new DatabaseClient().init(databaseOptions);
  const steamClient = new SteamClient(httpClient);
  const steamGameListProcessorOptions = {
    batchSize: 10,
    batchDelay: 5000,
    unitDelay: 500,
    noAppsFoundDelay: 3600000,
  };
  const steamGameListProcessor = new SteamGameListProcessor(steamClient, databaseClient, steamGameListProcessorOptions);
  const steamPlayerProcessor = new SteamPlayerProcessor(steamClient, databaseClient);

  // run phase
  steamGameListProcessor.run();
  steamPlayerProcessor.addPlayerCounts();
}