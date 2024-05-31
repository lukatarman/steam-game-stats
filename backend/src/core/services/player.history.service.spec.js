import { addPlayerHistoriesFromSteamcharts } from "./player.history.service.js";
import { Game } from "../models/game.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../assets/steamcharts-html-details-pages/elden.ring.multiple.histories.html.details.page.js";
import { crushTheCastleHtmlDetailsSteamcharts } from "../../../assets/steamcharts-html-details-pages/crush.the.castle.legacy.collection.html.details.page.js";
import { PlayerHistory } from "../models/player.history.js";
import { getXGamesWithoutDetails } from "../models/game.mocks.js";

describe("player.history.service.js", function () {
  describe(".addPlayerHistoriesFromSteamcharts adds the player histories from Steamcharts to each game object", function () {
    describe("When a map of games and its corresponding Steamcharts pages is provided the player histories are parsed from the pages, so that", function () {
      beforeAll(function () {
        const map = new Map();
        const firstPage = eldenRingHttpDetailsSteamcharts;
        const secondPage = crushTheCastleHtmlDetailsSteamcharts;

        const games = getXGamesWithoutDetails(2);

        const instantiatedFirstGame = Game.fromDbEntry(games[0]);
        const instantiatedSecondGame = Game.fromDbEntry(games[1]);

        map.set(instantiatedFirstGame, firstPage);
        map.set(instantiatedSecondGame, secondPage);

        this.result = addPlayerHistoriesFromSteamcharts(map);
      });

      it("the result is a list of games", function () {
        expect(this.result[0]).toBeInstanceOf(Game);
        expect(this.result[1]).toBeInstanceOf(Game);
      });
      it("the first result's playerHistory value has a length of 2", function () {
        expect(this.result[0].playerHistory.length).toBe(2);
      });
      it("the resulting playerHistory property is an instance of PlayerHistory", function () {
        expect(this.result[0].playerHistory[0]).toBeInstanceOf(PlayerHistory);
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
      beforeAll(function () {
        const map = new Map();

        map.set(getXGamesWithoutDetails(1)[0], "");

        this.result = addPlayerHistoriesFromSteamcharts(map);
      });

      it("no change to the player history entry of a game is made", function () {
        expect(this.result[0].playerHistory).toEqual([]);
      });
    });
  });
});
