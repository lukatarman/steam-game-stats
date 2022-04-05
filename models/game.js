// data model which will be stored to the database and represents one game
export class Game {
  appid;         // appid=123456
  name;          // name="Metro"
  game;          // game=true|false
  imgUrl;        // imgUrl="https://www.some.url.com/gameimgname.png"
  imgData;       // imgData=['D%', '7Z', 'HJ', ')I', 'LK'...'M;'];
  playerHistory; // playerHistory=[{ date: "05.04.22", players: 122 }, { date: "04.04.22", players: 200 }, { date: "03.04.22", players: 150 }]
}
