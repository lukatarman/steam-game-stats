import { SteamAppsAggregator } from "./steam.apps.aggregator.js";
import { smallestGamesMock } from "../../assets/smallest.data.set.js";
import { labelAsNotIdentified } from "./services/label.service.js";

fdescribe("SteamAppsAggregator", () => {
  describe(".run()", () => {
    describe("executes successfully by performing a first update and then finishes", () => {
      let steamClientMock;
      let databaseClientMock;

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

    // xdescribe("executes successfully by performing a regular update", () => {
    //   describe("with new games", () => {});
    //   describe("without new games", () => {});
    // });

    // xdescribe("executes successfully by not performing a any updates", () => { });
  });
});
