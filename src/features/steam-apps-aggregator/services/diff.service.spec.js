import { gamesMock } from "../../../../assets/small.data.set.js";
import { smallestGamesMock } from "../../../../assets/smallest.data.set.js";
import { diff } from "./diff.service.js";

describe("diff.service.js", () => {
  describe(".diff", () => {
    describe("finds the diff of two arrays of steam apps successfully in a big data set", () => {
      let array;

      beforeAll(() => {
        array = diff(gamesMock, smallestGamesMock);
      });

      it("returns an array with the differences between the arrays", () => {
        expect(array.length).toBe(205);
      });
    });

    describe("finds the diff of two arrays of steam apps in a tiny data set", () => {
      let resultDiff;
      let appsFromApi;
      let appsFromDb;

      beforeAll(() => {
        appsFromApi = [{
          appid: 9821,
          name: "GTA",
        }, {
          appid: 21987,
          name: "Metro",
        }, {
          appid: 34512,
          name: "The Sims",
        }];

        appsFromDb = [{
          appid: 21987,
          name: "Metro",
        }];

        resultDiff = diff(appsFromApi, appsFromDb);
      });

      it("returns an array with the differences between the arrays", () => {
        expect(resultDiff.length).toBe(2);
      });

      it("first entry is GTA", () => {
        expect(resultDiff[0].appid).toBe(appsFromApi[0].appid);
      });

      it("second entry is The sims", () => {
        expect(resultDiff[1].appid).toBe(appsFromApi[2].appid);
      });
    });
  });
});
