const axios = require('axios');

axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v1')
  .then((response) => {
    // handle success
    console.log('List of games from steam:', response.data);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .then(() => {
    // always executed
  });

setTimeout(() => console.log('start steam game stats runtime - entry point'), 5000);
