import { crawlCheckIfGameMOCK } from "./website.crawler";

export async function sanitizeGamesList(gamesNameFiltered, removeNonGames) {
  let games = [];
  // for each game call steamcharts and check if the game has a page - here we will need a page crawler
  gamesNameFiltered.forEach((gameNameFiltered) => {
    if (await crawlCheckIfGameMOCK) {
      gameNameFiltered.push(games);
    }
  });
  // update game object property "game" with true or false
  // store each game to the database
  return games;
}
