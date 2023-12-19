import { SteamApp } from "./steam.app.js";
import { ValidDataSources } from "./valid.data.sources.js";

export const getXSampleSteamApps = (amount) => {
  return Array.from({ length: amount }, (x, index) =>
    SteamApp.oneFromSteamApi({ appid: index + 1, name: `Game #${index + 1}` }),
  );
};

export const getThreeSourceUntriedFilteredSteamAppsNR64 = (amount, source) => {
  return Array.from({ length: amount }, (x, index) =>
    SteamApp.oneFromSteamApi({ appid: index + 1, name: `Game #${index + 1}` }),
  ).map((app, index) => {
    if (isSecondFourthOrSeventhValue(index)) return app;

    app.triedVia.push(source);
    return app;
  });
};

const isSecondFourthOrSeventhValue = (index) => {
  if (index === 1) return true;
  if (index === 3) return true;
  if (index === 6) return true;
  return false;
};

export const getThreeSteamwebUntriedFilteredSteamApps = (source) => {
  return [
    {
      appid: 1,
      name: "Risk of Strain",
      type: "unknown",
      triedVia: [source],
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
      triedVia: [source],
      failedVia: [],
    },
    {
      appid: 4,
      name: "Risk of Rain",
      type: "unknown",
      triedVia: [],
      failedVia: [ValidDataSources.validDataSources.steamWeb],
    },
    {
      appid: 5,
      name: "Risk of Train Soundtrack",
      type: "unknown",
      triedVia: [source],
      failedVia: [],
    },
    {
      appid: 6,
      name: "Risk of Cane DLC",
      type: "unknown",
      triedVia: [source],
      failedVia: [],
    },
    {
      appid: 7,
      name: "Risk of Plain Demo",
      type: "unknown",
      triedVia: [],
      failedVia: [],
    },
    {
      appid: 8,
      name: "Risk of Crane",
      type: "unknown",
      triedVia: [source],
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
