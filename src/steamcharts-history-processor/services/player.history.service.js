import { JSDOM } from "jsdom";

export function parsePlayerHistory(pageHttpDetailsHtml) {
  const dom = new JSDOM(pageHttpDetailsHtml);
  const playerHistoryEntries = dom.window.document.querySelectorAll(".common-table tbody tr");
  const myArray = Array.from(playerHistoryEntries);

  return myArray.map(entry => {
    const firstElement = entry.firstElementChild;
  
    if(firstElement.textContent === "Last 30 Days") return;
  
    const averagePlayers = parseFloat(firstElement.nextElementSibling.textContent).toFixed(1);
      
    const monthAndYear = firstElement.textContent;
    const date = new Date(monthAndYear);

    return {
        date,
        players: parseFloat(averagePlayers),
    }
  }).filter(history => !!history);
}