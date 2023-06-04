import { daysToMs } from "../../../utils/time.utils.js";

export const getGamesWithMinimumXPlayers = (minimumPlayers) => {
  return {
    $match: {
      $expr: {
        $gt: [{ $arrayElemAt: ["$playerHistory.averagePlayers", -1] }, minimumPlayers],
      },
    },
  };
};

export const addAveragePlayersTodayProperty = () => {
  return {
    $addFields: {
      averagePlayersToday: {
        $arrayElemAt: [
          {
            $filter: {
              input: {
                $map: {
                  input: "$playerHistory",
                  as: "entry",
                  in: {
                    $avg: {
                      $map: {
                        input: {
                          $filter: {
                            input: "$$entry.trackedPlayers",
                            as: "players",
                            cond: {
                              $gte: [
                                "$$players.date",
                                { $subtract: [new Date(), daysToMs(1)] },
                              ],
                            },
                          },
                        },
                        as: "filteredPlayers",
                        in: "$$filteredPlayers.players",
                      },
                    },
                  },
                },
              },
              as: "players",
              cond: {
                $and: [{ $ne: ["$$players", []] }, { $ne: ["$$players", null] }],
              },
            },
          },
          0,
        ],
      },
    },
  };
};

export const addAveragePlayersAtCustomDayProperty = (timePeriodInMs) => {
  return {
    $addFields: {
      averagePlayersAtCustomDay: {
        $arrayElemAt: [
          {
            $filter: {
              input: {
                $map: {
                  input: "$playerHistory",
                  as: "entry",
                  in: {
                    $avg: {
                      $map: {
                        input: {
                          $filter: {
                            input: "$$entry.trackedPlayers",
                            as: "players",
                            cond: {
                              $and: [
                                {
                                  $lte: [
                                    "$$players.date",
                                    { $subtract: [new Date(), timePeriodInMs] },
                                  ],
                                },
                                {
                                  $gte: [
                                    "$$players.date",
                                    {
                                      $subtract: [
                                        { $subtract: [new Date(), timePeriodInMs] },
                                        daysToMs(1),
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        },
                        as: "filteredPlayers",
                        in: "$$filteredPlayers.players",
                      },
                    },
                  },
                },
              },
              as: "players",
              cond: {
                $and: [{ $ne: ["$$players", []] }, { $ne: ["$$players", null] }],
              },
            },
          },
          0,
        ],
      },
    },
  };
};

export const getGamesWithAveragePlayersValues = () => {
  return {
    $match: {
      $and: [
        { averagePlayersToday: { $gt: 0 } },
        { averagePlayersAtCustomDay: { $gt: 0 } },
      ],
    },
  };
};

export const addPercentagePlayerIncreaseProperty = () => {
  return {
    $addFields: {
      percentagePlayerIncrease: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  {
                    $subtract: ["$averagePlayersToday", "$averagePlayersAtCustomDay"],
                  },
                  "$averagePlayersAtCustomDay",
                ],
              },
              100,
            ],
          },
          1,
        ],
      },
    },
  };
};
