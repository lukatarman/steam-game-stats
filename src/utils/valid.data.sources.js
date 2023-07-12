export class ValidDataSources {
  static validDataSources = this.#createValidDataSourcesEnum(["steamWeb", "steamcharts"]);

  static #createValidDataSourcesEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
  }
}
