export class ReleaseDate {
  date;
  comingSoon;

  copy() {
    const copy = new ReleaseDate();
    copy.date = this.date;
    copy.comingSoon = this.comingSoon;

    return copy;
  }

  static fromSteamWeb(page) {
    const releaseDate = new ReleaseDate();
    releaseDate.date = releaseDate.#extractReleaseDateViaSteamWeb(page);
    releaseDate.comingSoon = releaseDate.#isGettingReleasedSoon();

    return releaseDate;
  }

  #extractReleaseDateViaSteamWeb(page) {
    const releaseDateElement = page.querySelector(".release_date .date");

    if (!releaseDateElement) return null;

    const releaseDate = new Date(`${releaseDateElement.textContent.trim()} UTC`);

    return releaseDate == "Invalid Date" ? null : releaseDate;
  }

  #isGettingReleasedSoon() {
    if (!this.date) return true;
    return this.date > new Date();
  }

  static fromSteamAppRaw(date, comingSoon) {
    const releaseDate = new ReleaseDate();
    releaseDate.date = releaseDate.#getSteamAppRawReleaseDate(date);
    releaseDate.comingSoon = releaseDate.#getSteamApiRawReleaseStatus(comingSoon);

    return releaseDate;
  }

  #getSteamAppRawReleaseDate(rawReleaseDate) {
    if (!rawReleaseDate) return null;

    const fixedReleaseDate = new Date(`${rawReleaseDate} UTC`);

    return fixedReleaseDate == "Invalid Date" ? null : fixedReleaseDate;
  }

  #getSteamApiRawReleaseStatus(comingSoon) {
    if (typeof comingSoon === "undefined") return true;

    return comingSoon;
  }

  static fromDb(releaseDate) {
    const fixedReleaseDate = new ReleaseDate();
    fixedReleaseDate.date = releaseDate.date;
    fixedReleaseDate.comingSoon = releaseDate.comingSoon;

    return fixedReleaseDate;
  }

  updateReleaseDate(newReleaseDate) {
    if (newReleaseDate <= this.date) return;

    this.date = newReleaseDate;

    if (this.date <= new Date()) this.comingSoon = false;
  }
}
