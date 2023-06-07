import { SteamApp } from "../../../models/steam.app.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { SteamAppsRepository } from "./steam.apps.repository.js";

describe("steam.apps.repository.js", function () {
  describe(".insertManySteamApps adds provided apps into the database", function () {
    describe("If two apps are provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        const apps = [
          { appid: 1, name: "Risk of Strain" },
          { appid: 2, name: "Risk of Stain" },
        ];

        await steamAppsRepo.insertManySteamApps(apps);
        this.result = await this.databaseClient.getAll("steam_apps");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
        expect(this.result[0].name).toBe("Risk of Strain");
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
      });
    });

    describe("If no apps are provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        this.result = await this.databaseClient.getAll("steam_apps");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getAllSteamApps returns the results from the database as instances of SteamApp", function () {
    describe("If two steam apps exist in the collection", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        const apps = [
          { appid: 1, name: "Risk of Strain", type: "game", triedVia: "steamWeb" },
          {
            appid: 2,
            name: "Risk of Stain",
            type: "downloadableContent",
            triedVia: "steamWeb",
          },
        ];

        this.databaseClient.insertMany("steam_apps", apps);

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getAllSteamApps();
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array to be an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
        expect(this.result[0].name).toBe("Risk of Strain");
        expect(this.result[0].type).toBe("game");
      });

      it("the second array to be an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("downloadableContent");
      });
    });

    describe("If no steam apps exist in the collection,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        this.result = await this.databaseClient.getAll("steam_apps");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result is an empty array", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".updateSteamAppsById updates the steam apps collections with new values", function () {
    describe("If two steam apps are provided for an update", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        this.databaseClient.insertMany("steam_apps", [
          {
            appid: 1,
            name: "Risk of Strain",
            type: "unknown",
            triedVia: [],
          },
          {
            appid: 2,
            name: "Risk of Stain",
            type: "unknown",
            triedVia: [],
          },
          {
            appid: 3,
            name: "Risk of Sprain",
            type: "unknown",
            triedVia: [],
          },
        ]);

        const apps = [
          { appid: 1, name: "Risk of Strain", type: "game", triedVia: "steamWeb" },
          {
            appid: 2,
            name: "Risk of Stain",
            type: "downloadableContent",
            triedVia: "steamWeb",
          },
        ];

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        await steamAppsRepo.updateSteamAppsById(apps);

        this.result = await this.databaseClient.getAll("steam_apps");
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
        expect(this.result[0].name).toBe("Risk of Strain");
        expect(this.result[0].type).toBe("game");
        expect(this.result[0].triedVia).toBe("steamWeb");
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("downloadableContent");
        expect(this.result[1].triedVia).toBe("steamWeb");
      });
    });

    describe("If no apps are provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.updateSteamAppsById([]);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result is an empty array", function () {
        expect(this.result).toBe(undefined);
      });
    });
  });

  fdescribe(".getSteamWebUntriedFilteredSteamApps retrieves a specific set of steamApps from the database.", function () {
    describe("If three steam apps out of eigth match the filters, and the amount of 2 is provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        this.databaseClient.insertMany("steam_apps", [
          {
            appid: 1,
            name: "Risk of Strain",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 2,
            name: "Risk of Stain",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 3,
            name: "Risk of Sprain",
            type: "game",
            triedVia: ["steamcharts"],
          },
          {
            appid: 4,
            name: "Risk of Rain",
            type: "unknown",
            triedVia: ["steamcharts", "steamWeb"],
          },
          {
            appid: 5,
            name: "Risk of Train Soundtrack",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 6,
            name: "Risk of Cane DLC",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 7,
            name: "Risk of Plain Demo",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 8,
            name: "Risk of Crane",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
        ]);

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamWebUntriedFilteredSteamApps(2);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 2", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first result is an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
        expect(this.result[0].name).toBe("Risk of Strain");
        expect(this.result[0].type).toBe("unknown");
        expect(this.result[0].triedVia[0]).toBe("steamcharts");
      });

      it("the first result is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("unknown");
        expect(this.result[1].triedVia[0]).toBe("steamcharts");
      });
    });

    describe("If '0' amount is provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        this.databaseClient.insertMany("steam_apps", [
          {
            appid: 1,
            name: "Risk of Strain",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 2,
            name: "Risk of Stain",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 3,
            name: "Risk of Sprain",
            type: "game",
            triedVia: ["steamcharts"],
          },
          {
            appid: 4,
            name: "Risk of Rain",
            type: "unknown",
            triedVia: ["steamcharts", "steamWeb"],
          },
          {
            appid: 5,
            name: "Risk of Train Soundtrack",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 6,
            name: "Risk of Cane DLC",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 7,
            name: "Risk of Plain Demo",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
          {
            appid: 8,
            name: "Risk of Crane",
            type: "unknown",
            triedVia: ["steamcharts"],
          },
        ]);

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamWebUntriedFilteredSteamApps(0);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the resulting array has a length of 3", function () {
        expect(this.result.length).toBe(3);
      });

      it("the first result is an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
        expect(this.result[0].name).toBe("Risk of Strain");
        expect(this.result[0].type).toBe("unknown");
        expect(this.result[0].triedVia[0]).toBe("steamcharts");
      });

      it("the second result is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("unknown");
        expect(this.result[1].triedVia[0]).toBe("steamcharts");
      });

      it("the third result is an instance of SteamApp", function () {
        expect(this.result[2]).toBeInstanceOf(SteamApp);
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].appid).toBe(8);
        expect(this.result[2].name).toBe("Risk of Crane");
        expect(this.result[2].type).toBe("unknown");
        expect(this.result[2].triedVia[0]).toBe("steamcharts");
      });
    });
  });
});
