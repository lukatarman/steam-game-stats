import { gamesMock } from "../../assets/small.data.set.js";
import { smallestGamesMock } from "../../assets/smallest.data.set.js";
import { SteamApp } from "./steam.app.js";

describe("steam.app.spec.js", function () {
  describe(".manyFromSteamApi returns an array of apps.", function () {
    describe("When two apps are passed into it,", function () {
      beforeEach(function () {
        this.apps = [
          {
            name: "Castlevania",
            appid: 1,
          },
          {
            name: "Elden Ring",
            appid: 2,
          },
        ];

        this.result = SteamApp.manyFromSteamApi(this.apps);
      });

      it("the array length is 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first app is an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
      });

      it("the second app is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });
    });

    describe("When an invalid value is passed into it,", function () {
      beforeEach(function () {
        this.apps = undefined;
      });

      it("throws an error", function () {
        expect(function () {
          SteamApp.app.manyFromSteamApi(this.apps);
        }).toThrowError();
      });
    });
  });

  describe(".oneFromSteamApi returns a variable.", function () {
    describe("When an 'app' object is passed in, 'app' ", function () {
      beforeEach(function () {
        this.app = {
          name: "Castlevania",
          appid: 1,
        };

        this.result = SteamApp.oneFromSteamApi(this.app);
      });

      it("is an instance of SteamApp", function () {
        expect(this.result).toBeInstanceOf(SteamApp);
      });

      it("has a property called 'identified'. It is false", function () {
        expect(this.result.identified).toBe(false);
      });

      it("has a property called 'tiredVia'. It is an empty array.", function () {
        expect(this.result.triedVia).toEqual([]);
      });
    });
  });

  describe(".manyFromDbEntries returns an array of apps.", function () {
    describe("When two apps are passed into it,", function () {
      beforeEach(function () {
        this.apps = [
          {
            name: "Castlevania",
            appid: 1,
            identified: true,
            triedVia: ["steam", "steamcharts"],
          },
          {
            name: "Elden Ring",
            appid: 2,
            identified: true,
            triedVia: ["steam"],
          },
        ];

        this.result = SteamApp.manyFromDbEntries(this.apps);
      });

      it("the returned array length is 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first app is an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
      });

      it("the second app is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });
    });

    describe("When an invalid value is passed into it,", function () {
      it("throws an error", function () {
        this.apps = undefined;

        expect(function () {
          SteamApp.app.manyFromDbEntries(this.apps);
        }).toThrowError();
      });
    });
  });

  describe(".oneFromDbEntry returns a variable.", function () {
    describe("When an app that has been identified via steam is passed in, this app ", function () {
      beforeEach(function () {
        this.app = {
          name: "Castlevania",
          appid: 1,
          identified: true,
          triedVia: ["steam"],
        };

        this.result = SteamApp.oneFromDbEntry(this.app);

        this.app.triedVia = ["steamcharts"];
      });

      it("is an instance of SteamApp", function () {
        expect(this.result).toBeInstanceOf(SteamApp);
      });

      it("has a property called 'tiredVia with a single array", function () {
        expect(this.result.triedVia.length).toBe(1);
      });

      it("has a property called 'tiredVia'. It has the value of 'steam', which is a shallow copy.", function () {
        expect(this.result.triedVia[0]).toBe("steam");
      });

      it("Changing the original array value doesn't change the new instantiated value", function () {
        expect(this.app.triedVia[0]).not.toBe(this.result.triedVia[0]);
      });
    });
  });

  describe(".diff", () => {
    describe("finds the diff of two arrays of steam apps successfully in a big data set", () => {
      let array;

      beforeAll(() => {
        array = SteamApp.diff(gamesMock, smallestGamesMock);
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
        appsFromApi = [
          {
            appid: 9821,
            name: "GTA",
          },
          {
            appid: 21987,
            name: "Metro",
          },
          {
            appid: 34512,
            name: "The Sims",
          },
        ];

        appsFromDb = [
          {
            appid: 21987,
            name: "Metro",
          },
        ];

        resultDiff = SteamApp.diff(appsFromApi, appsFromDb);
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
