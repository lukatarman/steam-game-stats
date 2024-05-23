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
    authOn: process.env.DB_AUTH_ON === "true",
  },
  features: {
    batchSize: Number(process.env.FEATURES_BATCH_SIZE),
    batchDelay: Number(process.env.FEATURES_BATCH_DELAY),
    unitDelay: Number(process.env.FEATURES_UNIT_DELAY),
    currentPlayersUpdateIntervalDelay: hoursToMs(
      Number(process.env.FEATURES_CURRENT_PLAYERS_UPDATE_INTERVAL_DELAY),
    ),
    releaseDateUpdateIntervalDelay: Number(
      process.env.FEATURES_RELEASE_DATE_UPDATE_INTERVAL_DELAY,
    ),
    updateIntervalDelay: hoursToMs(Number(process.env.FEATURES_UPDATE_INTERVAL_DELAY)),
    globalIterationDelay: Number(process.env.RUNNER_GLOBAL_ITERATION_DELAY),
  },
  externalApiUrls: {
    steamWeb: {
      host: "https://store.steampowered.com",
      appPage: "app",
    },
    steamApiOfficial: {
      host: "https://api.steampowered.com",
      currentPlayersForApp: "ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=",
      appList: "ISteamApps/GetAppList/v2",
    },
    steamApiUnofficial: {
      host: "https://api.steampowered.com/api",
      appDetails: "api/appdetails?appids=",
    },
    steamcharts: {
      host: "https://steamcharts.com",
      appPage: "app",
    },
  },
  externalApiUrlsx: {
    steamWeb: "https://store.steampowered.com/app/",
    steamcharts: "https://steamcharts.com/app/",
    steamApi: {
      appList: "https://api.steampowered.com/ISteamApps/GetAppList/v2",
      currentPlayersForApp:
        "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=",
      appDetails: "https://store.steampowered.com/api/appdetails?appids=",
    },
  },
  featureToggles: {
    steamAppsAggregator: {
      /**
       * @TODO remove feature toggle - https://github.com/lukatarman/steam-game-stats/issues/209
       */
      useCollectSteamAppsDiffOnDbLayer:
        process.env.FEATURE_TOGGLE_USE_COLLECT_STEAM_APPS_DIFF_ON_DB_LAYER === "true",
    },
  },
  runner: {
    options: {
      delayFn: delay,
      globalIterationDelay: Number(process.env.RUNNER_GLOBAL_ITERATION_DELAY),
    },
    expectedErrorTypes: [AxiosError],
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
};
