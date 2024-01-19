import { SteamApp } from "./steam.app.js";

export const getXSampleSteamApps = (amount) => {
  return Array.from({ length: amount }, (x, index) =>
    SteamApp.oneFromSteamApi({ appid: index + 1, name: `Game #${index + 1}` }),
  );
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

const isSecondFourthOrSeventhValue = (index) => {
  if (index === 1) return true;
  if (index === 3) return true;
  if (index === 6) return true;
  return false;
};
