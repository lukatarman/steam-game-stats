export class Runner {
  #executables;
  #options;

  constructor(executables, options = { iterations: Number.POSITIVE_INFINITY }) {
    this.#executables = executables;
    this.#options = options;
  }

  async run() {
    this.#loopThroughExecutables();
  }

  #loopThroughExecutables() {
    this.#executables.forEach((func) => {
      this.#runForNumberOfIterations(func);
    });
  }

  async #runForNumberOfIterations(func) {
    for (let i = 0; i < this.#options.iterations; i++) {
      await func();
    }
  }
}
