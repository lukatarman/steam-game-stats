import { JSDOM } from "jsdom";
import { Players } from "../../../models/players.js";

export function addCurrentPlayersFromSteam(players, games) {
  return games.map((game, i) => {
    game.playerHistory.push(new Players(players[i]));
    return game;
  });
}

export function addPlayerHistoriesFromSteamcharts(gamesPagesMap) {
  const games = [];
  for (const [game, page] of gamesPagesMap) {
    if (page !== "") game.playerHistory = parsePlayerHistory(page);
    games.push(game);
  }
  return games;
}

export function parsePlayerHistory(pageHttpDetailsHtml) {
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
        new Players(element.nextElementSibling.textContent, element.textContent),
    );
}
