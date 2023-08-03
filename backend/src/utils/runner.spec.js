import { delay } from "../utils/time.utils.js";
import { Runner, XXXRunner } from "./runner.js";

describe("runner.js", () => {
  describe("runs one function in a loop for one iteration", () => {
    let counter = 0;

    beforeAll(async () => {
      const func = () => counter++;
      const iterations = 1;
      const options = { iterationDelay: 0 };
      const runner = new Runner([func], options, iterations);

      await runner.run();
    });

    it("should increment the coutner by 1", () => {
      expect(counter).toBe(1);
    });
  });

  describe("runs one function in a loop for multiple iterations", () => {
    let counter = 0;

    beforeAll(async () => {
      const func = () => counter++;
      const iterations = 5;
      const options = { iterationDelay: 0 };
      const runner = new Runner([func], options, iterations);

      await runner.run();
    });

    it("should increment the coutner by 5", () => {
      expect(counter).toBe(5);
    });
  });

  describe("runs multiple functions in parallel for 280 miliseconds", () => {
    let counterOne = 0;
    let counterTwo = 0;

    beforeAll(async () => {
      const funcOne = async () => {
        await delay(80);
        counterOne++;
      };
      const funcTwo = async () => {
        await delay(80);
        counterTwo++;
      };
      const iterations = 10;
      const options = { iterationDelay: 0 };
      const runner = new Runner([funcOne, funcTwo], iterations, iterations);

      await runner.run();
      await delay(280);
    });

    it("should increment coutner one by 3", () => {
      expect(counterOne).toBe(3);
    });

    it("should increment coutner two by 3", () => {
      expect(counterTwo).toBe(3);
    });
  });

  describe("runs multiple functions with different delays in parallel for 130 miliseconds", () => {
    let counterOne = 0;
    let counterTwo = 0;
    let counterThree = 0;
    let counterFour = 0;
    let counterHasDuplicates = true;

    beforeAll(async () => {
      const funcOne = async () => {
        await delay(10);
        counterOne++;
      };
      const funcTwo = async () => {
        await delay(30);
        counterTwo++;
      };
      const funcThree = async () => {
        await delay(50);
        counterThree++;
      };
      const funcFour = async () => {
        await delay(90);
        counterFour++;
      };
      const iterations = 10;
      const options = { iterationDelay: 0 };
      const runner = new Runner(
        [funcOne, funcTwo, funcThree, funcFour],
        options,
        iterations,
      );
      function checkIfHasDuplicates(arr) {
        return new Set(arr).size !== arr.length;
      }
      await runner.run();
      await delay(130);
      const results = [counterOne, counterTwo, counterThree, counterFour];

      counterHasDuplicates = checkIfHasDuplicates(results);
    });

    it("the different functions should run different amount of times", () => {
      expect(counterHasDuplicates).toBe(false);
    });
  });

  describe("when one running function throws an expected error,", function () {
    beforeAll(function () {
      const expectedErrorThrower = async function () {
        throw new ExpectedError();
      };
      this.logger = jasmine.createSpyObj("logger", ["warn"]);

      this.result = new XXXRunner(this.logger, delayMock, 0, 2).run(
        [expectedErrorThrower],
        [ExpectedError],
      );
    });

    it("the expected errror is catched", async function () {
      await expectAsync(this.result).toBeResolved();
    });

    it("a warn message is logged", async function () {
      expect(this.logger.warn).toHaveBeenCalled();
    });
  });

  describe("when one running function throws an unexpected error,", function () {
    beforeEach(function () {
      this.unexpectedErrorThrower = async function () {
        throw new UnexpectedError();
      };

      this.result = new XXXRunner(
        { warn: () => {} },
        delayMock,
        { iterationDelay: 0 },
        2,
      ).run([this.unexpectedErrorThrower], [ExpectedError]);
    });

    it("the unexpected errror rethrown", async function () {
      await expectAsync(this.result).toBeRejected();
    });
  });

  describe("when one of two running functions throws an expected error,", function () {
    let counterFuncOne = 0;
    let counterFuncTwo = 0;

    beforeAll(function () {
      const funcOne = async function () {
        counterFuncOne++;
        throw new ExpectedError();
      };
      const funcTwo = async function () {
        counterFuncTwo++;
      };

      this.logger = jasmine.createSpyObj("logger", ["warn"]);

      this.result = new XXXRunner(this.logger, delayMock, 0, 2).run(
        [funcOne, funcTwo],
        [ExpectedError],
      );
    });

    it("the expected errror is catched", async function () {
      await expectAsync(this.result).toBeResolved();
    });

    it("a warn message is logged", async function () {
      expect(this.logger.warn).toHaveBeenCalled();
    });

    it("funcOne and funcTwo are executed twice", async function () {
      expect(counterFuncOne).toBe(2);
      expect(counterFuncTwo).toBe(2);
    });
  });
});

function delayMock(iterationDelay) {
  return Promise.resolve();
}

class ExpectedError extends Error {
  constructor() {
    super("expected error");
  }
}

class UnexpectedError extends Error {
  constructor() {
    super("unexpected error");
  }
}
