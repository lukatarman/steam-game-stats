import {
  addCurrentPlayersFromSteam,
  addPlayerHistoriesFromSteamcharts,
} from "./player.history.service.js";
import { Game } from "../../../models/game.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";
import { crushTheCastleHtmlDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/crush.the.castle.legacy.collection.html.details.page.js";

describe("player.history.service.js", function () {
  describe(".addCurrentPlayersFromSteam runs a function on each value of the provided games array.", function () {
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

    describe("When the players array is full of zeroes", function () {
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

  describe(".addPlayerHistoriesFromSteamcharts adds the player histores from Steamcharts to each game object", function () {
    describe("When both gamesPagesMap properties have proper values", function () {
      beforeEach(function () {
        this.map = new Map();
        this.firstPage = eldenRingHttpDetailsSteamcharts;
        this.secondPage = crushTheCastleHtmlDetailsSteamcharts;

        this.firstGame = {
          id: 1,
          name: "Elden Ring",
          playerHistory: [],
        };

        this.secondGame = {
          id: 2,
          name: "Crush The Castle",
          playerHistory: [],
        };

        this.instantiatedFirstGame = Game.fromDbEntry(this.firstGame);
        this.instantiatedSecondGame = Game.fromDbEntry(this.secondGame);

        this.map.set(this.instantiatedFirstGame, this.firstPage);
        this.map.set(this.instantiatedSecondGame, this.secondPage);

        this.result = addPlayerHistoriesFromSteamcharts(this.map);
      });

      it("The first result's playerHistory value has a length of 2", function () {
        expect(this.result[0].playerHistory.length).toBe(2);
      });
      it("The first result has an averagePlayers value of '522066.4'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(522066.4);
      });
      it("The second result's playerHistory value has a length of 2", function () {
        expect(this.result[1].playerHistory.length).toBe(2);
      });
      it("The second result has an averagePlayers value of '7.5'", function () {
        expect(this.result[1].playerHistory[0].averagePlayers).toBe(7.5);
      });
    });

    describe("when the gamesPagesMap's page value is an empty string", function () {
      beforeEach(function () {
        this.map = new Map();

        this.game = {
          id: 1,
          name: "Elden Ring",
          playerHistory: [],
        };

        this.map.set(this.game, "");

        this.result = addPlayerHistoriesFromSteamcharts(this.map);
      });

      it("the playerHistory value is an empty array", function () {
        expect(this.result[0].playerHistory).toEqual([]);
      });
    });
  });
});
