import { JSDOM } from "jsdom";
import { TrackedPlayers } from "../../../models/tracked.players.js";

export function addCurrentPlayersFromSteam(players, games) {
  return games.map((game, i) => game.addOnePlayerHistoryEntry(players[i]));
}

export function addPlayerHistoriesFromSteamcharts(gamesPagesMap) {
  const games = [];
  for (const [game, page] of gamesPagesMap) {
    if (page !== "") {
      const parsedGameHistories = parseGameHistories(page);
      const fixedGameHistories = Players.manyFromSteamchartsPage(parsedGameHistories);

      fixedGameHistories.forEach((history) => {
        game.playerHistory.push(history);
      });

      game.playerHistory = sortGameHistoriesByDate(game.playerHistory);
    }

    games.push(game);
  }
  return games;
}

function sortGameHistoriesByDate(gameHistories) {
  const sortedHistories = [...gameHistories];

  sortedHistories.sort((a, b) => {
    const dateA = new Date(a.year, a.month);
    const dateB = new Date(b.year, b.month);

    return dateA - dateB;
  });

  return sortedHistories;
}

function parseGameHistories(pageHttpDetailsHtml) {
  const dom = new JSDOM(pageHttpDetailsHtml);
  const playerHistoryEntries = dom.window.document.querySelectorAll(
    ".common-table tbody tr",
  );

  // Here, reverse is added so that the player history dates are put in the correct order. The dates of the "current players" array
  // will be displayed from oldest to newest. This means that pushing our own information on current players will stay consistent
  // with the previous oldest-newest date ordering.

  return Array.from(playerHistoryEntries)
    .reverse()
    .map((entry) => entry.firstElementChild)
    .filter((firstElement) => firstElement.textContent !== "Last 30 Days")
    .map(
      (element) =>
        new TrackedPlayers(element.nextElementSibling.textContent, element.textContent),
    );
}
