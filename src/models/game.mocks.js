import { daysToMs } from "../utils/time.utils.js";

export const getGamesWithEmptyPlayerHistories = () => {
  return [
    {
      id: 1,
      name: "Risk of Train",
      playerHistory: [],
    },
    {
      id: 2,
      name: "Risk of Rain",
      playerHistory: [],
    },
    {
      id: 3,
      name: "Risk of Brain",
      playerHistory: [],
    },
  ];
};

export const getGamesWithTrackedPlayersNoDate = () => {
  return [
    {
      id: 1,
      name: "Risk of Train",
      playerHistory: [
        { trackedPlayers: [{ players: 4 }] },
        { trackedPlayers: [{ players: 6 }] },
      ],
    },
    {
      id: 2,
      name: "Risk of Rain",
      playerHistory: [
        { trackedPlayers: [{ players: 15 }] },
        { trackedPlayers: [{ players: 24 }] },
      ],
    },
    {
      id: 3,
      name: "Risk of Brain",
      playerHistory: [
        { trackedPlayers: [{ players: 64 }] },
        { trackedPlayers: [{ players: 87 }] },
      ],
    },
    {
      id: 4,
      name: "Risk of Strain",
      playerHistory: [],
    },
    {
      id: 4,
      name: "Risk of No",
      playerHistory: [
        { trackedPlayers: [{ players: 34 }] },
        { trackedPlayers: [{ players: 11 }] },
      ],
    },
  ];
};

export const getTrendingGamesMockData = () => {
  const todaysDate = new Date();
  const oneWeekAgo = new Date(new Date() - daysToMs(7));

  return [
    {
      id: 1,
      name: "Risk of Train",
      playerHistory: [
        { year: "year", month: "month", averagePlayers: 120 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 23 },
            { date: oneWeekAgo, players: 44 },
            { date: todaysDate, players: 15 },
            { date: todaysDate, players: 45 },
          ],
          averagePlayers: 105,
        },
      ],
    },
    {
      id: 2,
      name: "Risk of Rain",
      playerHistory: [{ averagePlayers: 85 }],
    },
    {
      id: 3,
      name: "Risk of Brain",
      playerHistory: [
        { averagePlayers: 70 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 53 },
            { date: oneWeekAgo, players: 78 },
            { date: todaysDate, players: 233 },
            { date: todaysDate, players: 455 },
          ],
          averagePlayers: 140,
        },
      ],
    },
    {
      id: 4,
      name: "Risk of Strain",
      playerHistory: [
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 22 },
            { date: oneWeekAgo, players: 44 },
            { date: todaysDate, players: 1400 },
            { date: todaysDate, players: 877 },
          ],
          averagePlayers: 102,
        },
      ],
    },
    {
      id: 5,
      name: "Risk of Crane",
      playerHistory: [
        { year: "year", month: "month", averagePlayers: 120 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 0 },
            { date: oneWeekAgo, players: null },
            { date: todaysDate, players: 0 },
            { date: todaysDate, players: null },
          ],
          averagePlayers: 105,
        },
      ],
    },
    {
      id: 6,
      name: "Risk of Hey",
      playerHistory: [
        { year: "year", month: "month", averagePlayers: 120 },
        {
          year: "year",
          month: "month",
          trackedPlayers: [
            { date: oneWeekAgo, players: 15 },
            { date: oneWeekAgo, players: 15 },
            { date: todaysDate, players: 15 },
            { date: todaysDate, players: 15 },
          ],
          averagePlayers: 105,
        },
      ],
    },
  ];
};

export const getSixGamesWithMissingProperties = () => {
  return [
    {
      id: 1,
      name: "Risk of Train",
      releaseDate: "",
      developers: ["Valve"],
      genres: ["Action"],
      description: "Best game",
      playerHistory: [
        {
          year: "2023",
          month: "2",
          averagePlayers: "2",
          trackedPlayers: [{ players: 2 }],
        },
      ],
    },
    {
      id: 2,
      name: "Risk of Rain",
      releaseDate: "21.09.1989",
      developers: [],
      genres: ["Action"],
      description: "Best game",
      playerHistory: [
        {
          year: "2023",
          month: "2",
          averagePlayers: "2",
          trackedPlayers: [{ players: 2 }],
        },
      ],
    },
    {
      id: 3,
      name: "Risk of Strain",
      releaseDate: "21.09.1989",
      developers: ["Valve"],
      genres: [],
      description: "Best game",
      playerHistory: [
        {
          year: "2023",
          month: "2",
          averagePlayers: "2",
          trackedPlayers: [{ players: 2 }],
        },
      ],
    },
    {
      id: 4,
      name: "Risk of Brain",
      releaseDate: "",
      developers: ["Valve"],
      genres: ["Action"],
      description: "",
      playerHistory: [
        {
          year: "2023",
          month: "2",
          averagePlayers: "2",
          trackedPlayers: [{ players: 2 }],
        },
      ],
    },
    {
      id: 5,
      name: "Risk of Cane",
      releaseDate: "",
      developers: [],
      genres: [],
      description: "",
      playerHistory: [
        {
          year: "2023",
          month: "2",
          averagePlayers: "2",
          trackedPlayers: [{ players: 2 }],
        },
      ],
    },
    {
      id: 6,
      name: "Risk of Gain",
      releaseDate: "",
      developers: [],
      genres: [],
      description: "",
      playerHistory: [
        {
          year: "2023",
          month: "2",
          averagePlayers: "2",
          trackedPlayers: [{ players: 2 }],
        },
      ],
    },
  ];
};
