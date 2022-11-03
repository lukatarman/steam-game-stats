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
    const indexOfExistingDate = getIndexOfExistingDate(
      yearAndMonth,
      playerHistoryGroupedByMonth
    );

    if (indexOfExistingDate === -1) {
      playerHistoryGroupedByMonth.push({
        date: yearAndMonth,
        players: [players],
      });
    } else {
      playerHistoryGroupedByMonth[indexOfExistingDate].players.push(players);
    }
  });

  return playerHistoryGroupedByMonth;
}

function getIndexOfExistingDate(yearAndMonth, playerHistoryFixed) {
  return playerHistoryFixed.findIndex((history) => history.date === yearAndMonth);
}

function calculateHistoriesAveragePlayers(historiesGroupedByMonth) {
  return historiesGroupedByMonth.map(({ date, players }) => {
    const averagePlayers = parseFloat(
      (
        players.reduce((previous, current) => previous + current) / players.length
      ).toFixed(1)
    );

    const averagePlayersThousandsSeparated = averagePlayers.toLocaleString("en-US");

    return {
      date,
      players: averagePlayersThousandsSeparated,
    };
  });
}
