export class StandardizedDate {
  date;

  constructor(rawDate) {
    const date = new Date(rawDate);

    this.date = date == "Invalid Date" ? "" : date;
  }

  static getUTCDate(date) {
    const standardizedDate = new StandardizedDate(date);

    if (standardizedDate.date === "") return standardizedDate;

    standardizedDate.#toUTC();

    return standardizedDate;
  }

  #toUTC() {
    this.date = new Date(
      Date.UTC(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        this.date.getHours(),
        this.date.getMinutes(),
        this.date.getSeconds(),
      ),
    );
  }
}
