export class StandardizedDate {
  date;

  constructor(date) {
    this.date = date == "Invalid Date" ? "" : new Date(date);
  }

  static getUTCDate(rawDate) {
    const standardizedDate = new StandardizedDate(rawDate);

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
