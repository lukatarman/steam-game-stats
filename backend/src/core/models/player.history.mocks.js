import { PlayerHistory } from "./player.history.js";
import { getXSampleTrackedPlayers } from "./tracked.players.mocks.js";

const histories = [
  {
    year: 2024,
    month: 4,
    trackedPlayers: getXSampleTrackedPlayers(2),
    averagePlayers: 105,
  },
];

export const getSamplePlayerHistory = () => {
  return PlayerHistory.manyFromDbEntry(histories);
};
