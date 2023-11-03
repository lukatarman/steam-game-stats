import { getXGamesWithoutDetails } from "../../../models/game.mocks.js";
import { SteamApp } from "../../../models/steam.app.js";
import {
  getThreeSteamchartsUntriedFilteredSteamApps,
  getThreeSteamwebUntriedFilteredSteamApps,
  getXSampleSteamApps,
} from "../../../models/steam.app.mocks.js";
import { initiateInMemoryDatabase } from "../in.memory.database.client.js";
import { SteamAppsRepository } from "./steam.apps.repository.js";

describe("SteamAppsRepository", function () {
  describe(".getAllSteamApps gets all documents from the database as instances of SteamApp", function () {
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

        await insertManyApps(this.databaseClient, apps);

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getAllSteamApps();
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result has two games", function () {
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
  });

  describe(".updateSteamAppsById updates the values of the matching provided steam apps", function () {
    describe("If two out of three provided steam apps match", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        const insertedApps = [
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
        ];

        await insertManyApps(this.databaseClient, insertedApps);

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

      it("the resulting array has a length of 3", function () {
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

      it("the third array has the correct values", function () {
        expect(this.result[2].appid).toBe(3);
        expect(this.result[2].name).toBe("Risk of Sprain");
        expect(this.result[2].type).toBe("unknown");
        expect(this.result[2].triedVia).toEqual([]);
      });
    });
  });

  describe(".getSteamWebUntriedFilteredSteamApps.", function () {
    describe("If three steam apps out of eigth match the filters, and the amount of 2 is provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(
          this.databaseClient,
          getThreeSteamwebUntriedFilteredSteamApps(),
        );

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamWebUntriedFilteredSteamApps(2);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result has two games", function () {
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

      it("the second result is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("unknown");
        expect(this.result[1].triedVia).toEqual([]);
      });
    });

    describe("If three steam apps out of eigth match the filters, and the amount of 4 is provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(
          this.databaseClient,
          getThreeSteamwebUntriedFilteredSteamApps(),
        );

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamWebUntriedFilteredSteamApps(4);
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
        expect(this.result[1].triedVia).toEqual([]);
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

    describe("If an amount of '0' is provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(
          this.databaseClient,
          getThreeSteamwebUntriedFilteredSteamApps(),
        );

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
        expect(this.result[1].triedVia).toEqual([]);
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

  describe(".getSteamchartsUntriedFilteredSteamApps.", function () {
    describe("If three steam apps out of ten match the filters, and the amount of 2 is provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(
          this.databaseClient,
          getThreeSteamchartsUntriedFilteredSteamApps(),
        );

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamchartsUntriedFilteredSteamApps(2);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result has two games", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first result is an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
        expect(this.result[0].name).toBe("Risk of Strain");
        expect(this.result[0].type).toBe("unknown");
        expect(this.result[0].triedVia[0]).toBe("steamWeb");
      });

      it("the second result is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("unknown");
        expect(this.result[1].triedVia[0]).toBe("steamWeb");
      });
    });

    describe("If three steam apps out of ten match the filters, and the amount of 4 is provided", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(
          this.databaseClient,
          getThreeSteamchartsUntriedFilteredSteamApps(),
        );

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamchartsUntriedFilteredSteamApps(4);
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
        expect(this.result[0].triedVia[0]).toBe("steamWeb");
      });

      it("the second result is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("unknown");
        expect(this.result[1].triedVia[0]).toBe("steamWeb");
      });

      it("the third result is an instance of SteamApp", function () {
        expect(this.result[2]).toBeInstanceOf(SteamApp);
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].appid).toBe(3);
        expect(this.result[2].name).toBe("Risk of Gain");
        expect(this.result[2].type).toBe("unknown");
        expect(this.result[2].triedVia[0]).toBe("steamWeb");
      });
    });

    describe("If '0' amount is provided,", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(
          this.databaseClient,
          getThreeSteamchartsUntriedFilteredSteamApps(),
        );

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamchartsUntriedFilteredSteamApps(0);
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
        expect(this.result[0].triedVia[0]).toBe("steamWeb");
      });

      it("the second result is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].name).toBe("Risk of Stain");
        expect(this.result[1].type).toBe("unknown");
        expect(this.result[1].triedVia[0]).toBe("steamWeb");
      });

      it("the third result is an instance of SteamApp", function () {
        expect(this.result[2]).toBeInstanceOf(SteamApp);
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].appid).toBe(3);
        expect(this.result[2].name).toBe("Risk of Gain");
        expect(this.result[2].type).toBe("unknown");
        expect(this.result[2].triedVia[0]).toBe("steamWeb");
      });
    });
  });

  describe(".getSteamAppsById", function () {
    describe("if two steam apps match the provided games", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(this.databaseClient, getXSampleSteamApps(2));

        const games = getXGamesWithoutDetails(2);

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getSteamAppsById(games.map((game) => game.id));
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("two steam apps are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the steam apps are an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the first steam app has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
      });

      it("the second steam app has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
      });
    });
  });
});

const insertManyApps = async (client, apps) => {
  await client.insertMany("steam_apps", apps);
};
