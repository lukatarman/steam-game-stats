import { delay } from "../shared/time.utils.js";
import { Runner } from "./runner.js";

fdescribe("runner.js", () => {
  describe("runs one function in a loop for one iteration", () => {
    let counter = 0;

    beforeAll(() => {
      const func = () => counter++;
      const options = { iterations: 1 };
      const runner = new Runner([func], options);

      runner.run();
    });

    it("should increment the coutner by 1", () => {
      expect(counter).toBe(1);
    });
  });

  describe("runs one function in a loop for multiple iterations", () => {
    let counter = 0;

    beforeAll(() => {
      const func = () => counter++;
      const options = { iterations: 5 };
      const runner = new Runner([func], options);

      runner.run();
    });

    it("should increment the coutner by 5", () => {
      expect(counter).toBe(5);
    });
  });

  describe("runs multiple functions in parallel in a loop for one iteration", () => {
    let counterOne = 0;
    let counterTwo = 0;
    let passedTime;

    beforeAll(() => {
      const funcOne = async () => { counterOne++; await delay(500); };
      const funcTwo = async () => { counterTwo++; await delay(500); };
      const options = { iterations: 1 };
      const runner = new Runner([funcOne, funcTwo], options);

      const beforeStart = new Date();
      runner.run();
      const afterStart = new Date();
      passedTime = afterStart.getTime() - beforeStart.getTime();
    });

    it("should increment coutner one by 1", () => {
      expect(counterOne).toBe(1);
    });

    it("should increment coutner two by 1", () => {
      expect(counterTwo).toBe(1);
    });

    it("should run in parallel", () => {
      expect(passedTime).toBeLessThan(1000);
    });
  });

  xdescribe("runs multiple functions in parallel in a loop for multiple iterations", () => {});
});