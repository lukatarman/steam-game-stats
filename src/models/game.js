// data model which will be stored to the database and represents one game
export class Game {
  #id; // appid=123456
  #name; // name="Metro"
  #image; // imgData=['D%', '7Z', 'HJ', ')I', 'LK'...'M;'];
  #playerHistory; // playerHistory=[{ date: "05.04.22", players: 122 }, { date: "04.04.22", players: 200 }, { date: "03.04.22", players: 150 }]

  constructor(steamApp) {
    this.#id = steamApp.appid;
    this.#name = steamApp.name;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get imageUrl() {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${this.#id}/header.jpg`;
  }

  get image() {
    return this.#image;
  }

  get playerHistory() {
    return this.#playerHistory;
  }
}
