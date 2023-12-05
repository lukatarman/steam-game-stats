export function createConfigMock(
  batchSize = 1,
  unitDelay = 0,
  globalIterationDelay = 0,
  currentPlayersUpdateIntervalDelay = 0,
) {
  return {
    features: {
      batchSize,
      unitDelay,
      globalIterationDelay,
      currentPlayersUpdateIntervalDelay,
    },
  };
}
