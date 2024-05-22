import { SteamAppRaw } from "./steam.app.raw.js";

export const getRawSteamApiApp = (app = "") => {
  return new SteamAppRaw(app);
};

export const getXSampleRawSteamApiApps = (amount) => {
  return Array.from({ length: amount }, (x, index) => {
    const gameNumber = index + 1;

    return {
      id: gameNumber,
      name: `Game ${gameNumber}`,
      type: getType(gameNumber),
    };
  });
};

const getType = (gameNumber) => {
  if (gameNumber === 1) return "game";
  if (gameNumber === 2) return "dlc";

  return "video";
};
