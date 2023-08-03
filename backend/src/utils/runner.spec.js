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
    beforeEach(function () {
      jasmine.clock().install();

      this.expectedErrorThrower = async function () {
        delay(2000);
        jasmine.clock().tick(2000);
        throw new ExpectedError();
      };
      this.logger = jasmine.createSpyObj("logger", ["warn"]);

      this.runner = new XXXRunner(this.logger, delayMock, { iterationDelay: 0 }, 2);
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });

    it("the expected errror is catched", async function () {
      try {
        await this.runner.run([this.expectedErrorThrower], [ExpectedError]);
      } catch (error) {
        fail(`expected error should have been catched; error: ${error}`);
      }
    });

    it("a warn message is logged", async function () {
      try {
        await this.runner.run([this.expectedErrorThrower], [ExpectedError]);
      } catch (error) {
        fail(`expected error should have been catched; error: ${error}`);
      }

      expect(this.logger.warn).toHaveBeenCalled();
    });
  });

  describe("when one running function throws an unexpected error,", function () {
    beforeEach(function () {
      jasmine.clock().install();

      this.unexpectedErrorThrower = async function () {
        delay(2000);
        jasmine.clock().tick(2000);
        throw new UnexpectedError();
      };

      this.runner = new XXXRunner(
        { warn: () => {} },
        delayMock,
        { iterationDelay: 0 },
        2,
      );
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });

    it("the unexpected errror rethrown", async function () {
      try {
        await this.runner.run([this.unexpectedErrorThrower], [ExpectedError]);
        fail("run: an error run should have been thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(UnexpectedError);
      }
    });
  });

  describe("when one of two running functions throws an expected error,", function () {
    let funcs;
    let counterFuncOne = 0;
    let counterFuncTwo = 0;

    beforeAll(function () {
      jasmine.clock().install();

      funcs = {
        funcOne: async function () {
          counterFuncOne++;
          delay(2000);
          jasmine.clock().tick(2000);
          throw new ExpectedError();
        },
        funcTwo: async function () {
          counterFuncTwo++;
          delay(2000);
          jasmine.clock().tick(2000);
        },
      };

      this.logger = jasmine.createSpyObj("logger", ["warn"]);

      this.result = new XXXRunner(this.logger, delayMock, { iterationDelay: 0 }, 2).run(
        [funcs.funcOne, funcs.funcTwo],
        [ExpectedError],
      );
    });

    afterAll(function () {
      jasmine.clock().uninstall();
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
