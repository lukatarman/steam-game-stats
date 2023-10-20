import { StandardizedDate } from "./standardized.date.js";

describe("StandardizedDate", function () {
  describe(".getUTCDate.", function () {
    describe("When a valid date is passed in,", function () {
      beforeEach(function () {
        const date = new Date("September 1 2012");

        this.result = StandardizedDate.getUTCDate(date);
      });

      it("the result is the correct date.", function () {
        expect(this.result.date.toISOString()).toBe("2012-09-01T00:00:00.000Z");
      });
    });

    describe("When an invalid date is passed in,", function () {
      beforeEach(function () {
        const date = new Date("Coming soon");

        this.result = StandardizedDate.getUTCDate(date);
      });

      it("the result is an empty string.", function () {
        expect(this.result.date).toBe("");
      });
    });
  });
});
