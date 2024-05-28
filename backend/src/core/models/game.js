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
    game.releaseDate   = game.#extractReleaseDateViaSteamWeb(page);
    game.developers    = game.#extractDevelopersViaSteamWeb(page);
    game.genres        = game.#extractGenresViaSteamWeb(page);
    game.description   = game.#extractDescriptionViaSteamWeb(page);
    game.imageUrl      = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`
    game.playerHistory = [];
    
    return game;
  }

  #extractReleaseDateViaSteamWeb(page) {
    const releaseDateElement = page.querySelector(".release_date .date");

    if (!releaseDateElement) return null;

    const releaseDate = new Date(`${releaseDateElement.textContent.trim()} UTC`);

    return releaseDate == "Invalid Date" ? null : releaseDate;
  }

  #extractDevelopersViaSteamWeb(page) {
    const developers = page.querySelector(".dev_row #developers_list");

    if (!developers) return [];

    return Array.from(developers.children).map((developer) =>
      developer.textContent.trim(),
    );
  }

  #extractGenresViaSteamWeb(page) {
    const genres = page.querySelector("#genresAndManufacturer span");

    if (!genres) return [];

    return Array.from(genres.children)
      .map((genre) => genre.textContent.trim())
      .filter((genre) => !!genre);
  }

  #extractDescriptionViaSteamWeb(page) {
    const description = page.querySelector(".game_description_snippet");

    if (!description) return "";

    return description.textContent.trim();
  }

  // prettier-ignore
  static fromSteamApi(steamApiApp) {
      const game         = new Game();
      game.id            = steamApiApp.id;
      game.name          = steamApiApp.name;
      game.releaseDate   = game.#extractReleaseDateViaSteamApi(steamApiApp);
      game.developers    = game.#extractDevelopersViaSteamApi(steamApiApp);
      game.genres        = game.#extractGenresViaSteamApi(steamApiApp);
      game.description   = game.#extractDescriptionViaSteamApi(steamApiApp);
      game.imageUrl      = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`
      game.playerHistory = [];
      
      return game;
    }

  #extractReleaseDateViaSteamApi(steamApiApp) {
    if (!steamApiApp.releaseDate) return null;

    const releaseDate = new Date(`${steamApiApp.releaseDate} UTC`);

    return releaseDate == "Invalid Date" ? null : releaseDate;
  }

  #extractDevelopersViaSteamApi(steamApiApp) {
    if (!steamApiApp.developers) return [];

    return structuredClone(steamApiApp.developers);
  }

  #extractGenresViaSteamApi(steamApiApp) {
    if (!steamApiApp.genres) return [];

    return steamApiApp.genres;
  }

  #extractDescriptionViaSteamApi(steamApiApp) {
    if (!steamApiApp.description) return "";

    return steamApiApp.description;
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

  updateReleaseDateViaSteamApi(steamApiApp) {
    if (this.releaseDate) return;

    const date = this.#extractReleaseDateViaSteamApi(steamApiApp);

    if (date === null) return;

    this.releaseDate = date;
  }
}
