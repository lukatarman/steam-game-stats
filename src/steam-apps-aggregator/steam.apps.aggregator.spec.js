import { SteamAppsAggregator } from "./steam.apps.aggregator.js";
import { smallestGamesMock } from "../../assets/smallest.data.set.js";
import { gamesMock } from "../../assets/small.data.set.js";
import { labelAsNotIdentified } from "./services/label.service.js";
import { diff } from "./services/diff.service.js";

describe("SteamAppsAggregator", () => {
  describe(".collectSteamApps()", () => {
    let steamClientMock;
    let databaseClientMock;
    let updateTimestamp;

    beforeEach(() => {
      updateTimestamp = { updatedOn: new Date("2020") };
    });

    describe("collects steam apps for the first time and finishes", () => {
      beforeEach(async () => {
        steamClientMock = createSteamMock(smallestGamesMock);

        databaseClientMock = createDbMock(null, undefined);

        const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, {});

        await agg.collectSteamApps();
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

    describe("collects steam apps for the n-th (n > 1) time", () => {
      let steamAppsDifference;

      describe("while finding new games and finishes", () => {
        beforeEach(async () => {
          steamClientMock = createSteamMock(gamesMock);

          databaseClientMock = createDbMock(updateTimestamp, smallestGamesMock);

          const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, { updateIntervalDelay: 100 });

          steamAppsDifference = diff(gamesMock, smallestGamesMock);

          await agg.collectSteamApps();
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

      describe("without new games and finishes", () => {
        beforeEach(async () => {
          steamClientMock = createSteamMock(smallestGamesMock);

          databaseClientMock = createDbMock(updateTimestamp, smallestGamesMock);

          const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, { updateIntervalDelay: 100 });

          steamAppsDifference = diff(smallestGamesMock, smallestGamesMock);

          await agg.collectSteamApps();
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

    describe("executes successfully by not performing any updates", () => {
      beforeEach(async () => {
        steamClientMock = createSteamMock(smallestGamesMock);

        databaseClientMock = createDbMock(updateTimestamp, smallestGamesMock);

        const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, { updateIntervalDelay: Number.POSITIVE_INFINITY });

        await agg.collectSteamApps();
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

function createSteamMock(ret) {
  return jasmine.createSpyObj("SteamClient", {
    getAppList: Promise.resolve(ret),
  });
}

function createDbMock(updateTs, steamApps) {
  return jasmine.createSpyObj("DatabaseClient", {
    getLastUpdateTimestamp: Promise.resolve(updateTs),
    insertManySteamApps: Promise.resolve(undefined),
    insertOneUpdateTimestamp: Promise.resolve(undefined),
    getAllSteamApps: Promise.resolve(steamApps),
  });
}
