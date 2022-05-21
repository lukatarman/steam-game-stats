import { JSDOM } from "jsdom";
import { Players } from "../../models/players.js";

export function parsePlayerHistory(pageHttpDetailsHtml) {
  const dom = new JSDOM(pageHttpDetailsHtml);
  const playerHistoryEntries = dom.window.document.querySelectorAll(".common-table tbody tr");
  const myArray = Array.from(playerHistoryEntries);

  return myArray.map(entry => entry.firstElementChild)
                .map(firstElement => firstElement.textContent === "Last 30 Days" ? undefined: firstElement)
                .filter(element => !!element)
                .map(element => new Players(new Date(element.textContent), parseFloat(parseFloat(element.nextElementSibling.textContent).toFixed(1))));
}