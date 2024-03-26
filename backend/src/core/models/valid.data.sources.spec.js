import { ValidDataSources } from "./valid.data.sources.js";

describe("ValidDataSources", function () {
  describe("getSourceUrl.", function () {
    describe("When steamWeb is set as the source", function () {
      beforeAll(function () {
        const source = ValidDataSources.validDataSources.steamWeb;
        this.result = ValidDataSources.getSourceUrl(1, source);
      });

      it("the correct url is returned.", function () {
        expect(this.result).toBe("https://store.steampowered.com/app/1");
      });
    });

    describe("When steamcharts is set as the source", function () {
      beforeAll(function () {
        const source = ValidDataSources.validDataSources.steacharts;
        this.result = ValidDataSources.getSourceUrl(1, source);
      });

      it("the correct url is returned.", function () {
        expect(this.result).toBe("https://steamcharts.com/app/1");
      });
    });

    describe("When steamDb is set as the source", function () {
      beforeAll(function () {
        const source = ValidDataSources.validDataSources.steamDb;
        this.result = ValidDataSources.getSourceUrl(1, source);
      });

      it("the correct url is returned.", function () {
        expect(this.result).toBe("https://steamdb.info/app/1/info/");
      });
    });
  });
});
