import {
  daysToMs,
  delay,
  hoursToMs,
  moreThanXhoursPassedSince,
  msPassedSince,
} from "./time.utils.js";

describe("time.utils.js", () => {
  describe(".delay", () => {
    describe("when we wait for a delay of 0", () => {
      beforeAll(async function () {
        jasmine.clock().install();
        this.result = delay(0);
      });

      afterAll(async function () {
        jasmine.clock().uninstall();
      });

      it("the function waits for a negligable time", async function () {
        await expectAsync(this.result).toBePending();
        jasmine.clock().tick(0);
        await expectAsync(this.result).toBeResolved();
      });
    });

    describe("when we wait for a delay of 100ms", () => {
      beforeAll(async function () {
        jasmine.clock().install();
        this.result = delay(100);
      });

      afterAll(async function () {
        jasmine.clock().uninstall();
      });

      it("the function waits for 100ms before executing", async function () {
        await expectAsync(this.result).toBePending();
        jasmine.clock().tick(101);
        await expectAsync(this.result).toBeResolved();
      });
    });

    describe("when we wait for a delay of 500ms", () => {
      beforeAll(async function () {
        jasmine.clock().install();
        this.result = delay(500);
      });

      afterAll(async function () {
        jasmine.clock().uninstall();
      });

      it("the function waits for 500ms before executing", async function () {
        await expectAsync(this.result).toBePending();
        jasmine.clock().tick(501);
        await expectAsync(this.result).toBeResolved();
      });
    });
  });

  describe(".hoursToMs", () => {
    let result;

    describe("passing a value of 12 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(12);
      });

      it("the function returns '43200000'", () => {
        expect(result).toBe(432e5);
      });
    });

    describe("passing a value of 0 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(0);
      });

      it("the function returns '0'", () => {
        expect(result).toBe(0);
      });
    });

    describe("passing a value of 100000 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(1e5);
      });

      it("the function returns '360000000000'", () => {
        expect(result).toBe(36e10);
      });
    });
  });

  describe(".daysToMs", () => {
    let result;

    describe("passing a value of 12 into the function", () => {
      beforeAll(() => {
        result = daysToMs(12);
      });

      it("the function returns '1036800000'", () => {
        expect(result).toBe(10368e5);
      });
    });

    describe("passing a value of 0 into the function", () => {
      beforeAll(() => {
        result = daysToMs(0);
      });

      it("the function returns '0'", () => {
        expect(result).toBe(0);
      });
    });
  });

  describe(".moreThanXhoursPassedSince", () => {
    let oneDayInMs;
    let threeHoursInMs;

    beforeAll(() => {
      oneDayInMs = 864e5;
      threeHoursInMs = 108e5;
    });

    describe("if more than 3 hours have passed since exactly one day ago", () => {
      let result;

      beforeAll(() => {
        const oneDayBehind = new Date().getTime() - oneDayInMs;
        const date = new Date(oneDayBehind);

        result = moreThanXhoursPassedSince(threeHoursInMs, date);
      });

      it("function returns true", () => {
        expect(result).toBe(true);
      });
    });

    describe("if more than 1 day has passed since three hours ago", () => {
      let result;

      beforeAll(() => {
        const threeHoursBehind = new Date().getTime() - threeHoursInMs;
        const date = new Date(threeHoursBehind);

        result = moreThanXhoursPassedSince(oneDayInMs, date);
      });

      it("function returns false", () => {
        expect(result).toBe(false);
      });
    });
  });

  describe(".msPassedSince", () => {
    describe("when a date is three hours behind the current time", () => {
      let result;

      beforeAll(() => {
        const threeHoursInMs = 108e5;
        const threeHoursBehind = new Date().getTime() - threeHoursInMs;
        const date = new Date(threeHoursBehind);

        result = msPassedSince(date);
      });

      it("function returns 10800000", () => {
        expect(result).toBeGreaterThan(10799995);
      });
    });

    describe("when a future date is passed in", () => {
      let result;
      let date;
      let thrownError;

      beforeAll(() => {
        const threeHoursInMs = 108e5;
        const threeHoursAhead = new Date().getTime() + threeHoursInMs;
        date = new Date(threeHoursAhead);
        try {
          result = msPassedSince(date);
        } catch (err) {
          thrownError = err;
        }
      });

      it("function throws Error", () => {
        expect(thrownError.message).toBe("Cannot enter future date");
      });
    });
  });
});
