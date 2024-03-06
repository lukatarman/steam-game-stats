import {
  getSteamDbDevelopers,
  getSteamDbGenres,
  getSteamDbDescription,
  updateGamesMissingDetails,
} from "./game.service.js";
import { riskOfRainHtmlDetailsPageMissingInfo } from "../../../assets/steam-details-pages/risk.of.rain.missing.additional.info.page.js";
import { counterStrikeHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/counter.strike.html.details.page.js";
import { riskOfRainHtmlDetailsSteamDb } from "../../../assets/steamdb-details-pages/risk.of.rain.html.details.page.js";
import { getXsteamchartsInstantiatedGames } from "../models/game.mocks.js";
import {
  getParsedHtmlPage,
  getParsedHtmlPages,
} from "../../../assets/html.details.pages.mock.js";

describe("game.service.js", () => {
  describe(".updateGamesMissingDetails.", function () {
    describe("When we try to update two games with missing details,", function () {
      beforeAll(function () {
        this.games = getXsteamchartsInstantiatedGames(2);

        const htmlDetailsPages = [
          counterStrikeHtmlDetailsSteamDb,
          riskOfRainHtmlDetailsSteamDb,
        ];

        const parsedPages = getParsedHtmlPages(htmlDetailsPages);

        this.result = updateGamesMissingDetails(this.games, parsedPages);
      });

      it("two games are returned", function () {
        expect(this.games.length).toBe(2);
      });

      it("the first game's details are updated", function () {
        expect(this.result[0].developers).toEqual(["Valve", "Hidden Path Entertainment"]);
        expect(this.result[0].genres).toEqual(["Action", "Free to Play"]);
        expect(this.result[0].description).toBe(
          "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
        );
      });

      it("the second game's details are updated", function () {
        expect(this.result[1].developers).toEqual(["Hopoo Games"]);
        expect(this.result[1].genres).toEqual(["Action", "Indie"]);
        expect(this.result[1].description).toBe(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });
  });

  describe(".getSteamDbDevelopers.", function () {
    describe("When we provide a html page that contains two developers,", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(counterStrikeHtmlDetailsSteamDb);

        this.result = getSteamDbDevelopers(page);
      });

      it("two developers are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the developer is 'Valve'", function () {
        expect(this.result[0]).toBe("Valve");
      });

      it("the developer is 'Hidden Path Entertainment'", function () {
        expect(this.result[1]).toBe("Hidden Path Entertainment");
      });
    });

    describe("When we provide a html page that doesn't contain a developer section", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = getSteamDbDevelopers(page);
      });

      it("an empty array is returned", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbGenres.", function () {
    describe("When we provide a html page that contains the genres,", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.result = getSteamDbGenres(page);
      });

      it("two genres are returned", function () {
        expect(this.result.length).toBe(2);
      });

      it("the first genre is 'Action'", function () {
        expect(this.result[0]).toBe("Action");
      });

      it("the second genre is 'Indie'", function () {
        expect(this.result[1]).toBe("Indie");
      });
    });

    describe("When we provide a html page that doesn't contain a genres section,", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = getSteamDbGenres(page);
      });

      it("an empty array is returned", function () {
        expect(this.result).toEqual([]);
      });
    });
  });

  describe(".getSteamDbDescription.", function () {
    describe("When we provide a html page that contains the description,", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsSteamDb);

        this.result = getSteamDbDescription(page);
      });

      it("the returned value is the game's description'", function () {
        expect(this.result).toEqual(
          "Escape a chaotic alien planet by fighting through hordes of frenzied monsters – with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
        );
      });
    });

    describe("When we provide a html page that doesn't contain a description section,", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = getSteamDbDescription(page);
      });

      it("an empty string is returned", function () {
        expect(this.result).toEqual("");
      });
    });
  });
});
