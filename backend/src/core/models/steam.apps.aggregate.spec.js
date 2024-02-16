import { createLoggerMock } from "../../common/logger.mock.js";
import { SteamApp } from "./steam.app.js";
import { getXSampleSteamApps } from "./steam.app.mocks.js";
import { SteamAppsAggregate } from "./steam.apps.aggregate.js";

fdescribe("SteamAppsAggregate", function () {
  describe(".manyFromDbEntries", function () {
    beforeAll(function () {
      this.result = SteamAppsAggregate.manyFromDbEntries(
        getXSampleSteamApps(2),
        createLoggerMock(),
      );
    });

    it("the result is an instance of SteamAppsAggregate", function () {
      expect(this.result).toBeInstanceOf(SteamAppsAggregate);
    });

    it("the result's apps are instances of SteamApp", function () {
      expect(this.result.apps[0]).toBeInstanceOf(SteamApp);
    });
  });

  describe(".checkIfEmpty", function () {
    describe("when the steamApps array is empty", function () {
      beforeAll(function () {
        this.loggerMock = createLoggerMock();

        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries([], this.loggerMock);

        this.result = steamAppsArray.checkIfEmpty("");
      });

      it("the returned value is true", function () {
        expect(this.result).toBeTruthy();
      });

      it("the logger was called", function () {
        expect(this.loggerMock.debugc).toHaveBeenCalled();
      });
    });

    describe("when the steamApps array is not empty", function () {
      beforeAll(function () {
        this.loggerMock = createLoggerMock();

        const steamAppsArray = SteamAppsAggregate.manyFromDbEntries(
          getXSampleSteamApps(2),
          this.loggerMock,
        );

        this.result = steamAppsArray.checkIfEmpty("");
      });

      it("the returned value is false", function () {
        expect(this.result).toBeFalsy();
      });

      it("the logger was not called", function () {
        expect(this.loggerMock.debugc).not.toHaveBeenCalled();
      });
    });
  });
});
