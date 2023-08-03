import { Runner } from "./runner.js";

describe("runner.js", () => {
  describe("runs one function in a loop", () => {
    describe("for one iteration", () => {
      it("and calls the function once", async () => {
        const funcSpy = jasmine.createSpy("funcSpy");
        const result = new Runner({ warn: () => {} }, delayMock, 0, 1).run([funcSpy], []);
        await expectAsync(result).toBeResolved();
        expect(funcSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("for two iteration", () => {
      it("and calls the function twice", async () => {
        const funcSpy = jasmine.createSpy("funcSpy");
        const result = new Runner({ warn: () => {} }, delayMock, 0, 2).run([funcSpy], []);
        await expectAsync(result).toBeResolved();
        expect(funcSpy).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("runs two functions in a loop", () => {
    describe("for one iteration", () => {
      it("and calls the functions once", async () => {
        const funcOneSpy = jasmine.createSpy("funcOneSpy");
        const funcTwoSpy = jasmine.createSpy("funcTwoSpy");
        const result = new Runner({ warn: () => {} }, delayMock, 0, 1).run(
          [funcOneSpy, funcTwoSpy],
          [],
        );
        await expectAsync(result).toBeResolved();
        expect(funcOneSpy).toHaveBeenCalledTimes(1);
        expect(funcTwoSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("for two iteration", () => {
      it("and calls the functions once", async () => {
        const funcOneSpy = jasmine.createSpy("funcOneSpy");
        const funcTwoSpy = jasmine.createSpy("funcTwoSpy");
        const result = new Runner({ warn: () => {} }, delayMock, 0, 2).run(
          [funcOneSpy, funcTwoSpy],
          [],
        );
        await expectAsync(result).toBeResolved();
        expect(funcOneSpy).toHaveBeenCalledTimes(2);
        expect(funcTwoSpy).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("when one running function throws an expected error,", function () {
    beforeAll(function () {
      const expectedErrorThrower = async function () {
        throw new ExpectedError();
      };
      this.logger = jasmine.createSpyObj("logger", ["warn"]);

      this.result = new Runner(this.logger, delayMock, 0, 2).run(
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

      this.result = new Runner(
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

      this.result = new Runner(this.logger, delayMock, 0, 2).run(
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
