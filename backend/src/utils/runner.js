import cloneDeep from "lodash.clonedeep";

const defaultOptions = {
  delayFn: () => Promise.resolve(),
  globalIterationDelay: 5000,
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

    if (options.globalIterationDelay === undefined) {
      options.globalIterationDelay = 5000;
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

  async #runFuncForNumberOfIterations({ func, delay }, expectedErrorTypes) {
    // Counting down from a property of an object increases the time needed to perform
    // the first iterations in the loop compared to using a primitive. The tests of this
    // function rely on very short iteration times. If they are slowed down some tests are
    // failing unexpextedly. Don't refactor next two lines.
    const iterationDelay = delay || this.#options.globalIterationDelay;

    let iterations = this.#options.iterations;
    while (iterations--) {
      try {
        await func();
      } catch (error) {
        this.#handleError(func, error, expectedErrorTypes);
      }

      if (iterationDelay > 0) await this.#options.delayFn(iterationDelay);
    }
  }

  #handleError(func, error, expectedErrorTypes) {
    const thrownErrorTypeIndex = expectedErrorTypes.findIndex(
      (expectedErrorType) => error instanceof expectedErrorType,
    );
    if (thrownErrorTypeIndex === -1) throw error;
    this.#logger.warn(
      `runner caught an expected error from the function: '${func.name}', with the message: '${error.message}'`,
    );
  }

  async runSync(executables, expectedErrorTypes) {
    let iterations = this.#options.iterations;
    while (iterations--) {
      await this.#runFuncsOnce(executables, expectedErrorTypes);
    }
  }

  async #runFuncsOnce(executables, expectedErrorTypes) {
    for (let i = 0; i < executables.length; i++) {
      const func = executables[i].func;

      try {
        await func();
      } catch (error) {
        this.#handleError(func, error, expectedErrorTypes);
      }

      if (this.#options.globalIterationDelay > 0)
        await this.#options.delayFn(this.#options.globalIterationDelay);
    }
  }
}
