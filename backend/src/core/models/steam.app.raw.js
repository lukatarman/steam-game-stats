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
    this.developers = data.developers;
    this.genres = this.#extractGenres(data.genres);
    this.description = data.short_description;
    this.releaseDate = this.#extractReleaseDate(data.release_date);
  }

  #extractGenres(genres) {
    if (!genres) return [];

    return genres.map((genre) => genre.description);
  }

  #extractReleaseDate(releaseDate) {
    if (!releaseDate) return "";

    return releaseDate.date;
  }
}
