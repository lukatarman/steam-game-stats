import { addPlayerHistoriesFromSteamcharts } from "./player.history.service.js";
import { Game } from "../../../models/game.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";
import { crushTheCastleHtmlDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/crush.the.castle.legacy.collection.html.details.page.js";

describe("player.history.service.js", function () {
  describe(".addPlayerHistoriesFromSteamcharts adds the player histories from Steamcharts to each game object", function () {
    describe("When a map of games and its corresponding Steamcharts pages is provided the player histories are parsed from the pages, so that", function () {
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
        debugger;
      });

      it("the result is a list of games", function () {
        expect(this.result[0]).toBeInstanceOf(Game);
        expect(this.result[1]).toBeInstanceOf(Game);
      });
      it("the first result's playerHistory value has a length of 2", function () {
        expect(this.result[0].playerHistory.length).toBe(2);
      });
      it("the first result has an averagePlayers value of '522066.4'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(522066.4);
      });
      it("the second result's playerHistory value has a length of 2", function () {
        expect(this.result[1].playerHistory.length).toBe(2);
      });
      it("the second result has an averagePlayers value of '7.5'", function () {
        expect(this.result[1].playerHistory[0].averagePlayers).toBe(7.5);
      });
    });

    describe("When the gamesPagesMap's page value is an empty string", function () {
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
