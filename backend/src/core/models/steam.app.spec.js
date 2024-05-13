import { gamesMock } from "../../../assets/small.data.set.js";
import { smallestGamesMock } from "../../../assets/smallest.data.set.js";
import { ValidDataSources } from "./valid.data.sources.js";
import { SteamApp } from "./steam.app.js";
import { getXSampleSteamApps } from "./steam.app.mocks.js";
import { feartressGameHtmlDetailsPage } from "../../../assets/steam-details-pages/feartress.game.html.details.page.js";
import { gta5ageRestrictedHtmlDetailsPage } from "../../../assets/steam-details-pages/gta.5.age.restricted.html.details.page.js";
import { padakVideoHtmlDetailsPage } from "../../../assets/steam-details-pages/padak.video.html.details.page.js";
import { theSims4dlcHtmlDetailsPage } from "../../../assets/steam-details-pages/the.sims.4.dlc.html.details.page.js";
import { getParsedHtmlPage } from "../../../assets/html.details.pages.mock.js";
import { eldenRingSteamApiData } from "../../../assets/steam-api-responses/elden.ring.js";
import { riskOfRainTwoDlcSteamApiData } from "../../../assets/steam-api-responses/risk.of.rain.2.dlc.js";

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

  describe(".recordHtmlAttempt", () => {
    describe("if the html page is not empty", function () {
      describe("if the steamApp's triedVia doesn't already include the provided source", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          const page = feartressGameHtmlDetailsPage;

          this.steamApp.recordHtmlAttempt(page, this.source);
        });

        it("the steam app is mark as tried via steam web", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });
      });

      describe("if the steamApp's triedVia already includes the provided source, and we try to add another", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          const page = feartressGameHtmlDetailsPage;

          this.steamApp.recordHtmlAttempt(page, this.source);
          this.steamApp.recordHtmlAttempt(page, this.source);
        });

        it("the steam app is marked as tried via steam web only once", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });
      });
    });

    describe("if the html page is empty", function () {
      describe("if the steamApp's failedVia doesn't already include steamWeb", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          const page = "";

          this.steamApp.recordHtmlAttempt(page, this.source);
        });

        it("the steam app is mark as tried via steam web", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });

        it("the steam app is marked as failed via steam web", function () {
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });

      describe("if the steamApp's failedVia already includes steamWeb and we try to add it again", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          const page = "";

          this.steamApp.recordHtmlAttempt(page, this.source);
          this.steamApp.recordHtmlAttempt(page, this.source);
        });

        it("the steam app is mark as tried via steam web", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });

        it("the steam app is marked as failed via steam web only once", function () {
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });
    });
  });

  describe(".recordSteamWebHtmlAttempt", () => {
    describe("if the html page has content", function () {
      describe("if the steam app is still untried via SteamWeb", function () {
        beforeAll(function () {
          this.steamApp = getXSampleSteamApps(1)[0];

          const page = feartressGameHtmlDetailsPage;

          this.steamApp.recordSteamWebHtmlAttempt(page);
        });

        it("the steam app is mark as tried via steam web", function () {
          expect(this.steamApp.triedVia).toEqual([
            ValidDataSources.validDataSources.steamWeb,
          ]);
        });
      });

      describe("if the steam app was already tried via steamWeb", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          const page = feartressGameHtmlDetailsPage;

          this.steamApp.recordSteamWebHtmlAttempt(page, this.source);
          this.steamApp.recordSteamWebHtmlAttempt(page, this.source);
        });

        it("the steam app is marked as tried via steam web only once", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });
      });
    });

    describe("if the html page is empty", function () {
      describe("if the steam app is unmarked as failed via steam web", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          const page = "";

          this.steamApp.recordSteamWebHtmlAttempt(page);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });

        it("the steam app is marked as failed via steam web", function () {
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });

      describe("if the steam app was already marked as failed via steamWeb", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamWeb;

          this.steamApp = getXSampleSteamApps(1)[0];

          const page = "";

          this.steamApp.recordSteamWebHtmlAttempt(page);
          this.steamApp.recordSteamWebHtmlAttempt(page);
        });

        it("the steam app is marked as tried via steam web", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });

        it("the steam app is marked as failed via steam web only once", function () {
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });
    });
  });

  describe(".updateAppTypeViaSteamWeb", function () {
    describe("when the app is age restricted", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        const page = getParsedHtmlPage(gta5ageRestrictedHtmlDetailsPage);

        this.app.updateAppTypeViaSteamWeb(page);
      });

      it("the app will be marked as restricted", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.restricted);
      });
    });

    describe("when the app does not have the appropriate text in the first breadcrumb", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        const page = getParsedHtmlPage(padakVideoHtmlDetailsPage);

        this.app.updateAppTypeViaSteamWeb(page);
      });

      it("the app will be marked as unknown", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.unknown);
      });
    });

    describe("when app has 'downloadable content' in its breadcrumb", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        const page = getParsedHtmlPage(theSims4dlcHtmlDetailsPage);

        this.app.updateAppTypeViaSteamWeb(page);
      });

      it("the app will be marked as 'Downloadable Content'", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.downloadableContent);
      });
    });

    describe("when the app is a game", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        const page = getParsedHtmlPage(feartressGameHtmlDetailsPage);

        this.app.updateAppTypeViaSteamWeb(page);
      });

      it("the app will be marked as a game", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.game);
      });
    });
  });

  describe(".recordSteamApiAttempt", () => {
    describe("if the provided steam app exists", function () {
      describe("if the steam app is still untried via steam api", function () {
        beforeAll(function () {
          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.recordSteamApiAttempt(true);
        });

        it("the steam app is marked as tried via steam api", function () {
          expect(this.steamApp.triedVia).toEqual([
            ValidDataSources.validDataSources.steamApi,
          ]);
        });
      });

      describe("if the steam app was already tried via steam api", function () {
        beforeAll(function () {
          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.recordSteamApiAttempt(true);
          this.steamApp.recordSteamApiAttempt(true);
        });

        it("the steam app is marked as tried via steam api only once", function () {
          expect(this.steamApp.triedVia).toEqual([
            ValidDataSources.validDataSources.steamApi,
          ]);
        });
      });
    });

    describe("if the html page is empty", function () {
      describe("if the steam app is unmarked as failed via steam api", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamApi;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.recordSteamApiAttempt(undefined);
        });

        it("the steam app is marked as tried via steam api", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });

        it("the steam app is marked as failed via steam api", function () {
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });

      describe("if the steam app was already marked as failed via steam api", function () {
        beforeAll(function () {
          this.source = ValidDataSources.validDataSources.steamApi;

          this.steamApp = getXSampleSteamApps(1)[0];

          this.steamApp.recordSteamApiAttempt(undefined);
          this.steamApp.recordSteamApiAttempt(undefined);
        });

        it("the steam app is marked as tried via steam api", function () {
          expect(this.steamApp.triedVia).toEqual([this.source]);
        });

        it("the steam app is marked as failed via steam api only once", function () {
          expect(this.steamApp.failedVia).toEqual([this.source]);
        });
      });
    });
  });

  describe(".updateAppTypeViaSteamApi", function () {
    describe("when there is no steam app passed in", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        this.app.updateAppTypeViaSteamApi(undefined);
      });

      it("the app will be marked as unknown", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.unknown);
      });
    });

    describe("when the app type is game", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        this.app.updateAppTypeViaSteamApi(eldenRingSteamApiData);
      });

      it("the app will be marked as a game", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.game);
      });
    });

    describe("when the app type is downloadable content", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        this.app.updateAppTypeViaSteamApi(riskOfRainTwoDlcSteamApiData);
      });

      it("the app will be marked as downloadable content", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.downloadableContent);
      });
    });

    describe("when the app type is neither game nor dlc", function () {
      beforeAll(function () {
        this.app = getXSampleSteamApps(1)[0];

        this.app.updateAppTypeViaSteamApi(padakVideoHtmlDetailsPage);
      });

      it("the app will be marked as unknown", function () {
        expect(this.app.type).toEqual(SteamApp.validTypes.unknown);
      });
    });
  });
});
