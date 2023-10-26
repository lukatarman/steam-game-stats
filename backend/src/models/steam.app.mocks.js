import { SteamApp } from "./steam.app.js";

export const getXSampleSteamApps = (amount) => {
  return Array.from({ length: amount }, (x, index) =>
    SteamApp.oneFromSteamApi({ appid: index + 1, name: `Game #${index + 1}` }),
  );
};

export const getXsteamchartsInstantiatedGames = (amount) => {
  return Array.from({ length: amount }).map((x, index) =>
    Game.fromSteamcharts({ appid: index + 1, name: `Game #${index + 1}` }),
  );
};
export const getThreeSteamwebUntriedFilteredSteamApps = () => {
  return [
    {
      appid: 1,
      name: "Risk of Strain",
      type: "unknown",
      triedVia: ["steamcharts"],
    },
    {
      appid: 2,
      name: "Risk of Stain",
      type: "unknown",
      triedVia: [],
    },
    {
      appid: 3,
      name: "Risk of Sprain",
      type: "game",
      triedVia: ["steamcharts"],
    },
    {
      appid: 4,
      name: "Risk of Rain",
      type: "unknown",
      triedVia: ["steamcharts", "steamWeb"],
    },
    {
      appid: 5,
      name: "Risk of Train Soundtrack",
      type: "unknown",
      triedVia: ["steamcharts"],
    },
    {
      appid: 6,
      name: "Risk of Cane DLC",
      type: "unknown",
      triedVia: ["steamcharts"],
    },
    {
      appid: 7,
      name: "Risk of Plain Demo",
      type: "unknown",
      triedVia: ["steamcharts"],
    },
    {
      appid: 8,
      name: "Risk of Crane",
      type: "unknown",
      triedVia: ["steamcharts"],
    },
  ];
};
export const getThreeSteamchartsUntriedFilteredSteamApps = () => {
  return [
    {
      appid: 1,
      name: "Risk of Strain",
      type: "unknown",
      triedVia: ["steamWeb"],
    },
    {
      appid: 2,
      name: "Risk of Stain",
      type: "unknown",
      triedVia: ["steamWeb"],
    },
    {
      appid: 3,
      name: "Risk of Gain",
      type: "unknown",
      triedVia: ["steamWeb"],
    },
    {
      appid: 4,
      name: "Risk of Sprain",
      type: "game",
      triedVia: ["steamWeb"],
    },
    {
      appid: 5,
      name: "Risk of Rain",
      type: "unknown",
      triedVia: ["steamcharts"],
    },
    {
      appid: 6,
      name: "Risk of Train",
      type: "unknown",
      triedVia: [],
    },
    {
      appid: 7,
      name: "Risk of Cane Soundtrack",
      type: "unknown",
      triedVia: ["steamWeb"],
    },
    {
      appid: 8,
      name: "Risk of Plain DLC",
      type: "unknown",
      triedVia: ["steamWeb"],
    },
    {
      appid: 9,
      name: "Risk of Crane Demo",
      type: "unknown",
      triedVia: ["steamWeb"],
    },
    {
      appid: 10,
      name: "Risk of Lane",
      type: "unknown",
      triedVia: ["steamWeb, steamcharts"],
    },
  ];
};
