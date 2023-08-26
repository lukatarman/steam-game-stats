import "dotenv/config";
import { delay, hoursToMs } from "./time.utils.js";
// Reason for this type of import is the following error:
// SyntaxError: Named export 'AxiosError' not found. The requested module 'axios' is a CommonJS module, which may not support all module.exports as named exports.
// CommonJS modules can always be imported via the default export, for example using:
//
// import pkg from 'axios';
// const { AxiosError } = pkg;
import httpClient from "axios";
const { AxiosError } = httpClient;

export const config = {
  db: {
    host: process.env.DB_ENDPOINT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    collections: ["games", "steam_apps", "update_timestamps", "history_checks"],
  },
  features: {
    batchSize: process.env.FEATURES_BATCH_SIZE,
    batchDelay: process.env.FEATURES_BATCH_DELAY,
    unitDelay: process.env.FEATURES_UNIT_DELAY,
    currentPlayersUpdateIntervalDelay: hoursToMs(
      process.env.FEATURES_CURRENT_PLAYERS_UPDATE_INTERVAL_DELAY,
    ),
    updateIntervalDelay: hoursToMs(process.env.FEATURES_UPDATE_INTERVAL_DELAY),
    iterationDelay: process.env.FEATURES_ITERATION_DELAY,
  },
  runner: {
    delayFn: delay,
    iterationDelay: process.env.RUNNER_ITERATION_DELAY,
    expectedErrorTypes: [AxiosError],
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
};
