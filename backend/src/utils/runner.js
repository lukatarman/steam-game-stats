import { delay } from "../utils/time.utils.js";

export class Runner {
  #executables;
  #options;
  #iterations;

  constructor(executables, options, iterations = Number.POSITIVE_INFINITY) {
    this.#executables = executables;
    this.#options = options;
    this.#iterations = iterations;
  }

  async run() {
    const execPromises = [];
    for (let exec of this.#executables) {
      execPromises.push(this.#runFuncForNumberOfIterations(exec));
    }

    await Promise.all(execPromises);
  }

  async #runFuncForNumberOfIterations(func) {
    // Counting down from a property of an object increases the time needed to perform
    // the first iterations in the loop compared to using a primitive. The tests of this
    // function rely on very short iteration times. If they are slowed down some tests are
    // failing unexpextedly. Don't refactor next two lines.
    let iterations = this.#iterations;
    while (iterations--) {
      await func();

      if (this.#options.iterationDelay) await delay(this.#options.iterationDelay);
    }
  }

  async runSafe(expectedErrors) {
    const execPromises = [];
    for (let exec of this.#executables) {
      execPromises.push(this.#runFuncForNumberOfIterationsSafe(exec, expectedErrors));
    }

    await Promise.all(execPromises);
  }

  async #runFuncForNumberOfIterationsSafe(func, expectedErrorTypes) {
    // Counting down from a property of an object increases the time needed to perform
    // the first iterations in the loop compared to using a primitive. The tests of this
    // function rely on very short iteration times. If they are slowed down some tests are
    // failing unexpextedly. Don't refactor next two lines.
    let iterations = this.#iterations;
    while (iterations--) {
      try {
        await func();
      } catch (error) {
        const thrownErrorTypeIndex = expectedErrorTypes.findIndex(
          (expectedErrorType) => error instanceof expectedErrorType,
        );
        if (thrownErrorTypeIndex === -1) throw error;
        console.warn(`[WARN]: ${func.name}: ${error.message}`);
      }

      if (this.#options.iterationDelay) await delay(this.#options.iterationDelay);
    }
  }
}

export class XXXRunner {
  #logger;
  #options;
  #iterations;

  constructor(logger, options, iterations = Number.POSITIVE_INFINITY) {
    this.#logger = logger;
    this.#options = options;
    this.#iterations = iterations;
  }

  async run(executables, expectedErrorTypes) {
    const execPromises = [];
    for (let exec of executables) {
      execPromises.push(this.#runFuncForNumberOfIterations(exec, expectedErrorTypes));
    }

    await Promise.all(execPromises);
  }

  async #runFuncForNumberOfIterations(func, expectedErrorTypes) {
    // Counting down from a property of an object increases the time needed to perform
    // the first iterations in the loop compared to using a primitive. The tests of this
    // function rely on very short iteration times. If they are slowed down some tests are
    // failing unexpextedly. Don't refactor next two lines.
    let iterations = this.#iterations;
    while (iterations--) {
      try {
        await func();
      } catch (error) {
        const thrownErrorTypeIndex = expectedErrorTypes.findIndex(
          (expectedErrorType) => error instanceof expectedErrorType,
        );
        if (thrownErrorTypeIndex === -1) throw error;
        this.#logger.warn(`${func.name}: ${error.message}`);
      }

      if (this.#options.iterationDelay) await delay(this.#options.iterationDelay);
    }
  }
}
