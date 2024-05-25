import { SteamApp } from "./steam.app.js";

export const getXSampleSteamApps = (amount, ids = []) => {
  return Array.from({ length: amount }, (x, index) => {
    const id = ids.length > 0 ? ids[index] : index + 1;

    return SteamApp.oneFromSteamApi({ appid: id, name: `Game #${index + 1}` });
  });
};

export const getThreeSourceUntriedFilteredSteamApps = (amount, source) => {
  return Array.from({ length: amount }, (x, index) =>
    SteamApp.oneFromSteamApi({ appid: index + 1, name: `Game #${index + 1}` }),
  ).map((app, index) => {
    if (isSecondFourthOrSeventhValue(index)) return app;

    app.triedVia.push(source);
    return app;
  });
};

export const getXSampleSteamAppsMarkedAsGames = (amount, ids = []) => {
  return Array.from({ length: amount }, (x, index) => {
    const id = ids.length > 0 ? ids[index] : index + 1;

    return SteamApp.oneFromDbEntry({
      appid: id,
      name: `Game #${index + 1}`,
      type: SteamApp.validTypes.game,
      triedVia: [],
      failedVia: [],
    });
  });
};

export const getXSampleSteamAppsMarkedAsNotGames = (amount, ids = []) => {
  return Array.from({ length: amount }, (x, index) => {
    const id = ids.length > 0 ? ids[index] : index + 1;

    return SteamApp.oneFromDbEntry({
      appid: id,
      name: `Game #${index + 1}`,
      type: SteamApp.validTypes.unknown,
      triedVia: [],
      failedVia: [],
    });
  });
};

const isSecondFourthOrSeventhValue = (index) => {
  if (index === 1) return true;
  if (index === 3) return true;
  if (index === 6) return true;
  return false;
};

export const getSixSteamApiUntriedFilteredSteamApps = () => {
  return [
    {
      appid: 1,
      name: "Game 1 soundtrack",
      type: SteamApp.validTypes.unknown,
      triedVia: ["steamWeb"],
      failedVia: ["steamWeb"],
    },
    {
      appid: 2,
      name: "Game 2",
      type: SteamApp.validTypes.unknown,
      triedVia: [],
      failedVia: ["steamWeb"],
    },
    {
      appid: 3,
      name: "Game 3",
      type: SteamApp.validTypes.unknown,
      triedVia: ["steamWeb"],
      failedVia: ["steamWeb"],
    },
    {
      appid: 4,
      name: "Game 4",
      type: SteamApp.validTypes.restricted,
      triedVia: ["steamWeb"],
      failedVia: [],
    },
    {
      appid: 5,
      name: "Game 5",
      type: SteamApp.validTypes.restricted,
      triedVia: [],
      failedVia: ["steamWeb"],
    },
    {
      appid: 6,
      name: "Game 6 dlc",
      type: SteamApp.validTypes.restricted,
      triedVia: ["steamWeb"],
      failedVia: ["steamWeb"],
    },
  ];
};

export const getEldenRingSteamApp = {
  appid: 1245620,
  name: "ELDEN RING",
};
