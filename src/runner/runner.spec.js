import { delay } from "../shared/time.utils.js";
import { Runner } from "./runner.js";

describe("runner.js", () => {
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

  describe("runs multiple functions in parallel for 1600 miliseconds", () => {
    let counterOne = 0;
    let counterTwo = 0;

    beforeAll(async () => {
      const funcOne = async () => {  await delay(500); counterOne++; };
      const funcTwo = async () => {  await delay(500); counterTwo++; };
      const options = { iterations: 10 };
      const runner = new Runner([funcOne, funcTwo], options);

      runner.run();
      await delay(1600);
    });

    it("should increment coutner one by 3", () => {
      expect(counterOne).toBe(3);
    });

    it("should increment coutner two by 3", () => {
      expect(counterTwo).toBe(3);
    });
  });

  describe("runs multiple functions with different delays in parallel for 880 miliseconds", () => {
    let counterOne = 0;
    let counterTwo = 0;
    let counterThree = 0;
    let counterFour = 0;

    beforeAll(async () => {
      const funcOne = async () => { await delay(100); counterOne++; };
      const funcTwo = async () => { await delay(200); counterTwo++; };
      const funcThree = async () => { await delay(400); counterThree++; };
      const funcFour = async () => { await delay(300); counterFour++; };
      const options = { iterations: 10 };
      const runner = new Runner([funcOne, funcTwo, funcThree,funcFour], options);

      runner.run();
      await delay(880);
    });

    it("the function with the delay of 100 should increment the counter 8 times", () => {
      expect(counterOne).toBe(8);
    });

    it("the function with the delay of 200 should increment the counter 6 times", () => {
      expect(counterTwo).toBe(4);
    });

    it("the function with the delay of 400 should increment the counter 3 times", () => {
      expect(counterThree).toBe(2);
    });

    it("the function with the delay of 300 should increment the counter 4 times", () => {
      expect(counterFour).toBe(2);
    });
  });
});