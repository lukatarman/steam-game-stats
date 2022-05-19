import httpClient from "axios";
import { DatabaseClient } from "./infrastructure/database.client.js";
import { SteamClient } from "./infrastructure/steam.client.js";
import { SteamAppsAggregator } from "./steam-apps-aggregator/steam.apps.aggregator.js";
import { SteamGameListProcessor } from "./steam-game-list-processor/steam.game.list.processor.js";
import { hoursToMs } from "./shared/time.utils.js"
import { SteamchartsHistoryProcessor } from "./steamcharts-history-processor/steamcharts.history.processor.js";
import { Runner } from "./runner/runner.js";

// our entry point = main
async function main() {
  // setup phase
  const databaseOptions = {
    url: "mongodb://localhost:27017",
    databaseName: "game-stats",
    collections: ["games", "steam_apps", "update_timestamps"],
  };
  const databaseClient = await new DatabaseClient().init(databaseOptions);
  const steamClient = new SteamClient(httpClient);
  const options = {
    batchSize: 10,
    batchDelay: 5000,
    unitDelay: 800,
    noAppsFoundDelay: hoursToMs(1),
    updateIntervalDelay: hoursToMs(12),
    iterationDelay: 5000,
  };
  const SteamAppsAggregator = new SteamAppsAggregator(steamClient, databaseClient, options);
  const steamGameListProcessor = new SteamGameListProcessor(steamClient, databaseClient, options);
  const steamchartsHistoryProcessor = new SteamchartsHistoryProcessor(steamClient, databaseClient, options);

  const runner = new Runner([
    SteamAppsAggregator.run, 
    steamGameListProcessor.run, 
    steamchartsHistoryProcessor.run
   ], options);

  // run phase
  // TO DO: Might be a problem with THIS, running the functions through runner - check
  runner.run();

}

main();