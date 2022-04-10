// data model which will be stored to the database and represents one game
export class Game {
  id; // appid=123456
  name; // name="Metro"
  imageUrl; // imgUrl="https://www.some.url.com/gameimgname.png"
  image; // imgData=['D%', '7Z', 'HJ', ')I', 'LK'...'M;'];
  playerHistory; // playerHistory=[{ date: "05.04.22", players: 122 }, { date: "04.04.22", players: 200 }, { date: "03.04.22", players: 150 }]
}
