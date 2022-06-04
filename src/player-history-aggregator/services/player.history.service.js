import { JSDOM } from "jsdom";
import { Players } from "../../models/players.js";
import { HistoryCheck } from "../../models/history.check.js";

/**
 * @todo add tests
 */
export function addCurrentPlayersFromSteam(players, games) {
  return games.map((game, i) => {
    game.playerHistory.push(new Players(players[i]));
    return game;
  });
}

/**
 * @todo consider making a static factory on the HistoryCheck class
 */
export function recordSteamchartPlayerHistoryCheck(gamesPagesMap) {
  const historyChecks = [];
  for (const [game, page] of gamesPagesMap) {
    historyChecks.push(HistoryCheck.fromSteamcharts(game, !!page));
  }
  return historyChecks;
}

/**
 * @todo consider making a setter on the Games class
 */
export function addPlayerHistoriesFromSteamcharts(gamesPagesMap) {
  const games = [];
  for (const [game, page] of gamesPagesMap) {
    if(page !== "") game.playerHistory = parsePlayerHistory(page);
    games.push(game);
  }
  return games;
}

/**
 * @todo consider making a static factory on the Player class
 */
export function parsePlayerHistory(pageHttpDetailsHtml) {
  const dom = new JSDOM(pageHttpDetailsHtml);
  const playerHistoryEntries = dom.window.document.querySelectorAll(".common-table tbody tr");

  return Array.from(playerHistoryEntries)
              .map(entry => entry.firstElementChild)
              .filter(firstElement => firstElement.textContent !== "Last 30 Days")
              .map(element => new Players(element.nextElementSibling.textContent, element.textContent));
}
