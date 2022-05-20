import { delay, hoursToMs } from "./time.utils.js";

describe("time.utils.js", () => {
  describe(".delay", () => {
    let timePassed;

    describe("0 is passed in as an argument", () => {
      beforeAll(async () => {
        const timestampOne = new Date().getTime();
        await delay(0);
        const timestampTwo = new Date().getTime();
        timePassed = timestampTwo - timestampOne;
      });

      it("the function waits for a negligable time", () => {
        expect(timePassed).toBeLessThanOrEqual(30);
        expect(timePassed).toBeGreaterThanOrEqual(0);
      });
    });

    describe("a value of 100 is passed in as an argument", () => {
      beforeAll(async () => {
        const timestamOne = new Date().getTime();
        await delay(100);
        const timestampTwo = new Date().getTime();
        timePassed = timestampTwo - timestamOne;
      });

      it("the function waits 100ms", () => {
        expect(timePassed).toBeLessThanOrEqual(130);
        expect(timePassed).toBeGreaterThanOrEqual(95);
      });
    });

    describe("a value of 500 is passed in as an argument", () => {
      beforeAll(async () => {
        const timestamOne = new Date().getTime();
        await delay(500);
        const timestampTwo = new Date().getTime();
        timePassed = timestampTwo - timestamOne;
      });

      it("the function waits 500ms", () => {
        expect(timePassed).toBeLessThanOrEqual(530);
        expect(timePassed).toBeGreaterThanOrEqual(495);
      });
    });
  });

  describe(".hoursToMs", () => {
    let result;
    
    describe("passing a value of 12 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(12);
      })

      it("the function returns '43200000'", () => {
        expect(result).toBe(432e5);
      })
    })

    describe("passing a value of 0 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(0);
      })

      it("the function returns '43200000'", () => {
        expect(result).toBe(0);
      })
    })

    describe("passing a value of 100000 into the function", () => {
      beforeAll(() => {
        result = hoursToMs(1e5);
      })

      it("the function returns '360000000000'", () => {
        expect(result).toBe(36e10);
      })
    })
  })
});
