const axios = require("axios").default;
import MongoDB from "./database.client.js";

let searchTerm = "swords soldiers 2";
let gameList;
let searchResults = [];
getGameDetails();

async function getGameDetails() {
  const gameListResponse = await getGameList();
  // moved to SteamDataProcessor.createGamesList method
  gameList = gameListResponse.data.applist.apps;

  getSearchResults();

  await addPlayerCountToSearchResults();

  sortRenderResults();
}
// moved to SteamDataProcessor.createGamesList method
async function getGameList() {
  return await axios.get(
    "https://api.steampowered.com/ISteamApps/GetAppList/v2",
    {
      params: {
        key: "79E04F52C6B5AD21266624C05CC12E42",
      },
    }
  );
}

function getSearchResults() {
  let searchTermsArr = searchTerm.match(/[A-Za-z0-9]+/g);
  console.log(searchTermsArr);

  for (let game of gameList) {
    for (let searchTermValue of searchTermsArr) {
      if (game.name.toLowerCase().match(searchTermValue.toLowerCase())) {
        if (game.searchRelevancy === undefined) {
          game.searchRelevancy = 1;
        } else {
          game.searchRelevancy = game.searchRelevancy + 1;
        }
      }
    }

    if (game.searchRelevancy > 1) {
      searchResults.push(game);
    }
  }
  console.log(searchResults);
}

async function addPlayerCountToSearchResults() {
  console.log("Attempting to run addPlayerCount function");
  let promiseArray = [];
  console.log("Attempting to looping through searchResults");

  for (let game of searchResults) {
    promiseArray.push(
      getCurrentPlayers(game).catch(() => {
        console.log(`error detected with app id ${game.appid}`);
        return;
      })
    );
  }
  const results = await Promise.all(promiseArray);

  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      searchResults[i].currentPlayers = results[i].data.response.player_count;
    } else {
      searchResults[i].currentPlayers = null;
    }
  }
}

async function getCurrentPlayers(game) {
  try {
    return axios.get(
      `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${game.appid}`,
      {
        params: {
          key: "79E04F52C6B5AD21266624C05CC12E42",
        },
      }
    );
  } catch (err) {
    console.log = "ERROR DETECTED";
  }
}

function sortRenderResults() {
  console.log(searchResults.length);
  const numberOfResults = searchResults.length < 25 ? searchResults.length : 25;
  console.log("Displaying Search results!!");

  searchResults.sort((a, b) => {
    if (a.searchRelevancy === b.searchRelevancy) {
      return b.currentPlayers < a.currentPlayers ? -1 : 1;
    } else {
      return b.searchRelevancy < a.searchRelevancy ? -1 : 1;
    }
  });

  if (!searchResults.length) {
    console.log(`No results found for: "${searchTerm}"`);
    return;
  }

  for (let i = 0; i < numberOfResults; i++) {
    // if (searchResults[i].currentPlayers == 0) {
    //   return;
    // }
    console.log(
      `Game name: ${searchResults[i].name} \n Number of players: ${searchResults[i].currentPlayers} \n Search Relevancy: ${searchResults[i].searchRelevancy}`
    );
  }
}
