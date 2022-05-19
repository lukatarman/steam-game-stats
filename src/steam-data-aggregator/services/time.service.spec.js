import {
  moreThanXhoursPassedSince ,
  msPassedSince,
  runFuncInLoopWithDelayOfXmsFromDate,
} from "./time.service.js";

describe("time.service.js", () => {
  describe(".moreThanXhoursPassedSince", () => {
    let oneDayInMs;
    let threeHoursInMs;

    beforeAll(() => {
      oneDayInMs = 864e5;
      threeHoursInMs = 108e5;
    });
    
    describe("if the date value is larger than 'x' hours passed", () => {
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

    describe("if the date value is smaller than 'x' hours passed", () => {
      let result;

      beforeAll(() => {
        const threeHoursBehind = new Date().getTime() - threeHoursInMs;
        const date = new Date(threeHoursBehind);

        result = moreThanXhoursPassedSince(oneDayInMs, date);
      });

      it("function returns true", () => {
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
        expect(result).toBeGreaterThan(10899995);
      });
    });
  });
});