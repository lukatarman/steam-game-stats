import { TrackedPlayers } from "./tracked.players.js";

export const getXSampleTrackedPlayers = (amount) => {
  return Array.from(
    { length: amount },
    (x, index) => new TrackedPlayers(amount * 12, 1598911200000 + amount * 86400000),
  );
};
