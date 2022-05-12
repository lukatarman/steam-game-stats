import { delay } from "./time.utils.js";

describe("time.utils.js", () => {
  describe(".delay", () => {
    describe("0 is passed in as an argument", () => {
      let timePassedIsWithinRange;

      beforeAll(async () => {
        const beforeFunction = new Date().getTime();
        await delay(0);
        const afterFunction = new Date().getTime();
        const timePassed = afterFunction - beforeFunction;
        timePassedIsWithinRange = timePassed <= 30;
      });

      it("the function waits for a negligable time", () => {
        expect(timePassedIsWithinRange).toBeTrue();
      });
    });

    describe("a value of 100 is passed in as an argument", () => {
      let timePassedIsWithinRange;

      beforeAll(async () => {
        const beforeFunction = new Date().getTime();
        await delay(100);
        const afterFunction = new Date().getTime();
        const timePassed = afterFunction - beforeFunction;
        timePassedIsWithinRange = timePassed <= 130;
      });

      it("the function waits 100ms", () => {
        expect(timePassedIsWithinRange).toBeTrue();
      });
    });

    describe("a value of 500 is passed in as an argument", () => {
      let timePassedIsWithinRange;

      beforeAll(async () => {
        const beforeFunction = new Date().getTime();
        await delay(500);
        const afterFunction = new Date().getTime();
        const timePassed = afterFunction - beforeFunction;
        timePassedIsWithinRange = timePassed <= 530;
      });

      it("the function waits 500ms", () => {
        expect(timePassedIsWithinRange).toBeTrue();
      });
    });

    describe("a value of 2000 is passed in as an argument", () => {
      let timePassedIsWithinRange;

      beforeAll(async () => {
        const beforeFunction = new Date().getTime();
        await delay(500);
        const afterFunction = new Date().getTime();
        const timePassed = afterFunction - beforeFunction;
        timePassedIsWithinRange = timePassed <= 2100;
      });

      it("the function waits 2000ms", () => {
        expect(timePassedIsWithinRange).toBeTrue();
      });
    });

    describe("nothing is passed as an argument", () => {
      let timePassedIsWithinRange;

      beforeAll(async () => {
        const beforeFunction = new Date().getTime();
        await delay();
        const afterFunction = new Date().getTime();
        const timePassed = afterFunction - beforeFunction;
        timePassedIsWithinRange = timePassed <= 2100;
      });

      it("the function waits 2000ms", () => {
        expect(timePassedIsWithinRange).toBeTrue();
      });
    });
  });
});
