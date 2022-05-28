import { JSDOM } from "jsdom";
import { Players } from "../../models/players.js";

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
 * @todo add tests
 */
export function addPlayerHistoriesFromSteamcharts(pages, games) {
  return games.map((game, i) => {
    if(pages[i] !== "") game.playerHistory = parsePlayerHistory(pages[i]);
    game.checkedSteamchartsHistory = true;
    return game;
  });
}

export function parsePlayerHistory(pageHttpDetailsHtml) {
  const dom = new JSDOM(pageHttpDetailsHtml);
  const playerHistoryEntries = dom.window.document.querySelectorAll(".common-table tbody tr");

  return Array.from(playerHistoryEntries)
              .map(entry => entry.firstElementChild)
              .filter(firstElement => firstElement.textContent !== "Last 30 Days")
              .map(element => new Players(element.nextElementSibling.textContent, element.textContent));
}
