import httpClient from "axios";
import { DatabaseClient } from "./adapters/driven/db/database.client.js";
import { SteamClient } from "./adapters/driven/http/steam.client.js";
import { Runner } from "./adapters/driving/runner/runner.js";
import { WebServer } from "./adapters/driving/rest/web.server.js";
import { GameQueriesController } from "./adapters/driving/rest/game-queries/game.queries.controller.js";
import { GameQueriesRouter } from "./adapters/driving/rest/game-queries/game.queries.router.js";
import { SteamAppsAggregator } from "./core/features/steam-apps-aggregator/steam.apps.aggregator.js";
import { GameIdentifier } from "./core/features/game-identifier/game.identifier.js";
import { PlayerHistoryAggregator } from "./core/features/player-history-aggregator/player.history.aggregator.js";
import { GamesRepository } from "./core/repositories/games.repository.js";
import { SteamAppsRepository } from "./core/repositories/steam.apps.repository.js";
import { SteamAppsUpdateTimestampsRepository } from "./core/repositories/steam.apps.update.timestamps.repository.js";
import { PlayerHistoryRepository } from "./core/repositories/player.history.repository.js";
import { HistoryChecksRepository } from "./core/repositories/history.checks.repository.js";
import { config } from "./common/config.loader.js";
import { Logger } from "./common/logger.js";
import { ValidDataSources } from "./core/models/valid.data.sources.js";
import { parseHTML } from "linkedom";

// our entry point = main
async function main() {
  const logger = new Logger(config.logger.level);
  const databaseClient = await new DatabaseClient(logger).init(config.db);

  // repositories
  const gamesRepository = new GamesRepository(databaseClient);
  const steamAppsRepository = new SteamAppsRepository(databaseClient);
  const steamAppsUpdateTimestampRepository = new SteamAppsUpdateTimestampsRepository(
    databaseClient,
  );
  const playerHistoryRepository = new PlayerHistoryRepository(databaseClient);
  const historyChecksRepository = new HistoryChecksRepository(databaseClient);
  logger.info("repositories setup finished");

  // http client
  const steamClient = new SteamClient(httpClient, config.externalApiUrls);

  const steamAppsAggregator = new SteamAppsAggregator(
    steamClient,
    steamAppsUpdateTimestampRepository,
    steamAppsRepository,
    logger,
    config.features,
  );
  const gameIdentifier = new GameIdentifier(
    steamClient,
    steamAppsRepository,
    gamesRepository,
    historyChecksRepository,
    logger,
    config.features,
    parseHTML,
  );
  const playerHistoryAggregator = new PlayerHistoryAggregator(
    steamClient,
    gamesRepository,
    historyChecksRepository,
    playerHistoryRepository,
    logger,
    config.features,
  );
  logger.info("features setup finished");

  // rest + web server
  const gameQueriesController = new GameQueriesController(gamesRepository);
  const gameQueriesRouter = new GameQueriesRouter(gameQueriesController);
  const webServer = new WebServer(gameQueriesRouter, logger);
  await webServer.start();

  /**
   * @TODO remove feature toggle - https://github.com/lukatarman/steam-game-stats/issues/209
   */
  const steamAppsAggregatorRunnable = config.featureToggles.steamAppsAggregator
    .useCollectSteamAppsDiffOnDbLayer
    ? { func: steamAppsAggregator.collectSteamAppsDiffOnDbLayer }
    : { func: steamAppsAggregator.collectSteamApps };

  const runnables = [
    steamAppsAggregatorRunnable,
    { func: gameIdentifier.checkIfGameViaSteamWeb },
    { func: gameIdentifier.checkIfGameViaSteamApi },
    { func: gameIdentifier.updateGamesWithoutReleaseDates },
    { func: playerHistoryAggregator.addPlayerHistoryFromSteamcharts },
    { func: playerHistoryAggregator.addCurrentPlayers },
  ];
  const runner = new Runner(logger, config.runner.options);
  logger.info("runner setup finished");

  try {
    /**
     * @todo fix bug - https://github.com/lukatarman/steam-game-stats/issues/40
     */
    logger.info("starting runner with: %o", runnables);
    await runner.run(runnables, config.runner.expectedErrorTypes);
  } catch (error) {
    logger.error(error);
  }

  logger.info("done...");
}

main().catch((error) => {
  const logger = new Logger(config.logger.level);
  logger.fatal(error, "unexpected error caught by main, add handling");
  logger.fatal("performing shutdown with error response");
  process.exit(1);
});
