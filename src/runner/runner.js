export class Runner {
  #executables;
  #options;

  constructor(executables, options) {
    this.#executables = executables;
    this.#options = options;
  }

  run() {
    for (let i = 0; i < this.#options.iterations; i++) {
      this.#executables[0]();
    }
  }
}