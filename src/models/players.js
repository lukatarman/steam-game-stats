export class Players {
  date;    // date=new Date('exact time when player numbers are collected');
  players; // players=0..n

  constructor(date, players) {
    this.date = date;
    this.players = players;
  }
}

