import { monthToString } from "../../../utils/dates.js";

export function fixHistories(playerHistory) {
  const historiesGroupedByMonth = groupHistoriesByMonth(playerHistory);

  return calculateHistoriesAveragePlayers(historiesGroupedByMonth);
}

function groupHistoriesByMonth(playerHistory) {
  let playerHistoryGroupedByMonth = [];

  playerHistory.reverse().forEach((history) => {
    const date = new Date(history.date);
    const yearAndMonth = `${monthToString(date.getMonth())} ${date.getFullYear()}`;
    const players = history.players;
    const index = getIndexOfExistingDate(yearAndMonth, playerHistoryGroupedByMonth);

    if (index === -1) {
      playerHistoryGroupedByMonth.push({
        date: yearAndMonth,
        players: [players],
      });
    } else {
      playerHistoryGroupedByMonth[index].players.push(players);
    }
  });

  return playerHistoryGroupedByMonth;
}

function getIndexOfExistingDate(yearAndMonth, playerHistoryFixed) {
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
