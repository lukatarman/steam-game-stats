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
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    collections: ["games", "steam_apps", "update_timestamps", "history_checks"],
  },
  features: {
    batchSize: 5,
    batchDelay: 5000,
    unitDelay: 800,
    currentPlayersUpdateIntervalDelay: hoursToMs(2),
    updateIntervalDelay: hoursToMs(12),
    iterationDelay: 5000,
  },
  runner: {
    delayFn: delay,
    iterationDelay: 5000,
    expectedErrorTypes: [AxiosError],
  },
};
