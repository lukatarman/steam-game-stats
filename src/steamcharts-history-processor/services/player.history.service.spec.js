import { parsePlayerHistory } from "./player.history.service.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../assets/http.details.page.steamcharts.data.set.js";

describe("player.history.service.js", () => {
  describe(".parsePlayerHistory", () => {
    describe("if the first entry is 'Last 30 Days', and the game is Elden Ring", () => {
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
  });
});
