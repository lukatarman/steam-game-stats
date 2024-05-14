import { PlayerHistory } from "./player.history.js";
import cloneDeep from "lodash.clonedeep";

export class Game {
  id;
  name;
  releaseDate;
  developers;
  genres;
  description;
  imageUrl;
  playerHistory;

  copy() {
    const copy = new Game();
    copy.id = this.id;
    copy.name = this.name;
    copy.releaseDate = this.releaseDate;
    copy.developers = this.developers.slice();
    copy.genres = this.genres.slice();
    copy.description = this.description;
    copy.imageUrl = this.imageUrl;
    copy.playerHistory = PlayerHistory.manyFromDbEntry(this.playerHistory);

    return copy;
  }

  // prettier-ignore
  static fromSteamApp(steamApp, page) {
    const game         = new Game();
    game.id            = steamApp.appid;
    game.name          = steamApp.name;
    game.releaseDate   = game.#extractReleaseDateFrom(page);
    game.developers    = game.#extractDevelopersFrom(page);
    game.genres        = game.#extractGenresFrom(page);
    game.description   = game.#extractDescriptionFrom(page);
    game.imageUrl      = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`
    game.playerHistory = [];
    
    return game;
  }

  // prettier-ignore
  static fromSteamApi(steamApiApp) {
      const game         = new Game();
      game.id            = steamApiApp.steam_appid;
      game.name          = steamApiApp.name;
      game.releaseDate   = game.#extractSteamApiReleaseDateFrom(steamApiApp);
      game.developers    = game.#extractSteamApiDevelopersFrom(steamApiApp);
      game.genres        = game.#extractSteamApiGenresFrom(steamApiApp);
      game.description   = game.#extractSteamApiDescriptionFrom(steamApiApp);
      game.imageUrl      = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`
      game.playerHistory = [];
      
      return game;
    }

  //@todo https://github.com/lukatarman/steam-game-stats-backend/issues/115

  // prettier-ignore
  static fromSteamcharts(steamApp) {
      const game         = new Game();
      game.id            = steamApp.appid;
      game.name          = steamApp.name;
      game.releaseDate   = "";
      game.developers    = [];
      game.genres        = [];
      game.description   = "";
      game.imageUrl      = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`
      game.playerHistory = [];
      return game;
    }

  static manyFromDbEntry(entries) {
    return entries.map((entry) => this.fromDbEntry(entry));
  }

  // prettier-ignore
  static fromDbEntry(dbEntry) {
    const game         = new Game();
    game.id            = dbEntry.id;
    game.name          = dbEntry.name;
    game.releaseDate   = dbEntry.releaseDate;
    game.developers    = dbEntry.developers;
    game.genres        = dbEntry.genres;
    game.description   = dbEntry.description;
    game.imageUrl      = dbEntry.imageUrl;
    game.playerHistory = PlayerHistory.manyFromDbEntry(dbEntry.playerHistory);
    return game;
  }

  pushCurrentPlayers(players) {
    this.#currentMonthEntryIndex === -1
      ? this.playerHistory.push(PlayerHistory.newMonthlyEntry(players))
      : this.playerHistory[this.#currentMonthEntryIndex].pushTrackedPlayers(players);
  }

  get #currentMonthEntryIndex() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return this.playerHistory.findIndex(
      (history) => history.year === currentYear && history.month === currentMonth,
    );
  }

  pushSteamchartsPlayerHistory(playerHistories) {
    playerHistories.forEach((history) => {
      const historyCopy = cloneDeep(history);

      this.playerHistory.push(historyCopy);
    });

    this.#sortPlayerHistoryByDate();
  }

  #sortPlayerHistoryByDate() {
    this.playerHistory.sort((a, b) => {
      const dateA = new Date(a.year, a.month);
      const dateB = new Date(b.year, b.month);

      return dateA - dateB;
    });
  }

  #extractReleaseDateFrom(page) {
    const releaseDateElement = page.querySelector(".release_date .date");

    if (!releaseDateElement) return "";

    const releaseDate = new Date(`${releaseDateElement.textContent.trim()} UTC`);

    return releaseDate == "Invalid Date" ? "" : releaseDate;
  }

  #extractDevelopersFrom(page) {
    const developers = page.querySelector(".dev_row #developers_list");

    if (!developers) return [];

    return Array.from(developers.children).map((developer) =>
      developer.textContent.trim(),
    );
  }

  #extractGenresFrom(page) {
    const genres = page.querySelector("#genresAndManufacturer span");

    if (!genres) return [];

    return Array.from(genres.children)
      .map((genre) => genre.textContent.trim())
      .filter((genre) => !!genre);
  }

  #extractDescriptionFrom(page) {
    const description = page.querySelector(".game_description_snippet");

    if (!description) return "";

    return description.textContent.trim();
  }

  updateReleaseDate(page) {
    if (this.releaseDate) return;

    const date = this.#extractSteamDbReleaseDateFrom(page);

    if (date === "") return;

    this.releaseDate = date;
  }

  #extractSteamDbReleaseDateFrom(page) {
    const releaseDateElement = page.querySelector(
      "table.table.table-bordered.table-hover.table-responsive-flex tbody tr:last-child td:last-child",
    );

    if (!releaseDateElement) return "";

    const releaseDateString = releaseDateElement.textContent;

    const releaseDate = new Date(`
      ${releaseDateString.slice(0, releaseDateString.indexOf("–") - 1)} UTC`);

    if (releaseDate == "Invalid Date") return "";

    return releaseDate;
  }

  #extractSteamApiReleaseDateFrom(steamApiApp) {
    const releaseDate = new Date(`${steamApiApp.release_date.date} UTC`);

    return releaseDate == "Invalid Date" ? "" : releaseDate;
  }

  #extractSteamApiDevelopersFrom(steamApiApp) {
    return structuredClone(steamApiApp.developers);
  }

  #extractSteamApiGenresFrom(steamApiApp) {
    return steamApiApp.genres.map((genre) => genre.description);
  }

  #extractSteamApiDescriptionFrom(steamApiApp) {
    return steamApiApp.short_description;
  }

  updateReleaseDateViaSteamApi(steamApiApp) {
    if (this.releaseDate) return;

    const date = this.#extractSteamApiReleaseDateFrom(steamApiApp);

    if (date === "") return;

    this.releaseDate = date;
  }
}
