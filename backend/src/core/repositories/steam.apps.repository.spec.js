import { getXGamesWithoutDetails } from "../models/game.mocks.js";
import { SteamApp } from "../models/steam.app.js";
import {
  getThreeSourceUntriedFilteredSteamApps,
  getXSampleSteamApps,
} from "../models/steam.app.mocks.js";
import { ValidDataSources } from "../models/valid.data.sources.js";
import { initiateInMemoryDatabase } from "../../adapters/driven/db/in.memory.database.client.js";
import { SteamAppsRepository } from "./steam.apps.repository.js";
import { SteamAppsAggregate } from "../models/steam.apps.aggregate.js";

describe("SteamAppsRepository", function () {
  describe(".insertManyIfNotExist inserts all the non existing steam apps from a given array", function () {
    describe("Given no documents", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the operation should throw an error", async function () {
        await expectAsync(
          new SteamAppsRepository(this.databaseClient).insertManyIfNotExist(),
        ).toBeRejected();
      });
    });

    describe("Given two steam apps, if one steam app already exist in the database", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);
        this.steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.newDataset = getXSampleSteamApps(2);
        const existingDataSet = [this.newDataset[0]];
        await insertManyApps(this.databaseClient, existingDataSet);

        await this.steamAppsRepo.insertManyIfNotExist(this.newDataset);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the new steam app will be added", async function () {
        const steamApp = await this.steamAppsRepo.getSteamAppById(
          this.newDataset[1].appid,
        );
        expect(steamApp.appid).toBe(this.newDataset[1].appid);
      });

      it("a total of 2 steam apps will be in the database", async function () {
        const allSteamApps = await this.steamAppsRepo.getAllSteamApps();
        expect(allSteamApps).toHaveSize(2);
      });
    });

    describe("Given two steam apps, if both steam apps already exist in the database", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);
        this.steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.newDataset = getXSampleSteamApps(2);
        await insertManyApps(this.databaseClient, getXSampleSteamApps(2));

        await this.steamAppsRepo.insertManyIfNotExist(this.newDataset);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("no steam apps will be inserted", async function () {
        const count = await this.steamAppsRepo.getSteamAppsCount();
        expect(count).toBe(2);
      });
    });

    describe("Given 500 steam apps, if 250 steam apps already exist in the database", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);
        this.steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.newDataset = getXSampleSteamApps(500);
        await insertManyApps(this.databaseClient, getXSampleSteamApps(250));

        await this.steamAppsRepo.insertManyIfNotExist(this.newDataset);
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("a total of 500 steam apps will be in the database", async function () {
        const count = await this.steamAppsRepo.getSteamAppsCount();
        expect(count).toBe(500);
      });
    });
  });

  describe(".getAllSteamApps gets all steam apps from the database as instances of SteamApp", function () {
    describe("If two steam apps exist in the collection", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        await insertManyApps(this.databaseClient, getXSampleSteamApps(2));

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        this.result = await steamAppsRepo.getAllSteamApps();
      });

      afterAll(function () {
        this.databaseClient.disconnect();
      });

      it("the result has two games", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first array is an instance of SteamApp", function () {
        expect(this.result[0]).toBeInstanceOf(SteamApp);
      });

      it("the first array has the correct values", function () {
        expect(this.result[0].appid).toBe(1);
      });

      it("the second array is an instance of SteamApp", function () {
        expect(this.result[1]).toBeInstanceOf(SteamApp);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
      });
    });
  });

  describe(".updateSteamAppsById updates the values of the matching provided steam apps", function () {
    describe("If two out of three provided steam apps match", function () {
      beforeAll(async function () {
        this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

        const uninstantiatedApps = getXSampleSteamApps(3);

        const instantiatedApps = SteamApp.manyFromSteamApi(uninstantiatedApps);

        await insertManyApps(this.databaseClient, instantiatedApps);

        this.artt = await this.databaseClient.getAll("steam_apps");

        const updatedApps = [
          {
            appid: 1,
            name: "Risk of Strain",
            type: "game",
            triedVia: [ValidDataSources.validDataSources.steamWeb],
            failedVia: [ValidDataSources.validDataSources.steamWeb],
          },
          {
            appid: 2,
            name: "Risk of Stain",
            type: "downloadableContent",
            triedVia: [ValidDataSources.validDataSources.steamWeb],
            failedVia: [],
          },
        ];

        const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

        await steamAppsRepo.updateSteamAppsById(updatedApps);

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
        expect(this.result[0].type).toBe("game");
        expect(this.result[0].triedVia).toEqual([
          ValidDataSources.validDataSources.steamWeb,
        ]);
        expect(this.result[0].failedVia).toEqual([
          ValidDataSources.validDataSources.steamWeb,
        ]);
      });

      it("the second array has the correct values", function () {
        expect(this.result[1].appid).toBe(2);
        expect(this.result[1].type).toBe("downloadableContent");
        expect(this.result[1].triedVia).toEqual([
          ValidDataSources.validDataSources.steamWeb,
        ]);
        expect(this.result[1].failedVia).toEqual([]);
      });

      it("the third array has the correct values", function () {
        expect(this.result[2].appid).toBe(3);
        expect(this.result[2].type).toBe("unknown");
        expect(this.result[2].triedVia).toEqual([]);
        expect(this.result[2].failedVia).toEqual([]);
      });
    });
  });

  describe(".getSteamWebUntriedFilteredSteamApps.", function () {
    describe("If three steam apps out of eigth match the filters,", function () {
      describe("and a limit of 2 is provided", function () {
        beforeAll(async function () {
          this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

          const source = ValidDataSources.validDataSources.steamWeb;

          await insertManyApps(
            this.databaseClient,
            getThreeSourceUntriedFilteredSteamApps(8, source),
          );

          const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

          this.result = await steamAppsRepo.getSteamWebUntriedFilteredSteamApps(2);
        });

        afterAll(function () {
          this.databaseClient.disconnect();
        });

        it("the result is an instance of SteamAppsAggregate", function () {
          expect(this.result).toBeInstanceOf(SteamAppsAggregate);
        });

        it("the result contains two steam apps", function () {
          expect(this.result.content.length).toBe(2);
        });

        it("the first steam app is an instance of SteamApp", function () {
          expect(this.result.content[0]).toBeInstanceOf(SteamApp);
        });

        it("the first steam app has the correct values", function () {
          expect(this.result.content[0].appid).toBe(2);
          expect(this.result.content[0].type).toBe("unknown");
          expect(this.result.content[0].triedVia).toEqual([]);
        });

        it("the second steam app is an instance of SteamApp", function () {
          expect(this.result.content[1]).toBeInstanceOf(SteamApp);
        });

        it("the second steam app has the correct values", function () {
          expect(this.result.content[1].appid).toBe(4);
          expect(this.result.content[1].type).toBe("unknown");
          expect(this.result.content[1].triedVia).toEqual([]);
        });
      });

      describe("and the amount of 0 is provided", function () {
        beforeAll(async function () {
          this.databaseClient = await initiateInMemoryDatabase(["steam_apps"]);

          const source = ValidDataSources.validDataSources.steamWeb;

          await insertManyApps(
            this.databaseClient,
            getThreeSourceUntriedFilteredSteamApps(8, source),
          );

          const steamAppsRepo = new SteamAppsRepository(this.databaseClient);

          this.result = await steamAppsRepo.getSteamWebUntriedFilteredSteamApps(0);
        });

        afterAll(function () {
          this.databaseClient.disconnect();
        });

        it("the result is an instance of SteamAppsAggregate", function () {
          expect(this.result).toBeInstanceOf(SteamAppsAggregate);
        });

        it("the result contains three steam apps", function () {
          expect(this.result.content.length).toBe(3);
        });

        it("the first steam app an instance of SteamApp", function () {
          expect(this.result.content[0]).toBeInstanceOf(SteamApp);
        });

        it("the first steam app has the correct values", function () {
          expect(this.result.content[0].appid).toBe(2);
          expect(this.result.content[0].type).toBe("unknown");
          expect(this.result.content[0].triedVia).toEqual([]);
        });

        it("the second steam app is an instance of SteamApp", function () {
          expect(this.result.content[1]).toBeInstanceOf(SteamApp);
        });

        it("the second steam app has the correct values", function () {
          expect(this.result.content[1].appid).toBe(4);
          expect(this.result.content[1].type).toBe("unknown");
          expect(this.result.content[1].triedVia).toEqual([]);
        });

        it("the third steam app is an instance of SteamApp", function () {
          expect(this.result.content[2]).toBeInstanceOf(SteamApp);
        });

        it("the third steam app has the correct values", function () {
          expect(this.result.content[2].appid).toBe(7);
          expect(this.result.content[2].type).toBe("unknown");
          expect(this.result.content[2].triedVia).toEqual([]);
        });
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

      it("the result is an instance of SteamAppsAggregate", function () {
        expect(this.result).toBeInstanceOf(SteamAppsAggregate);
      });

      it("two steam apps are returned", function () {
        expect(this.result.content.length).toBe(2);
      });

      it("the steam apps are an instance of SteamApp", function () {
        expect(this.result.content[0]).toBeInstanceOf(SteamApp);
        expect(this.result.content[1]).toBeInstanceOf(SteamApp);
      });

      it("the first steam app has the correct values", function () {
        expect(this.result.content[0].appid).toBe(1);
      });

      it("the second steam app has the correct values", function () {
        expect(this.result.content[1].appid).toBe(2);
      });
    });
  });
});

const insertManyApps = async (client, apps) => {
  await client.insertMany("steam_apps", apps);
};
