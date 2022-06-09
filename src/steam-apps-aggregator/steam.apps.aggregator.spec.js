import { SteamAppsAggregator } from "./steam.apps.aggregator.js";
import { smallestGamesMock } from "../../assets/smallest.data.set.js";
import { gamesMock } from "../../assets/small.data.set.js";
import { labelAsNotIdentified } from "./services/label.service.js";
import { diff } from "./services/diff.service.js";

describe("SteamAppsAggregator", () => {
  describe(".run()", () => {
    let steamClientMock;
    let databaseClientMock;

    describe("executes successfully by performing a first update and then finishes", () => {
      beforeAll(async () => {
        steamClientMock = jasmine.createSpyObj("SteamClient", {
          getAppList: Promise.resolve(smallestGamesMock),
        });
        databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
          getLastUpdateTimestamp: Promise.resolve(undefined),
          insertManySteamApps: Promise.resolve(undefined),
          insertOneUpdateTimestamp: Promise.resolve(undefined),
        });

        const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, {});

        await agg.run();
      });

      it("calls .getLastUpdateTimestamp once", () => {
        expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledTimes(1);
      });

      it("calls .getLastUpdateTimestamp before .getAppList", () => {
        expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledBefore(steamClientMock.getAppList);
      });

      it("calls .getAppList once", () => {
        expect(steamClientMock.getAppList).toHaveBeenCalledTimes(1);
      });

      it("calls .getAppList before .insertManySteamApps", () => {
        expect(steamClientMock.getAppList).toHaveBeenCalledBefore(databaseClientMock.insertManySteamApps);
      });

      it("calls .insertManySteamApps once", () => {
        expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledTimes(1);
      });

      it("calls .insertManySteamApps with enrichedSteamApps parameter", () => {
        expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledOnceWith(labelAsNotIdentified(smallestGamesMock));
      });

      it("calls .insertManySteamApps before .insertOneUpdateTimestamp", () => {
        expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledBefore(databaseClientMock.insertOneUpdateTimestamp);
      });

      it("calls .insertOneUpdateTimestamp once", () => {
        expect(databaseClientMock.insertOneUpdateTimestamp).toHaveBeenCalledTimes(1);
      });

      it("calls .insertOneUpdateTimestamp with a new date", () => {
        expect(databaseClientMock.insertOneUpdateTimestamp.calls.argsFor(0)[0]).toBeInstanceOf(Date);
      });
    });

    describe("executes successfully by performing a regular update", () => {
      let steamAppsDifference;

      describe("with new games", () => {
        beforeAll(async () => {
          const dateThatPasses = new Date("2020");

          steamClientMock = jasmine.createSpyObj("SteamClient", {
            getAppList: Promise.resolve(gamesMock),
          });
          databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
            getLastUpdateTimestamp: Promise.resolve(dateThatPasses),
            insertManySteamApps: Promise.resolve(undefined),
            insertOneUpdateTimestamp: Promise.resolve(undefined),
            getAllSteamApps: Promise.resolve(smallestGamesMock),
          });

          const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, { updateIntervalDelay: 100 });

          steamAppsDifference = diff(gamesMock, smallestGamesMock);

          await agg.run();
        });

        it("calls .getLastUpdateTimestamp once", () => {
          expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledTimes(1);
        });

        it("calls .getLastUpdateTimestamp before .getAppList", () => {
          expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledBefore(steamClientMock.getAppList);
        });

        it("calls .getAppList once", () => {
          expect(steamClientMock.getAppList).toHaveBeenCalledTimes(1);
        });

        it("calls .getLastUpdateTimestamp before .getAppList", () => {
          expect(steamClientMock.getAppList).toHaveBeenCalledBefore(databaseClientMock.getAllSteamApps);
        });

        it("calls .getAllSteamApps once", () => {
          expect(databaseClientMock.getAllSteamApps).toHaveBeenCalledTimes(1);
        });

        it("calls .getLastUpdateTimestamp before .getAppList", () => {
          expect(databaseClientMock.getAllSteamApps).toHaveBeenCalledBefore(databaseClientMock.insertManySteamApps);
        });

        it("calls .insertManySteamApps once", () => {
          expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledTimes(1);
        });

        it("calls .insertManySteamApps with enrichedSteamApps parameter", () => {
          expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledOnceWith(labelAsNotIdentified(steamAppsDifference));
        });

        it("calls .getLastUpdateTimestamp before .getAppList", () => {
          expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledBefore(databaseClientMock.insertOneUpdateTimestamp);
        });

        it("calls .insertOneUpdateTimestamp once", () => {
          expect(databaseClientMock.insertOneUpdateTimestamp).toHaveBeenCalledTimes(1);
        });

        it("calls .insertOneUpdateTimestamp with a new date", () => {
          expect(databaseClientMock.insertOneUpdateTimestamp.calls.argsFor(0)[0]).toBeInstanceOf(Date);
        });


      });
      describe("without new games", () => {
        beforeAll(async () => {
          const dateThatPasses = new Date("2020");

          steamClientMock = jasmine.createSpyObj("SteamClient", {
            getAppList: Promise.resolve(smallestGamesMock),
          });
          databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
            getLastUpdateTimestamp: Promise.resolve(dateThatPasses),
            insertManySteamApps: Promise.resolve(undefined),
            insertOneUpdateTimestamp: Promise.resolve(undefined),
            getAllSteamApps: Promise.resolve(smallestGamesMock),
          });

          const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, { updateIntervalDelay: 100 });

          steamAppsDifference = diff(smallestGamesMock, smallestGamesMock);

          await agg.run();
        });

        it("calls .getLastUpdateTimestamp once", () => {
          expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledTimes(1);
        });

        it("calls .getLastUpdateTimestamp before .getAppList", () => {
          expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledBefore(steamClientMock.getAppList);
        });

        it("calls .getAppList once", () => {
          expect(steamClientMock.getAppList).toHaveBeenCalledTimes(1);
        });

        it("calls .getLastUpdateTimestamp before .getAppList", () => {
          expect(steamClientMock.getAppList).toHaveBeenCalledBefore(databaseClientMock.getAllSteamApps);
        });

        it("calls .getAllSteamApps once", () => {
          expect(databaseClientMock.getAllSteamApps).toHaveBeenCalledTimes(1);
        });

        it("calls .getLastUpdateTimestamp before .getAppList", () => {
          expect(databaseClientMock.getAllSteamApps).toHaveBeenCalledBefore(databaseClientMock.insertOneUpdateTimestamp);
        });

        it("calls .insertOneUpdateTimestamp once", () => {
          expect(databaseClientMock.insertOneUpdateTimestamp).toHaveBeenCalledTimes(1);
        });

        it("calls .insertOneUpdateTimestamp with a new date", () => {
          expect(databaseClientMock.insertOneUpdateTimestamp.calls.argsFor(0)[0]).toBeInstanceOf(Date);
        });

        it("calls .insertManySteamApps zero times", () => {
          expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe("executes successfully by not performing a any updates", () => {
      beforeAll(async () => {
        const dateDoesntPass = new Date("2020");

        steamClientMock = jasmine.createSpyObj("SteamClient", {
          getAppList: Promise.resolve(smallestGamesMock),
        });
        databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
          getLastUpdateTimestamp: Promise.resolve(dateDoesntPass),
          insertManySteamApps: Promise.resolve(undefined),
          insertOneUpdateTimestamp: Promise.resolve(undefined),
          getAllSteamApps: Promise.resolve(smallestGamesMock),
        });

        const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, { updateIntervalDelay: Number.POSITIVE_INFINITY });

        await agg.run();
      });

      it("calls .getLastUpdateTimestamp once", () => {
        expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledTimes(1);
      });

      it("calls .getAppList zero times", () => {
        expect(steamClientMock.getAppList).toHaveBeenCalledTimes(0);
      });

      it("calls .getAllSteamApps zero times", () => {
        expect(databaseClientMock.getAllSteamApps).toHaveBeenCalledTimes(0);
      });

      it("calls .insertOneUpdateTimestamp zero times", () => {
        expect(databaseClientMock.insertOneUpdateTimestamp).toHaveBeenCalledTimes(0);
      });

      it("calls .insertManySteamApps zero times", () => {
        expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledTimes(0);
      });
    });
  });
});
