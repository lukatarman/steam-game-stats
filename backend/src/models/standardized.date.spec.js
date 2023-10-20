import { StandardizedDate } from "./standardized.date.js";

fdescribe("StandardizedDate", function () {
  describe(".getUTCDate.", function () {
    describe("When a valid date is passed in,", function () {
      beforeEach(function () {
        const date = new Date("September 1 2012");

        this.result = StandardizedDate.getUTCDate(date);
      });

      it("the result is the the correct date in the ISO format.", function () {
        expect(this.result.date).toBe("2012-09-01T00:00:00.000Z");
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
