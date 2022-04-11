import { crawlCheckIfGame } from "./website.crawler";

export async function sanitizeGamesListMOCK(gamesNameFiltered, removeNonGames) {
  // for each game call steamcharts and check if the game has a page - here we will need a page crawler
  gamesNameFiltered.forEach((game) => {
    if (!crawlCheckIfGame) {
      game.isGame = false;
    }
  });
  // update game object property "game" with true or false
  // store each game to the database
  return games;
}
