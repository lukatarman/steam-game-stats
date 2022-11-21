import {
  addCurrentPlayersFromSteam,
  addPlayerHistoriesFromSteamcharts,
} from "./player.history.service.js";
import { TrackedPlayers } from "../../../models/tracked.players.js";
import { Players } from "../../../models/players.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";

describe("player.history.service.js", function () {
  describe(".addCurrentPlayersFromSteam adds the current players to the games object and calculates the average players. So,", function () {
    describe("when the game's 'playerHistory' array is empty, this.result[0].playerHistory[0]'", function () {
      beforeEach(function () {
        this.playersFromSteam = ["32"];

        this.games = [
          {
            id: 1,
            name: "Random Game",
            playerHistory: [],
          },
        ];

        this.result = addCurrentPlayersFromSteam(this.playersFromSteam, this.games);
      });

      it("is an instance of Players", function () {
        expect(this.result[0].playerHistory[0]).toBeInstanceOf(Players);
      });
      it("has a property called 'average players', which equals '32.0'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(32.0);
      });
      it("has a property called 'tracked players'. Its first array entry is an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].playerHistory[0].trackedPlayers[0]).toBeInstanceOf(
          TrackedPlayers,
        );
      });
    });

    describe("when the game's 'playerHistory' array includes this month's entry, 'this.results[0].playerHistory[0]'", function () {
      beforeEach(function () {
        this.playersFromSteam = ["32"];

        this.games = [
          {
            id: 1,
            name: "Random Game",
            playerHistory: [Players.newMonthlyEntry()],
          },
        ];

        this.games[0].playerHistory[0].trackedPlayers.push(new TrackedPlayers("23"));
        this.games[0].playerHistory[0].trackedPlayers.push(new TrackedPlayers("66"));

        this.result = addCurrentPlayersFromSteam(this.playersFromSteam, this.games);
      });

      it("is an instance of Players", function () {
        expect(this.result[0].playerHistory[0]).toBeInstanceOf(Players);
      });
      it("has a property called 'average players', which equals '40.3'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(40.3);
      });
      it("is an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].playerHistory[0].trackedPlayers[0]).toBeInstanceOf(
          TrackedPlayers,
        );
      });
    });

    describe("when the game's 'playerHistory' array is not empty, and it does not include this month's entry, 'this.results[0].", function () {
      beforeEach(function () {
        this.playersFromSteam = ["32"];
        this.date = new Date("2021");

        this.games = [
          {
            id: 1,
            name: "Random Game",
            playerHistory: [
              {
                year: this.date.getFullYear(),
                month: this.date.getMonth(),
                averagePlayers: 0,
                trackedPlayers: [new TrackedPlayers("23"), new TrackedPlayers("66")],
              },
            ],
          },
        ];

        this.result = addCurrentPlayersFromSteam(this.playersFromSteam, this.games);
      });

      it("playerHistory[0]' has a property called 'average players', which equals '0'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(0);
      });
      it("playerHistory[0]' has a property called 'tracked players' its first array entry is an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].playerHistory[0].trackedPlayers[0]).toBeInstanceOf(
          TrackedPlayers,
        );
      });
      it("playerHistory[1]' is an instance of Players", function () {
        expect(this.result[0].playerHistory[1]).toBeInstanceOf(Players);
      });
    });
  });

  describe(".addPlayerHistoriesFromSteamcharts uses the gamesPagesMap to add the player histories to each entry in the games array, and then returns it. So,", function () {
    describe("if the gamesPagesMap includes Elden Ring's player history, 'this.result[0].", function () {
      beforeEach(function () {
        this.map = new Map();
        this.page = eldenRingHttpDetailsSteamcharts;

        this.game = {
          id: 1,
          name: "Elden Ring",
          playerHistory: [],
        };

        this.map.set(this.game, this.page);

        this.result = addPlayerHistoriesFromSteamcharts(this.map);
      });

      it("playerHistory[0]' is an instance of 'Players'", function () {
        expect(this.result[0].playerHistory[0]).toBeInstanceOf(Players);
      });
      it("playerHistory[0]' has a property called 'year', which equals '2022'", function () {
        expect(this.result[0].playerHistory[0].year).toBe(2022);
      });
      it("playerHistory[0]' has a property called 'month', which equals '2'", function () {
        expect(this.result[0].playerHistory[0].month).toBe(2);
      });
      it("playerHistory[0]' has a property called 'averagePlayers', which equals '522066.4'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(522066.4);
      });
      it("playerHistory[1]' has a property called month, which equals '3'", function () {
        expect(this.result[0].playerHistory[1].month).toBe(3);
      });
      it("playerHistory[1]' has a property called averagePlayers, which equals '211468.9'", function () {
        expect(this.result[0].playerHistory[1].averagePlayers).toBe(211468.9);
      });
    });
  });
});
