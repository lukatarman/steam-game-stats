import {
  addCurrentPlayersFromSteam,
  addPlayerHistoriesFromSteamcharts,
} from "./player.history.service.js";
import { Players } from "../../../models/players.js";
import { Game } from "../../../models/game.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";

describe("player.history.service.js", function () {
  describe(".addCurrentPlayersFromSteam runs addOnePlayerHistoryEntry on each value of the provided games array.", function () {
    describe("When the games array includes games,", function () {
      beforeEach(function () {
        this.firstGame = { id: 1, name: "Game 1", playerHistory: [] };
        this.SecondGame = { id: 2, name: "Game 2", playerHistory: [] };

        this.players = [55, 45];

        this.games = [
          Game.fromDbEntry(this.firstGame),
          Game.fromDbEntry(this.SecondGame),
        ];

        this.result = addCurrentPlayersFromSteam(this.players, this.games);
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });
      it("the first result has a value of average players, which is 55", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(55);
      });
      it("the second result has a value of average players, which is 45", function () {
        expect(this.result[1].playerHistory[0].averagePlayers).toBe(45);
      });
    });

    fdescribe("When the players array is full of zeroes", function () {
      beforeEach(function () {
        this.firstGame = { id: 1, name: "Game 1", playerHistory: [] };
        this.SecondGame = { id: 2, name: "Game 2", playerHistory: [] };

        this.games = [
          Game.fromDbEntry(this.firstGame),
          Game.fromDbEntry(this.SecondGame),
        ];

        this.players = [0, 0];

        this.result = addCurrentPlayersFromSteam(this.players, this.games);
      });
      it("the result is an empty array", function () {
        expect(this.result.length).toBe(2);
      });
      it("the first result has a property 'averagePlayers', which equals 0", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(0);
      });
      it("the second result has a property 'averagePlayers', which equals 0", function () {
        expect(this.result[1].playerHistory[0].averagePlayers).toBe(0);
      });
    });
  });

  //todo continue here

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

    describe("if the gamesPagesMap includes Elden Ring's player history, and the playerHistory already contains even more recent histories 'this.result[0].", function () {
      beforeEach(function () {
        this.map = new Map();
        this.page = eldenRingHttpDetailsSteamcharts;

        this.game = {
          id: 1,
          name: "Elden Ring",
          playerHistory: [
            {
              year: 2022,
              month: 11,
            },
          ],
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
      it("playerHistory[2]' has a property called year, which equals '2022'", function () {
        expect(this.result[0].playerHistory[2].year).toBe(2022);
      });
      it("playerHistory[2]' has a property called month, which equals '11'", function () {
        expect(this.result[0].playerHistory[2].month).toBe(11);
      });
    });

    describe("when the gamesPagesMap's page value is an empty array", function () {
      beforeEach(function () {
        this.map = new Map();

        this.game = {
          id: 1,
          name: "Elden Ring",
          playerHistory: [],
        };

        this.map.set(this.game, []);

        this.result = addPlayerHistoriesFromSteamcharts(this.map);
      });

      it("the playerHistory value is an empty array", function () {
        expect(this.result[0].playerHistory).toEqual([]);
      });
    });
  });
});
