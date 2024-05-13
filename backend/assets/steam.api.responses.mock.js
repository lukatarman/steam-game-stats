export const getXSampleSteamApiApps = (amount) => {
  return Array.from({ length: amount }, (x, index) => {
    const gameNumber = index + 1;

    return {
      steam_appid: gameNumber,
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
