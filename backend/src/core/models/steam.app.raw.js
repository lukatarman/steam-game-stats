import { ReleaseDate } from "./release.date.js";

export class SteamAppRaw {
  id;
  name;
  type;
  developers;
  genres;
  description;
  releaseDate;

  constructor(data) {
    this.id = data.steam_appid;
    this.name = data.name;
    this.type = data.type;
    this.developers = this.#extractDevelopers(data.developers);
    this.genres = this.#extractGenres(data.genres);
    this.description = this.#extractDescription(data.short_description);
    this.releaseDate = this.#extractReleaseDate(data.release_date);
  }

  #extractDevelopers(developers) {
    if (!developers) return [];

    return developers.slice();
  }

  #extractGenres(genres) {
    if (!genres) return [];

    return genres.map((genre) => genre.description);
  }

  #extractDescription(description) {
    if (!description) return "";

    return description;
  }

  #extractReleaseDate(releaseDate) {
    if (!releaseDate) return ReleaseDate.fromSteamAppRaw(null, true);

    return ReleaseDate.fromSteamAppRaw(releaseDate.date, releaseDate.coming_soon);
  }
}
