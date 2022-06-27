import { parsePlayerHistory } from "./player.history.service.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";
import { sniperEliteHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/sniper.elite.just.released.html.details.page.js";

describe("player.history.service.js", () => {
  describe(".parsePlayerHistory", () => {
    describe("if the game has multiple histories", () => {
      let playerHistories;

      beforeAll(() => {
        playerHistories = parsePlayerHistory(eldenRingHttpDetailsSteamcharts);
      });

      it("playerHistories has two entries", () => {
        expect(playerHistories.length).toBe(2);
      });

      it("the first entries' player amount is 211468", () => {
        expect(playerHistories[0].players).toBe(211468.9);
      });

      it("the first entries' month is March", () => {
        expect(playerHistories[0].date.getMonth()).toBe(3);
      });

      it("the first entries' year is 2022", () => {
        expect(playerHistories[0].date.getFullYear()).toBe(2022);
      });
    });

    describe("if the game has just been released and only has one history", () => {
      let playerHistories;

      beforeAll(() => {
        playerHistories = parsePlayerHistory(sniperEliteHttpDetailsSteamcharts);
      });

      it("it returns an empty array", () => {
        expect(playerHistories).toEqual([]);
      });
    });
  });
});
