export class ValidDataSources {
  static validDataSources = this.#createValidDataSourcesEnum([
    "steamWeb",
    "steamcharts",
    "steamApi",
  ]);

  static #createValidDataSourcesEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
  }
}
