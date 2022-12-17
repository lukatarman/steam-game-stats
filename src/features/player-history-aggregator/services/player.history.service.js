import { JSDOM } from "jsdom";
import { PlayerHistory } from "../../../models/player.history.js";
import { TrackedPlayers } from "../../../models/tracked.players.js";

//todo
//  .parseGameHistories should instantiate playersHistory class
//  in playersHistory class, trackedPlayers should not be empty. Run it through trackedPlayers and calculate average based on one entry

export function addCurrentPlayersFromSteam(players, games) {
  return games.map((game, i) => game.addOnePlayerHistoryEntry(players[i]));
}

export function addPlayerHistoriesFromSteamcharts(gamesPagesMap) {
  const games = [];
  for (const [game, page] of gamesPagesMap) {
    if (page === "") {
      games.push(game);
      continue;
    }

    const parsedGameHistories = parseGameHistories(page);
    game.addHistoryFromSteamcharts(parsedGameHistories);

    games.push(game);
  }

  return games;
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
    .map((element) =>
      PlayerHistory.fromPlayerHistoryService({
        players: element.nextElementSibling.textContent,
        date: element.textContent,
      }),
    );
}
