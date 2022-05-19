import { delay } from "../shared/time.utils.js";

export class Runner {
  #executables;
  #options;

  constructor(executables, options = { iterations: Number.POSITIVE_INFINITY }) {
    this.#executables = executables;
    this.#options = options;
  }

  async run() {
    this.#executables.forEach((func) => {
      this.#runForNumberOfIterations(func);
    });
  }

  async #runForNumberOfIterations(func) {
    for (let i = 0; i < this.#options.iterations; i++) {
      await func();
    }
  }

  async #runForNumberOfIterationsXXX(func) {
    while(this.#options.iterations--) {
      await func();
      
      if (this.#options.iterationDelay) await delay(this.#options.iterationDelay);
    }
  }
}
