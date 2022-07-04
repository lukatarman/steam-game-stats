import { gamesMock } from "../../assets/small.data.set.js";
import { smallestGamesMock } from "../../assets/smallest.data.set.js";
import { SteamApp } from "./steam.app.js";

describe("SteamApp", function () {
  describe(".manyFromSteamApi returns an array of SteamApp instances.", function () {
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
      it("throws an error", function () {
        expect(function () {
          SteamApp.app.manyFromSteamApi(this.apps);
        }).toThrowError();
      });
    });
  });

  describe(".oneFromSteamApi returns an object.", function () {
    describe("When an 'app' object is passed in, the returned object ", function () {
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

      it("has a property called 'triedVia'. It is an empty array.", function () {
        expect(this.result.triedVia).toEqual([]);
      });
    });
  });

  describe(".manyFromDbEntries returns an array of apps.", function () {
    describe("When two apps are passed into it,", function () {
      beforeEach(function () {
        this.dbEntries = [
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

        this.result = SteamApp.manyFromDbEntries(this.dbEntries);
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
      beforeEach(function () {
        this.apps = undefined;
      });

      it("throws an error", function () {
        expect(function () {
          SteamApp.app.manyFromDbEntries(this.apps);
        }).toThrowError();
      });
    });
  });

  describe(".oneFromDbEntry returns an object.", function () {
    describe("When an 'app' object is passed in, the returned object", function () {
      beforeEach(function () {
        this.dbEntry = {
          name: "Castlevania",
          appid: 1,
          identified: true,
          triedVia: ["steam"],
        };

        this.result = SteamApp.oneFromDbEntry(this.dbEntry);

        this.dbEntry.triedVia = ["steamcharts"];

        this.areValuesStrings = this.result.triedVia.every(
          (value) => typeof value === "string",
        );
      });

      it("is an instance of SteamApp", function () {
        expect(this.result).toBeInstanceOf(SteamApp);
      });

      it("has a property called 'triedVia with a single array", function () {
        expect(this.result.triedVia.length).toBe(1);
      });

      it("has a property called 'triedVia'. It has the value of 'steam'.", function () {
        expect(this.result.triedVia[0]).toBe("steam");
      });

      it("contains a copy of the dbEntry.triedVia property", function () {
        expect(this.dbEntry.triedVia[0]).not.toBe(this.result.triedVia[0]);
      });

      it("contains a copy of the dbEntry.triedVia property. All of values of this property are strings", function () {
        expect(this.areValuesStrings).toBeTrue();
      });
    });
  });

  describe(".diff", function () {
    describe("finds the diff of two arrays of steam apps successfully in a big data set", function () {
      beforeEach(function () {
        this.array = SteamApp.diff(gamesMock, smallestGamesMock);
      });

      it("returns an array with the differences between the arrays", function () {
        expect(this.array.length).toBe(205);
      });
    });

    describe("finds the diff of two arrays of steam apps in a tiny data set", function () {
      beforeEach(function () {
        this.appsFromApi = [
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

        this.appsFromDb = [
          {
            appid: 21987,
            name: "Metro",
          },
        ];

        this.resultDiff = SteamApp.diff(this.appsFromApi, this.appsFromDb);
      });

      it("returns an array with the differences between the arrays", function () {
        expect(this.resultDiff.length).toBe(2);
      });

      it("first entry is GTA", function () {
        expect(this.resultDiff[0].appid).toBe(this.appsFromApi[0].appid);
      });

      it("second entry is The sims", function () {
        expect(this.resultDiff[1].appid).toBe(this.appsFromApi[2].appid);
      });
    });
  });
});
