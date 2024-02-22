import { parseHTML } from "linkedom";
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
    game.releaseDate   = game.getReleaseDate(page);
    game.developers    = game.getDevelopers(page);
    game.genres        = game.getGenres(page);
    game.description   = game.getDescription(page);
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

  updateGameDetails(newDevelopers, newGenres, newDescription) {
    if (newDevelopers.length !== 0 && this.developers.length === 0)
      this.developers = Array.from(newDevelopers);

    if (newGenres.length !== 0 && this.genres.length === 0)
      this.genres = Array.from(newGenres);

    if (newDescription !== "" && this.description === "")
      this.description = newDescription;
  }

  updateReleaseDate(newReleaseDate) {
    if (newReleaseDate !== "" && this.releaseDate === "")
      this.releaseDate = newReleaseDate;
  }

  getReleaseDate(page) {
    const { document } = parseHTML(page);

    const releaseDateElement = document.querySelector(".release_date .date");

    if (!releaseDateElement) return "";

    const releaseDate = new Date(`${releaseDateElement.textContent.trim()} UTC`);

    return releaseDate == "Invalid Date" ? "" : releaseDate;
  }

  getDevelopers(page) {
    const { document } = parseHTML(page);

    const developers = document.querySelector(".dev_row #developers_list");

    if (!developers) return [];

    return Array.from(developers.children).map((developer) =>
      developer.textContent.trim(),
    );
  }

  getGenres(page) {
    const { document } = parseHTML(page);

    const genres = document.querySelector("#genresAndManufacturer span");

    if (!genres) return [];

    return Array.from(genres.children)
      .map((genre) => genre.textContent.trim())
      .filter((genre) => !!genre);
  }

  getDescription(page) {
    const { document } = parseHTML(page);

    const description = document.querySelector(".game_description_snippet");

    if (!description) return "";

    return description.textContent.trim();
  }
}
