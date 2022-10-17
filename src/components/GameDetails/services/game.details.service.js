import { monthToString } from "../../../utils/dates.js";

export function fixHistories(playerHistory) {
  const historiesGroupedByMonth = grounpHistoriesByMonth(playerHistory);

  return calculateHistoriesAveragePlayers(historiesGroupedByMonth);
}

function grounpHistoriesByMonth(playerHistory) {
  let playerHistoryFixed = [];

  playerHistory.reverse();
  playerHistory.forEach((history) => {
    const date = new Date(history.date);
    const month = monthToString(date.getMonth());
    const year = date.getFullYear();
    const yearAndMonth = `${year} ${month}`;
    const players = history.players;
    const index = existingIndexOfMonth(yearAndMonth, playerHistoryFixed);

    if (index === -1) {
      playerHistoryFixed.push({
        date: `${year} ${month}`,
        players: [players],
      });
    } else {
      playerHistoryFixed[index].players.push(players);
    }
  });

  return playerHistoryFixed;
}

function existingIndexOfMonth(yearAndMonth, playerHistoryFixed) {
  return playerHistoryFixed.findIndex((history) => history.date === yearAndMonth);
}

function calculateHistoriesAveragePlayers(historiesGroupedByMonth) {
  return historiesGroupedByMonth.map(({ date, players }) => {
    if (players.length <= 1) {
      return {
        date,
        players: players[0],
      };
    }

    const averagePlayers = parseFloat(
      (
        players.reduce((previous, current) => previous + current) / players.length
      ).toFixed(1)
    );

    return {
      date,
      players: averagePlayers,
    };
  });
}
