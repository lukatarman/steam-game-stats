import { crawlCheckIfGameMOCK } from "./website.crawler";

export async function sanitizeGamesList(gamesNameFiltered) {
  // for each game call steamcharts and check if the game has a page - here we will need a page crawler
  // update game object property "game" with true or false
  // store each game to the database

  // let games = [];
  // gamesNameFiltered.forEach((gameNameFiltered) => {
  //   if (await crawlCheckIfGameMOCK) {
  //     gameNameFiltered.push(games);
  //   }
  // });
  // return games;

  return gamesNameFiltered.filter(
    (gameNameFiltered) => await crawlCheckIfGameMOCK(gameNameFiltered)
  );
}
