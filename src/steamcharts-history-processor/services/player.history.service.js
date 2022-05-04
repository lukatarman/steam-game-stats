import { JSDOM } from "jsdom";

export function parsePlayerHistory(pageHttpDetailsHtml) {
    const dom = new JSDOM(pageHttpDetailsHtml);
    const playerHistoryEntries = dom.window.document.querySelectorAll(".common-table tbody tr");

    const gamePlayerHistories = [];
    
    for(let entry of playerHistoryEntries) {
        const firstElement = entry.firstElementChild;

        if(entry.firstElementChild.textContent === "Last 30 Days") continue;

        const averagePlayers = parseInt(entry.firstElementChild.nextElementSibling.textContent);
        
        const monthAndYear = entry.firstElementChild.textContent;
        const date = new Date(monthAndYear);

        const playerHistory = {
            date,
            players: averagePlayers,
        }

        gamePlayerHistories.push(playerHistory);
    }

    return gamePlayerHistories;
}