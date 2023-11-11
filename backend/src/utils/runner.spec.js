import { createLoggerMock } from "./logger.mock.js";
import { Runner } from "./runner.js";

describe("runner.js", () => {
  describe(".run()", () => {
    describe("calls .runSync() if sync option is set to true", () => {
      beforeAll(function () {
        this.runner = new Runner(createLoggerMock(), options(delayMock, 0, 2, true));

        spyOn(this.runner, "runAsync").and.callFake(() => {});
        spyOn(this.runner, "runSync").and.callFake(() => {});

        this.runner.run([], []);
      });

      it(".runSync() was called", function () {
        expect(this.runner.runSync).toHaveBeenCalled();
      });

      it(".runAsync() was not called", function () {
        expect(this.runner.runAsync).not.toHaveBeenCalled();
      });
    });

    describe("calls .runPallalel() if sync option is set to false", () => {
      beforeAll(function () {
        this.runner = new Runner(createLoggerMock(), options(delayMock, 0, 2, false));

        spyOn(this.runner, "runAsync").and.callFake(() => {});
        spyOn(this.runner, "runSync").and.callFake(() => {});

        this.runner.run([], []);
      });

      it(".runSync() was not called", function () {
        expect(this.runner.runSync).not.toHaveBeenCalled();
      });

      it(".runAsync() was called", function () {
        expect(this.runner.runAsync).toHaveBeenCalled();
      });
    });
  });

  describe(".runAsync()", () => {
    describe("runs one function in a loop", () => {
      describe("for one iteration", () => {
        it("and calls the function once", async () => {
          const funcSpy = jasmine.createSpy("funcSpy");
          const result = new Runner(createLoggerMock(), options()).runAsync(
            [funcSpy],
            [],
          );

          await expectAsync(result).toBeResolved();
          expect(funcSpy).toHaveBeenCalledTimes(1);
        });
      });

      describe("for two iteration", () => {
        it("and calls the function twice", async () => {
          const funcSpy = jasmine.createSpy("funcSpy");
          const result = new Runner(
            createLoggerMock(),
            options(delayMock, 0, 2),
          ).runAsync([funcSpy], []);

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
          const result = new Runner(createLoggerMock(), options()).runAsync(
            [funcOneSpy, funcTwoSpy],
            [],
          );

          await expectAsync(result).toBeResolved();
          expect(funcOneSpy).toHaveBeenCalledTimes(1);
          expect(funcTwoSpy).toHaveBeenCalledTimes(1);
        });
      });

      describe("for two iteration", () => {
        it("and calls the functions twice", async () => {
          const funcOneSpy = jasmine.createSpy("funcOneSpy");
          const funcTwoSpy = jasmine.createSpy("funcTwoSpy");
          const result = new Runner(
            createLoggerMock(),
            options(delayMock, 0, 2),
          ).runAsync([funcOneSpy, funcTwoSpy], []);

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
        this.logger = createLoggerMock();

        this.result = new Runner(this.logger, options(delayMock, 0, 2)).runAsync(
          [expectedErrorThrower],
          [ExpectedError],
        );
      });

      it("the expected errror is catched", async function () {
        await expectAsync(this.result).toBeResolved();
      });

      it("a warn message is logged", function () {
        expect(this.logger.warn).toHaveBeenCalled();
      });
    });

    describe("when one running function throws an unexpected error,", function () {
      beforeAll(function () {
        this.unexpectedErrorThrower = async function () {
          throw new UnexpectedError();
        };

        this.result = new Runner(createLoggerMock(), options(delayMock, 0, 2)).runAsync(
          [this.unexpectedErrorThrower],
          [ExpectedError],
        );
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

        this.logger = createLoggerMock();

        this.result = new Runner(this.logger, options(delayMock, 0, 2)).runAsync(
          [funcOne, funcTwo],
          [ExpectedError],
        );
      });

      it("the expected errror is catched", async function () {
        await expectAsync(this.result).toBeResolved();
      });

      it("a warn message is logged", function () {
        expect(this.logger.warn).toHaveBeenCalled();
      });

      it("funcOne and funcTwo are executed twice", function () {
        expect(counterFuncOne).toBe(2);
        expect(counterFuncTwo).toBe(2);
      });
    });
  });

  describe("runSync()", () => {
    describe("runs two functions in a loop sequentially", () => {
      describe("for one iteration", () => {
        it("and calls each functions once", async () => {
          const funcOneSpy = jasmine.createSpy("funcOneSpy");
          const funcTwoSpy = jasmine.createSpy("funcTwoSpy");
          const result = new Runner(createLoggerMock(), options()).runSync(
            [funcOneSpy, funcTwoSpy],
            [],
          );

          await expectAsync(result).toBeResolved();
          expect(funcOneSpy).toHaveBeenCalledTimes(1);
          expect(funcOneSpy).toHaveBeenCalledBefore(funcTwoSpy);
          expect(funcTwoSpy).toHaveBeenCalledTimes(1);
        });
      });

      describe("for two iterations", () => {
        it("and calls the functions twice sequentially", async () => {
          const funcOneSpy = jasmine.createSpy("funcOneSpy");
          const funcTwoSpy = jasmine.createSpy("funcTwoSpy");
          const result = new Runner(createLoggerMock(), options(delayMock, 0, 2)).runSync(
            [funcOneSpy, funcTwoSpy],
            [],
          );

          await expectAsync(result).toBeResolved();
          const funcOneSpyCalls = funcOneSpy.calls.all();
          const funcTwoSpyCalls = funcTwoSpy.calls.all();
          expect(
            funcOneSpyCalls[0].invocationOrder <
              funcTwoSpyCalls[0].invocationOrder <
              funcOneSpyCalls[1].invocationOrder,
          ).toBe(true);
          expect(
            funcTwoSpyCalls[0].invocationOrder <
              funcOneSpyCalls[1].invocationOrder <
              funcTwoSpyCalls[1].invocationOrder,
          ).toBe(true);
          expect(funcOneSpy).toHaveBeenCalledTimes(2);
          expect(funcTwoSpy).toHaveBeenCalledTimes(2);
        });
      });

      describe("when one of two running functions throws an expected error,", function () {
        let funcOneSpy;
        let funcTwoSpy;
        beforeAll(function () {
          funcOneSpy = jasmine
            .createSpy("funcOneSpy")
            .and.throwError(new ExpectedError());
          funcTwoSpy = jasmine.createSpy("funcTwoSpy");

          this.logger = createLoggerMock();

          this.result = new Runner(this.logger, options(delayMock, 0, 2)).runSync(
            [funcOneSpy, funcTwoSpy],
            [ExpectedError],
          );
        });

        it("the expected errror is catched", async function () {
          await expectAsync(this.result).toBeResolved();
        });

        it("a warn message is logged", function () {
          expect(this.logger.warn).toHaveBeenCalled();
        });

        it("funcOne and funcTwo are executed twice", function () {
          expect(funcOneSpy).toHaveBeenCalledTimes(2);
          expect(funcTwoSpy).toHaveBeenCalledTimes(2);
        });

        it("funcOne and funcTwo are executed in the right order", function () {
          const funcOneSpyCalls = funcOneSpy.calls.all();
          const funcTwoSpyCalls = funcTwoSpy.calls.all();
          expect(
            funcOneSpyCalls[0].invocationOrder <
              funcTwoSpyCalls[0].invocationOrder <
              funcOneSpyCalls[1].invocationOrder,
          ).toBe(true);
          expect(
            funcTwoSpyCalls[0].invocationOrder <
              funcOneSpyCalls[1].invocationOrder <
              funcTwoSpyCalls[1].invocationOrder,
          ).toBe(true);
        });
      });
    });
  });
});

function options(
  delayFn = delayMock,
  iterationDelay = 0,
  iterations = 1,
  syncOn = false,
) {
  return {
    delayFn,
    iterationDelay,
    iterations,
    syncOn,
  };
}

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
