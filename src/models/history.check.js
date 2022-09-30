import { SteamApp } from "./steam.app.js";
// I'm not sure if I'm supposed to import something into one of the models folder files. I remember you mentioning
// these files are at the lowest level on dependancy or something, so they shouldn't have imports. But in that case
// I'm not sure how to deal with check.source in .fromSteamcharts. Make comment when you review please
export class HistoryCheck {
  gameId;
  checked;
  found;
  source;

  // prettier-ignore
  static fromSteamcharts(game, found) {
    const check   = new HistoryCheck();
    check.gameId  = game.id
    check.checked = true;
    check.found   = found;
    check.source  = SteamApp.validDataSources.steamCharts;
    return check;
  }

  static manyFromGames(games) {
    return games.map((game) => HistoryCheck.fromGame(game));
  }

  // prettier-ignore
  static fromGame(game) {
    const check   = new HistoryCheck();
    check.gameId  = game.id
    check.checked = false;
    check.found   = false;
    return check;
  }

  static manyFromSteamchartsPages(gamesPagesMap) {
    const checks = [];
    for (const [game, page] of gamesPagesMap) {
      checks.push(HistoryCheck.fromSteamcharts(game, !!page));
    }
    return checks;
  }
}
