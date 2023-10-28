import cloneDeep from "lodash.clonedeep";

const defaultOptions = {
  delayFn: () => Promise.resolve(),
  iterationDelay: 0,
  iterations: Number.POSITIVE_INFINITY,
  syncOn: false,
};

export class Runner {
  #logger;
  #options;

  constructor(logger, options = defaultOptions) {
    this.#logger = logger;

    if (options.iterations === undefined) {
      options.iterations = Number.POSITIVE_INFINITY;
    }
    this.#options = cloneDeep(options);
  }

  async run(executables, expectedErrorTypes) {
    if (this.#options.syncOn === true) {
      await this.runSync(executables, expectedErrorTypes);
    } else {
      await this.runAsync(executables, expectedErrorTypes);
    }
  }

  async runAsync(executables, expectedErrorTypes) {
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
    let iterations = this.#options.iterations;
    while (iterations--) {
      try {
        await func();
      } catch (error) {
        const thrownErrorTypeIndex = expectedErrorTypes.findIndex(
          (expectedErrorType) => error instanceof expectedErrorType,
        );
        if (thrownErrorTypeIndex === -1) throw error;
        this.#logger.warn(
          `runner catched an expected error from the function: '${func.name}', with the message: '${error.message}'`,
        );
      }

      if (this.#options.iterationDelay > 0)
        await this.#options.delayFn(this.#options.iterationDelay);
    }
  }

  async runSync(executables, expectedErrorTypes) {
    let iterations = this.#options.iterations;
    while (iterations--) {
      await this.#runFuncsOnce(executables, expectedErrorTypes);
    }
  }

  async #runFuncsOnce(executables, expectedErrorTypes) {
    for (let i = 0; i < executables.length; i++) {
      try {
        await executables[i]();
      } catch (error) {
        const thrownErrorTypeIndex = expectedErrorTypes.findIndex(
          (expectedErrorType) => error instanceof expectedErrorType,
        );
        if (thrownErrorTypeIndex === -1) throw error;
        this.#logger.warn(
          `runner catched an expected error from the function: '${executables[i].name}', with the message: '${error.message}'`,
        );
      }

      if (this.#options.iterationDelay > 0)
        await this.#options.delayFn(this.#options.iterationDelay);
    }
  }
}
