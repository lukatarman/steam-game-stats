import { SteamAppsAggregator } from "./steam.apps.aggregator.js";
import { smallestGamesMock } from "../../assets/smallest.data.set.js"

describe("SteamAppsAggregator", () => {
  describe(".run()", () => {
    describe("executes successfully the first update when no last update timestamp exist", () => {
      let steamClientMock;
      let databaseClientMock;
      beforeEach(async () => {
        steamClientMock = jasmine.createSpyObj("SteamClient", {
          getAppList: Promise.resolve(smallestGamesMock)
        });
        databaseClientMock = jasmine.createSpyObj("DatabaseClient", {
          getLastUpdateTimestamp: Promise.resolve(undefined),
          insertManySteamApps: Promise.resolve(undefined),
          insertOneUpdateTimestamp: Promise.resolve(undefined),
        });

        const agg = new SteamAppsAggregator(steamClientMock, databaseClientMock, {});
        await agg.run();
      });

      it(".getLastUpdateTimestamp is called once", () => {
        expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledTimes(1);
      });

      it(".getLastUpdateTimestamp is called before .getAppList", () => {
        expect(databaseClientMock.getLastUpdateTimestamp).toHaveBeenCalledBefore(steamClientMock.getAppList);
      });

      it(".getAppList is called once", () => {
        expect(steamClientMock.getAppList).toHaveBeenCalledTimes(1);
      });

      it(".getAppList is called before", () => {
        expect(steamClientMock.getAppList).toHaveBeenCalledBefore(databaseClientMock.insertManySteamApps);
      });

      it(".insertManySteamApps is called once", () => {
        expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledTimes(1);
      });

      it(".insertManySteamApps is called before", () => {
        expect(databaseClientMock.insertManySteamApps).toHaveBeenCalledBefore(databaseClientMock.insertOneUpdateTimestamp);
      });

      it(".insertOneUpdateTimestamp is called once", () => {
        expect(databaseClientMock.insertOneUpdateTimestamp).toHaveBeenCalledTimes(1);
      });
    });
  });
});