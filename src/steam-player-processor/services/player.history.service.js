import { JSDOM } from "jsdom";

export function parsePlayerHistory(pageHttpDetails) {
    const dom = new JSDOM(pageHttpDetails.data);
    const playerHistoryEntries = dom.window.document.querySelector(".common-table tbody").children;

    const playerHistories = [];
    
    for(let entry of playerHistoryEntries) {
        if(entry[0].textContent === "Last 30 Days") continue;
    
        const monthAndYear = entry[0].textContent.split(" ");
        const month = monthAndYear[0];
        const year = monthAndYear[1];

        const averagePlayers = parseInt(entry[1].textContent);

        const date = new Date(`${month} ${year}`);

        const playerHistory = {
            date: date,
            players: averagePlayers,
        }

        playerHistories.push(playerHistory);
    }

    return playerHistories;
}