import { TrackedPlayers } from "./tracked.players.js";

export const getXSampleTrackedPlayers = (amount) => {
  const samplePlayerAmount = amount * 12;
  const sampleDateTimestamp = new Date(1598911200000 + amount * 86400000);

  return Array.from(
    { length: amount },
    (x, index) => new TrackedPlayers(samplePlayerAmount, sampleDateTimestamp),
  );
};
