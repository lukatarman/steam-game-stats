import { SteamAppsAggregator } from "./steam.apps.aggregator.js";
import { smallestGamesMock } from "../../../../assets/smallest.data.set.js";
import { gamesMock } from "../../../../assets/small.data.set.js";
import { hoursToMs } from "../../../common/time.utils.js";
import { SteamApp } from "../../models/steam.app.js";
import { createLoggerMock } from "../../../common/logger.mock.js";

describe("SteamAppsAggregator", function () {
  const baseTime = new Date(2023, 9, 23);
  const updateTimestamp = { updatedOn: new Date(2023, 9, 22) };

  describe(".collectSteamApps()", function () {
    describe("given data is collected for the first time", function () {
      describe("when the api responds with an array of steam apps", function () {
        beforeAll(async function () {
          jasmine.clock().install();
          jasmine.clock().mockDate(baseTime);

          this.updateTimestampsRepo = createSteamAppsUpdateTimestampsRepositoryMock(null);
          this.steamAppsRepo = createSteamAppsRepositoryMock(undefined);

          await new SteamAppsAggregator(
            createSteamMock(smallestGamesMock),
            this.updateTimestampsRepo,
            this.steamAppsRepo,
            createLoggerMock(),
            {},
          ).collectSteamApps();
        });

        afterAll(function () {
          jasmine.clock().uninstall();
        });

        it("then the recieved steam apps are stored to the database", function () {
          expect(this.steamAppsRepo.insertManySteamApps).toHaveBeenCalledOnceWith(
            smallestGamesMock,
          );
        });

        it("then an update timestamp is recorded", function () {
          const updateTimestamp =
            this.updateTimestampsRepo.insertOneSteamAppsUpdateTimestamp.calls.argsFor(
              0,
            )[0];
          expect(updateTimestamp.toString()).toBe(baseTime.toString());
        });
      });
    });

    describe("given data is collected n-th (n > 1) time", function () {
      describe("when the steam api responds with an array of steam apps", function () {
        describe("and the response contains steam apps which are new and not stored yet", function () {
          beforeAll(async function () {
            jasmine.clock().install();
            jasmine.clock().mockDate(baseTime);

            this.updateTimestampsRepo =
              createSteamAppsUpdateTimestampsRepositoryMock(updateTimestamp);
            this.steamAppsRepo = createSteamAppsRepositoryMock(smallestGamesMock);

            const agg = new SteamAppsAggregator(
              createSteamMock(gamesMock),
              this.updateTimestampsRepo,
              this.steamAppsRepo,
              createLoggerMock(),
              {
                updateIntervalDelay: 100,
              },
            );

            this.steamAppsDifference = SteamApp.diff(gamesMock, smallestGamesMock);

            await agg.collectSteamApps();
          });

          afterAll(function () {
            jasmine.clock().uninstall();
          });

          it("then only the new steam apps are stored in the database", function () {
            expect(this.steamAppsRepo.insertManySteamApps).toHaveBeenCalledOnceWith(
              this.steamAppsDifference,
            );
          });

          it("then an update timestamp is recorded", function () {
            const newUpdateTimestamp =
              this.updateTimestampsRepo.insertOneSteamAppsUpdateTimestamp.calls.argsFor(
                0,
              )[0];
            expect(newUpdateTimestamp.toString()).toBe(baseTime.toString());
          });
        });

        describe("and the response contains steam apps which are already stored", function () {
          beforeAll(async function () {
            jasmine.clock().install();
            jasmine.clock().mockDate(baseTime);

            this.updateTimestampsRepo =
              createSteamAppsUpdateTimestampsRepositoryMock(updateTimestamp);
            this.steamAppsRepo = createSteamAppsRepositoryMock(smallestGamesMock);

            await new SteamAppsAggregator(
              createSteamMock(smallestGamesMock),
              this.updateTimestampsRepo,
              this.steamAppsRepo,
              createLoggerMock(),
              {
                updateIntervalDelay: 100,
              },
            ).collectSteamApps();
          });

          afterAll(function () {
            jasmine.clock().uninstall();
          });

          it("then no steam apps are stored", function () {
            expect(this.steamAppsRepo.insertManySteamApps).toHaveBeenCalledTimes(0);
          });

          it("then an update timestamp is recorded", function () {
            const newUpdateTimestamp =
              this.updateTimestampsRepo.insertOneSteamAppsUpdateTimestamp.calls.argsFor(
                0,
              )[0];
            expect(newUpdateTimestamp.toString()).toBe(baseTime.toString());
          });
        });
      });

      describe("and the last update was less than a predefined number of hours ago", function () {
        beforeAll(async function () {
          jasmine.clock().install();
          jasmine.clock().mockDate(baseTime);

          this.steamClient = createSteamMock(smallestGamesMock);
          this.updateTimestampsRepo =
            createSteamAppsUpdateTimestampsRepositoryMock(updateTimestamp);
          this.steamAppsRepo = createSteamAppsRepositoryMock(smallestGamesMock);

          await new SteamAppsAggregator(
            this.steamClient,
            this.updateTimestampsRepo,
            this.steamAppsRepo,
            createLoggerMock(),
            {
              updateIntervalDelay: hoursToMs(48),
            },
          ).collectSteamApps();
        });

        afterAll(function () {
          jasmine.clock().uninstall();
        });

        it("then no calls to the steam api are made", function () {
          expect(this.steamClient.getAppList).toHaveBeenCalledTimes(0);
        });

        it("then nothing is persisted", function () {
          expect(
            this.updateTimestampsRepo.insertOneSteamAppsUpdateTimestamp,
          ).toHaveBeenCalledTimes(0);
          expect(this.steamAppsRepo.insertManySteamApps).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe("given data is collected n-th (n > 1) time", function () {
      beforeAll(async function () {
        jasmine.clock().install();
        jasmine.clock().mockDate(baseTime);

        this.updateTimestampsRepo =
          createSteamAppsUpdateTimestampsRepositoryMock(updateTimestamp);
        this.steamAppsRepo = createSteamAppsRepositoryMock(smallestGamesMock);

        await new SteamAppsAggregator(
          createSteamMock(gamesMock),
          this.updateTimestampsRepo,
          this.steamAppsRepo,
          createLoggerMock(),
          {
            updateIntervalDelay: 100,
          },
        ).collectSteamAppsDiffOnDbLayer();
      });

      afterAll(function () {
        jasmine.clock().uninstall();
      });

      it("then the new steam apps are stored in the database and the existing steam apps are left unchanged", function () {
        expect(this.steamAppsRepo.insertManyIfNotExist).toHaveBeenCalledOnceWith(
          gamesMock,
        );
      });

      it("then an update timestamp is recorded", function () {
        const newUpdateTimestamp =
          this.updateTimestampsRepo.insertOneSteamAppsUpdateTimestamp.calls.argsFor(0)[0];
        expect(newUpdateTimestamp.toString()).toBe(baseTime.toString());
      });
    });
  });
});

function createSteamMock(ret) {
  return jasmine.createSpyObj("SteamClient", {
    getAppList: Promise.resolve(ret),
  });
}

function createSteamAppsUpdateTimestampsRepositoryMock(updateTs) {
  return jasmine.createSpyObj("SteamAppsUpdateTimestampsRepository", {
    getLastSteamAppsUpdateTimestamp: Promise.resolve(updateTs),
    insertOneSteamAppsUpdateTimestamp: Promise.resolve(undefined),
  });
}

function createSteamAppsRepositoryMock(steamApps) {
  return jasmine.createSpyObj("DatabaseClient", {
    insertManyIfNotExist: Promise.resolve(undefined),
    insertManySteamApps: Promise.resolve(undefined),
    getAllSteamApps: Promise.resolve(steamApps),
  });
}
