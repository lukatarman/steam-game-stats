import { SteamAppRaw } from "./steam.app.raw.js";

export const getRawSteamApiApp = (app = "") => {
  return new SteamAppRaw(app);
};

export const getXRawSteamApiApps = (amount) => {
  return Array.from({ length: amount }, (x, index) => {
    return new SteamAppRaw({
      steam_appid: index + 1,
      name: `Game ${index + 1}`,
      type: getType(index + 1),
    });
  });
};

export const getXSampleRawSteamApiApps = (amount) => {
  return Array.from({ length: amount }, (x, index) => {
    const gameNumber = index + 1;

    return new SteamAppRaw({
      steam_appid: gameNumber,
      name: `Game ${gameNumber}`,
      type: getType(gameNumber),
    });
  });
};

const getType = (gameNumber) => {
  if (gameNumber === 1) return "game";
  if (gameNumber === 2) return "dlc";

  return "video";
};

export const eldenRingRawMockResult = () => {
  const data = {
    steam_appid: 1245620,
    name: "ELDEN RING",
    type: "game",
    developers: ["FromSoftware Inc."],
    genres: [{ description: "Action" }, { description: "RPG" }],
    short_description:
      "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    release_date: {
      date: "24 Feb, 2022",
      coming_soon: false,
    },
  };

  return new SteamAppRaw(data);
};
