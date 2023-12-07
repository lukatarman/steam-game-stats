import { SteamApp } from "./steam.app.js";
import { ValidDataSources } from "./valid.data.sources.js";

export const getXSampleSteamApps = (amount) => {
  return Array.from({ length: amount }, (x, index) =>
    SteamApp.oneFromSteamApi({ appid: index + 1, name: `Game #${index + 1}` }),
  );
};

export const getThreeSteamwebUntriedFilteredSteamApps = () => {
  return [
    {
      appid: 1,
      name: "Risk of Strain",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamcharts],
      failedVia: [],
    },
    {
      appid: 2,
      name: "Risk of Stain",
      type: "unknown",
      triedVia: [],
      failedVia: [],
    },
    {
      appid: 3,
      name: "Risk of Sprain",
      type: "game",
      triedVia: [ValidDataSources.validDataSources.steamcharts],
      failedVia: [],
    },
    {
      appid: 4,
      name: "Risk of Rain",
      type: "unknown",
      triedVia: [
        ValidDataSources.validDataSources.steamcharts,
        ValidDataSources.validDataSources.steamWeb,
      ],
      failedVia: [ValidDataSources.validDataSources.steamWeb],
    },
    {
      appid: 5,
      name: "Risk of Train Soundtrack",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamcharts],
      failedVia: [],
    },
    {
      appid: 6,
      name: "Risk of Cane DLC",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamcharts],
      failedVia: [],
    },
    {
      appid: 7,
      name: "Risk of Plain Demo",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamcharts],
      failedVia: [],
    },
    {
      appid: 8,
      name: "Risk of Crane",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamcharts],
      failedVia: [],
    },
  ];
};
export const getThreeSteamchartsUntriedFilteredSteamApps = () => {
  return [
    {
      appid: 1,
      name: "Risk of Strain",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamWeb],
      failedVia: [],
    },
    {
      appid: 2,
      name: "Risk of Stain",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamWeb],
      failedVia: [],
    },
    {
      appid: 3,
      name: "Risk of Gain",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamWeb],
      failedVia: [ValidDataSources.validDataSources.steamWeb],
    },
    {
      appid: 4,
      name: "Risk of Sprain",
      type: "game",
      triedVia: [ValidDataSources.validDataSources.steamWeb],
      failedVia: [],
    },
    {
      appid: 5,
      name: "Risk of Rain",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamcharts],
      failedVia: [],
    },
    {
      appid: 6,
      name: "Risk of Train",
      type: "unknown",
      triedVia: [],
      failedVia: [],
    },
    {
      appid: 7,
      name: "Risk of Cane Soundtrack",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamWeb],
      failedVia: [],
    },
    {
      appid: 8,
      name: "Risk of Plain DLC",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamWeb],
      failedVia: [],
    },
    {
      appid: 9,
      name: "Risk of Crane Demo",
      type: "unknown",
      triedVia: [ValidDataSources.validDataSources.steamWeb],
      failedVia: [],
    },
    {
      appid: 10,
      name: "Risk of Lane",
      type: "unknown",
      triedVia: [
        ValidDataSources.validDataSources.steamWeb,
        ValidDataSources.validDataSources.steamcharts,
      ],
      failedVia: [ValidDataSources.validDataSources.steamWeb],
    },
  ];
};
