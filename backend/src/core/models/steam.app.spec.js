import { gamesMock } from "../../../assets/small.data.set.js";
import { smallestGamesMock } from "../../../assets/smallest.data.set.js";
import { ValidDataSources } from "./valid.data.sources.js";
import { SteamApp } from "./steam.app.js";
import { getXSampleSteamApps } from "./steam.app.mocks.js";

describe("SteamApp", function () {
  describe(".copy", function () {
    describe("creates a copy of a steamApp instance. When this is done,", function () {
      beforeAll(function () {
        this.app = {
          name: "Castlevania",
          appid: 1,
        };

        this.instantiatedApp = SteamApp.oneFromSteamApi(this.app);

        this.result = this.instantiatedApp.copy();
      });

      it("the copy is an instance of SteamApp", function () {
        expect(this.result).toBeInstanceOf(SteamApp);
      });

      it("the copy has a property 'type', which is 'unknown'", function () {
        expect(this.result.type).toBe(SteamApp.validTypes.unknown);
      });

      it("the copy has a property 'triedVia', which is an empty array", function () {
        expect(this.result.triedVia).toEqual([]);
      });

      it("the copy has a property 'failedVia', which is an empty array", function () {
        expect(this.result.failedVia).toEqual([]);
      });
    });
  });

  describe(".triedIfGameViaSource", function () {
    describe("via steamWeb", function () {
      describe("if the steamApp's triedVia doesn't already include steamWeb", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.triedIfGameViaSource(this.source);
        });

        it("the steam app is mark as tried via steam web", function () {
          expect(this.steamApp.triedVia.length).toBe(1);
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });
      });

      describe("if the steamApp's triedVia already includes steamWeb", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.triedIfGameViaSource(this.source);
          this.steamApp.triedIfGameViaSource(this.source);
        });

        it("the steam app is mark as tried via steam web", function () {
          expect(this.steamApp.triedVia.length).toBe(1);
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });
      });
    });

    describe("via steamcharts", function () {
      describe("if the steamApp's triedVia doesn't already include steamcharts", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamcharts;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.triedIfGameViaSource(this.source);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.triedVia.length).toBe(1);
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });
      });

      describe("if the steamApp's triedVia already includes steamcharts", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamcharts;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.triedIfGameViaSource(this.source);
          this.steamApp.triedIfGameViaSource(this.source);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.triedVia.length).toBe(1);
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });
      });
    });
  });

  describe(".htmlPageFailedViaSource", function () {
    describe("via steamWeb", function () {
      describe("if the steamApp's failedVia doesn't already include steamWeb", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.htmlPageFailedViaSource(this.source);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.failedVia.length).toBe(1);
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });

      describe("if the steamApp's failedVia already includes steamWeb", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.htmlPageFailedViaSource(this.source);
          this.steamApp.htmlPageFailedViaSource(this.source);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.failedVia.length).toBe(1);
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });
    });

    describe("via steamcharts", function () {
      describe("if the steamApp's failedVia doesn't already include steamcharts", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamcharts;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.htmlPageFailedViaSource(this.source);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.failedVia.length).toBe(1);
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });

      describe("if the steamApp's failedVia already includes steamcharts", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamcharts;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.htmlPageFailedViaSource(this.source);
          this.steamApp.htmlPageFailedViaSource(this.source);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.failedVia.length).toBe(1);
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });
    });
  });

  describe(".appType", function () {
    describe("sets the 'type' property to whatever was passed in as an argument. When this is done,", function () {
      beforeAll(function () {
        this.app = {
          name: "Castlevania",
          appid: 1,
        };

        this.type = SteamApp.validTypes.game;

        this.result = SteamApp.oneFromSteamApi(this.app);

        this.result.appType = this.type;
      });

      it("the 'type' property equals 'game'", function () {
        expect(this.result.type).toBe(SteamApp.validTypes.game);
      });
    });
  });

  describe(".manyFromSteamApi returns an array of SteamApp instances.", function () {
    describe("When two apps are passed into it,", function () {
      beforeAll(function () {
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
  });

  describe(".oneFromSteamApi returns an instance of steamApp.", function () {
    describe("When an 'app' object is passed in, the returned instance", function () {
      beforeAll(function () {
        this.app = {
          name: "Castlevania",
          appid: 1,
        };

        this.result = SteamApp.oneFromSteamApi(this.app);
      });

      it("is an instance of SteamApp", function () {
        expect(this.result).toBeInstanceOf(SteamApp);
      });

      it("has a property called 'type'. It is 'unknown'", function () {
        expect(this.result.type).toBe(SteamApp.validTypes.unknown);
      });

      it("has a property called 'triedVia'. It is an empty array.", function () {
        expect(this.result.triedVia).toEqual([]);
      });

      it("has a property called 'failedVia'. It is an empty array.", function () {
        expect(this.result.failedVia).toEqual([]);
      });
    });
  });

  describe(".manyFromDbEntries returns an array of SteamApp instances.", function () {
    describe("When dbEntries is passed into it,", function () {
      beforeAll(function () {
        this.dbEntries = [
          {
            name: "Castlevania",
            appid: 1,
            type: "game",
            triedVia: [
              ValidDataSources.validDataSources.steamWeb,
              ValidDataSources.validDataSources.steamcharts,
            ],
            failedVia: [ValidDataSources.steam],
          },
          {
            name: "Elden Ring",
            appid: 2,
            type: "game",
            triedVia: [
              ValidDataSources.validDataSources.steamWeb,
              ValidDataSources.validDataSources.steamDb,
            ],
            failedVia: [ValidDataSources.validDataSources.steamWeb],
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
  });

  describe(".oneFromDbEntry returns an instance of SteamApp.", function () {
    describe("When a dbEntry is passed in, the resulting SteamApp instance", function () {
      beforeAll(function () {
        this.dbEntry = {
          name: "Castlevania",
          appid: 1,
          type: "game",
          triedVia: [ValidDataSources.validDataSources.steamWeb],
          failedVia: [ValidDataSources.validDataSources.steamWeb],
        };

        this.result = SteamApp.oneFromDbEntry(this.dbEntry);
      });

      it("is an instance of SteamApp", function () {
        expect(this.result).toBeInstanceOf(SteamApp);
      });

      it("has a property called 'triedVia with a single entry", function () {
        expect(this.result.triedVia.length).toBe(1);
      });

      it("has the entry 'steam' in the 'triedVia' array", function () {
        expect(this.result.triedVia[0]).toBe(ValidDataSources.validDataSources.steamWeb);
      });

      it("contains a copy of the dbEntry.triedVia property", function () {
        this.dbEntry.triedVia = [ValidDataSources.validDataSources.steamcharts];
        expect(this.dbEntry.triedVia[0]).not.toBe(this.result.triedVia[0]);
      });

      it("has the entry 'steam' in the 'failedVIa' array", function () {
        expect(this.result.failedVia[0]).toBe(ValidDataSources.validDataSources.steamWeb);
      });

      it("contains a copy of the dbEntry.failed property", function () {
        this.dbEntry.failedVia = [ValidDataSources.validDataSources.steamcharts];
        expect(this.dbEntry.failedVia[0]).not.toBe(this.result.failedVia[0]);
      });

      it("contains a copy of the dbEntry.triedVia property. All of values of this property are strings", function () {
        this.areValuesStrings = this.result.triedVia.every(
          (value) => typeof value === "string",
        );

        expect(this.areValuesStrings).toBeTrue();
      });
    });
  });

  describe(".diff", function () {
    describe("finds the diff of two arrays of steam apps successfully in a big data set", function () {
      beforeAll(function () {
        this.array = SteamApp.diff(gamesMock, smallestGamesMock);
      });

      it("returns an array with the differences between the arrays", function () {
        expect(this.array.length).toBe(205);
      });
    });

    describe("finds the diff of two arrays of steam apps in a tiny data set", function () {
      beforeAll(function () {
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
