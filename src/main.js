import httpClient from "axios";
import { DatabaseClient } from "./infrastructure/database.client.js";
import { SteamClient } from "./infrastructure/steam.client.js";
import { SteamAppsAggregator } from "./steam-apps-aggregator/steam.apps.aggregator.js";
import { GameIdentifier } from "./game-identifier/game.identifier.js";
import { hoursToMs } from "./shared/time.utils.js"
import { PlayerHistoryAggregator } from "./player-history-aggregator/player.history.aggregator.js";
import { Runner } from "./runner/runner.js";

// our entry point = main
async function main() {
  // setup phase
  const databaseOptions = {
    url: "mongodb://localhost:27017",
    databaseName: "game-stats",
    collections: [
      "games",
      "steam_apps",
      "update_timestamps",
      "history_checks",
    ],
  };
  const databaseClient = await new DatabaseClient().init(databaseOptions);
  const steamClient = new SteamClient(httpClient);
  const options = {
    batchSize: 5,
    batchDelay: 5000,
    unitDelay: 800,
    currentPlayersUpdateIntervalDelay: hoursToMs(2),
    updateIntervalDelay: hoursToMs(12),
    iterationDelay: 5000,
  };
  const steamAppsAggregator = new SteamAppsAggregator(steamClient, databaseClient, options);
  const gameIdentifier = new GameIdentifier(steamClient, databaseClient, options);
  const playerHistoryAggregator = new PlayerHistoryAggregator(steamClient, databaseClient, options);

  const runner = new Runner([
    steamAppsAggregator.run.bind(steamAppsAggregator),
    gameIdentifier.run.bind(gameIdentifier),
    playerHistoryAggregator.addPlayerHistoryFromSteamcharts.bind(playerHistoryAggregator),
    playerHistoryAggregator.addCurrentPlayers.bind(playerHistoryAggregator),
   ], options);

  try {
    await runner.run();
  } catch (error) {
    console.error(error);
  }

  /**
   * @todo https://github.com/lukatarman/steam-game-stats/issues/39
   */
  console.info("done...");
}

main().catch(error => console.log(error));