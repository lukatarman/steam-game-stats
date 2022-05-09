import { 
  runFuncInLoopWithDelayOfXmsFromDate, 
  moreThanXhoursPassedSince ,
} from "./time.service.js";

describe("time.service.js", () => {
  describe(".moreThanXhoursPassedSince", () => {
    describe("if the date value is larger than 'x' hours passed", () => {
      let result;

      beforeAll(() => {
        const oneDayInMs = 864e5;
        const threeHoursInMs = 108e5;
        const oneDayBehind = new Date().getTime() - oneDayInMs;
        const date = new Date(oneDayBehind);

        result = moreThanXhoursPassedSince(threeHoursInMs, date);
      })

      it("function returns true", () => {
        expect(result).toBe(true);
      })
    })
  });

  describe(".moreThanXhoursPassedSince", () => {
    describe("if the date value is smaller than 'x' hours passed", () => {
      let result;

      beforeAll(() => {
        const oneDayInMs = 864e5;
        const threeHoursInMs = 108e5;
        const threeHoursBehind = new Date().getTime() - threeHoursInMs;
        const date = new Date(threeHoursBehind);

        result = moreThanXhoursPassedSince(oneDayInMs, date);
      })

      it("function returns true", () => {
        expect(result).toBe(false);
      })
    })
  });
});