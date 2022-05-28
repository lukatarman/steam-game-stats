import { JSDOM } from "jsdom";
import { Players } from "../../models/players.js";

export function parsePlayerHistory(pageHttpDetailsHtml) {
  const dom = new JSDOM(pageHttpDetailsHtml);
  const playerHistoryEntries = dom.window.document.querySelectorAll(".common-table tbody tr");

  return Array.from(playerHistoryEntries)
              .map(entry => entry.firstElementChild)
              .filter(firstElement => firstElement.textContent !== "Last 30 Days")
              .map(element => new Players(element.nextElementSibling.textContent, element.textContent));
}
