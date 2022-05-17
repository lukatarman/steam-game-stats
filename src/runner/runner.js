/**
 * @todo
 * - receives as arguments
 *   - array of executables
 *   - running options like delay
 * - executes them in parallel
 * - run executions in a loop
 *   - number of cycles should be 1..infinity
 */

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