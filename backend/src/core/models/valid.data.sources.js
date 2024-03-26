export class ValidDataSources {
  static validDataSources = this.#createValidDataSourcesEnum([
    "steamWeb",
    "steamcharts",
    "steamDb",
  ]);

  static #createValidDataSourcesEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
  }

  static getSourceUrl(id, source) {
    if (source === ValidDataSources.validDataSources.steamWeb)
      return `https://store.steampowered.com/app/${id}`;
    if (source === ValidDataSources.validDataSources.steacharts)
      return `https://steamcharts.com/app/${id}`;
    if (source === ValidDataSources.validDataSources.steamDb)
      return `https://steamdb.info/app/${id}/info/`;
  }
}
