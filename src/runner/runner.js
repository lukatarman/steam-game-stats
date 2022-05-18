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

  async run() {
    let results= [];

    this.#executables.forEach(func => {
      for (let i = 0; i < this.#options.iterations; i++) {
        results.push(func());
      }
    })

    await Promise.all(results);
  }
}