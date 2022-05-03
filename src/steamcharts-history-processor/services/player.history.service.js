import { JSDOM } from "jsdom";

export function parsePlayerHistory(pageHttpDetails) {
    const dom = new JSDOM(pageHttpDetails.data);
    const playerHistoryEntries = dom.window.document.querySelectorAll(".common-table tbody tr");

    const gamePlayerHistories = [];
    
    for(let entry of playerHistoryEntries) {
        if(entry.firstElementChild.textContent === "Last 30 Days") continue;
    
        const monthAndYear = entry.firstElementChild.textContent.split(" ");
        const month = monthAndYear[0];
        const year = monthAndYear[1];

        const averagePlayers = parseInt(entry.firstElementChild.nextElementSibling.textContent);

        const date = new Date(`${month} ${year}`);

        const playerHistory = {
            date: date,
            players: averagePlayers,
        }

        gamePlayerHistories.push(playerHistory);
    }

    return gamePlayerHistories;
}