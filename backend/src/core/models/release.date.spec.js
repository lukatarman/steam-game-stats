import { getParsedHtmlPage } from "../../../assets/html.details.pages.mock.js";
import { monsterHunterSteamApiData } from "../../../assets/steam-api-responses/monster.hunter.coming.soon.js";
import { eldenRingGameHtmlDetailsPage } from "../../../assets/steam-web-html-details-pages/elden.ring.game.html.details.page.js";
import { riskOfRainHtmlDetailsPageMissingInfo } from "../../../assets/steam-web-html-details-pages/risk.of.rain.missing.additional.info.page.js";
import { theLastNightUnreleasedHtmlDetailsPage } from "../../../assets/steam-web-html-details-pages/the.last.night.unreleased.html.details.page.js";
import { ReleaseDate } from "./release.date.js";
import { getRawSteamApiApp } from "./steam.app.raw.mock.js";

describe("ReleaseDate", function () {
  describe(".copy", function () {
    beforeAll(function () {
      const page = getParsedHtmlPage(eldenRingGameHtmlDetailsPage);
      this.releaseDate = ReleaseDate.fromSteamWeb(page);
      this.result = this.releaseDate.copy();

      this.releaseDate.comingSoon = null;
    });

    it("the result is a copy of ReleaseDate", function () {
      expect(this.result).toBeInstanceOf(ReleaseDate);
    });

    it("the copy has identical values to the original", function () {
      expect(this.result.date).toEqual(new Date("24 Feb, 2022 UTC"));
      expect(this.result.comingSoon).toBeFalsy();
    });
  });

  describe(".fromSteamWeb", function () {
    describe("When the method is used ", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(eldenRingGameHtmlDetailsPage);
        this.result = ReleaseDate.fromSteamWeb(page);
      });

      it("the result is an instance of release date", function () {
        expect(this.result).toBeInstanceOf(ReleaseDate);
      });

      it("the resulting date has the correct value", function () {
        expect(this.result.date).toBeInstanceOf(Date);
        expect(this.result.date).toEqual(new Date("24 February 2022 UTC"));
      });

      it("the release date is correctly marked as already released", function () {
        expect(this.result.comingSoon).toBeFalsy();
      });
    });

    describe("if the provided HTML page does not include a release date section,", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(riskOfRainHtmlDetailsPageMissingInfo);

        this.result = ReleaseDate.fromSteamWeb(page);
      });

      it("the game's release date will be null", function () {
        expect(this.result.date).toBe(null);
      });

      it("the release date is correctly marked as not yet released", function () {
        expect(this.result.comingSoon).toBeTruthy();
      });
    });

    describe("if the provided HTML page contains an invalid date,", function () {
      beforeAll(function () {
        const page = getParsedHtmlPage(theLastNightUnreleasedHtmlDetailsPage);

        this.result = ReleaseDate.fromSteamWeb(page);
      });

      it("the game's release date will be null", function () {
        expect(this.result.date).toBe(null);
      });

      it("the release date is correctly marked as not yet released", function () {
        expect(this.result.comingSoon).toBeTruthy();
      });
    });
  });

  describe(".fromSteamAppRaw", function () {
    describe("When the method is used ", function () {
      beforeAll(function () {
        const dateAsString = "24 Feb, 2022";
        this.result = ReleaseDate.fromSteamAppRaw(dateAsString, false);
      });

      it("the result is an instance of release date", function () {
        expect(this.result).toBeInstanceOf(ReleaseDate);
      });

      it("the resulting date has the correct value", function () {
        expect(this.result.date).toBeInstanceOf(Date);
        expect(this.result.date).toEqual(new Date("24 February 2022 UTC"));
      });

      it("the release date is correctly marked as already released", function () {
        expect(this.result.comingSoon).toBeFalsy();
      });
    });

    describe("when a date is not provided", function () {
      beforeAll(function () {
        this.result = ReleaseDate.fromSteamAppRaw(null, true);
      });

      it("the result is an instance of release date", function () {
        expect(this.result).toBeInstanceOf(ReleaseDate);
      });

      it("the resulting date is null", function () {
        expect(this.result.date).toBe(null);
      });

      it("the release date is correctly marked as unreleased", function () {
        expect(this.result.comingSoon).toBeTruthy();
      });
    });

    describe("when an invalid date is provided and coming soon is undefiend", function () {
      beforeAll(function () {
        this.result = ReleaseDate.fromSteamAppRaw("not a date", undefined);
      });

      it("the result is an instance of release date", function () {
        expect(this.result).toBeInstanceOf(ReleaseDate);
      });

      it("the resulting date is null", function () {
        expect(this.result.date).toBe(null);
      });

      it("the release date is correctly marked as unreleased", function () {
        expect(this.result.comingSoon).toBeTruthy();
      });
    });
  });

  describe(".fromDb", function () {
    describe("When the method is used", function () {
      beforeAll(function () {
        this.releaseDate = { date: new Date("24 September 2000"), comingSoon: false };
        this.result = ReleaseDate.fromDb(this.releaseDate);
      });

      it("the result is an instance of release date", function () {
        expect(this.result).toBeInstanceOf(ReleaseDate);
      });

      it("the resulting date has the correct value", function () {
        expect(this.releaseDate.date).toBeInstanceOf(Date);
        expect(this.releaseDate.date).toEqual(this.releaseDate.date);
      });

      it("the release date is correctly marked as already released", function () {
        expect(this.releaseDate.comingSoon).toBeFalsy();
      });
    });
  });

  describe(".updateReleaseDate", function () {
    describe("When the existing date is null", function () {
      beforeAll(function () {
        this.result = ReleaseDate.fromSteamAppRaw(null, true);
        this.result.updateReleaseDate(new Date("2025"));
      });

      it("the resulting date has the correct value", function () {
        expect(this.result.date).toEqual(new Date("2025"));
      });

      it("the resulting release date release status stays unchanged", function () {
        expect(this.result.comingSoon).toBe(true);
      });
    });

    describe("When the passed in date is older than the existing date", function () {
      beforeAll(function () {
        this.result = ReleaseDate.fromSteamAppRaw("2025", true);
        this.result.updateReleaseDate(new Date("2024"));
      });

      it("the resulting date has the correct value", function () {
        expect(this.result.date).toEqual(new Date("2025"));
      });

      it("the resulting release date release status stays unchanged", function () {
        expect(this.result.comingSoon).toBe(true);
      });
    });

    describe("When the passed in date is more recent than the existing date", function () {
      describe("and the passed in date is a future date", function () {
        beforeAll(function () {
          jasmine.clock().install();
          jasmine.clock().mockDate(new Date("2023"));

          this.result = ReleaseDate.fromSteamAppRaw("2021", true);
          this.result.updateReleaseDate(new Date("2024"));
        });

        afterAll(function () {
          jasmine.clock().uninstall();
        });

        it("the resulting date has the correct value", function () {
          expect(this.result.date).toEqual(new Date("2024"));
        });

        it("the resulting release date release status stays unchanged", function () {
          expect(this.result.comingSoon).toBe(true);
        });
      });

      describe("and the passed in date is a past date", function () {
        beforeAll(function () {
          jasmine.clock().install();
          jasmine.clock().mockDate(new Date("2027"));

          this.result = ReleaseDate.fromSteamAppRaw("2021", true);
          this.result.updateReleaseDate(new Date("2024"));
        });

        afterAll(function () {
          jasmine.clock().uninstall();
        });

        it("the resulting date has the correct value", function () {
          expect(this.result.date).toEqual(new Date("2024"));
        });

        it("the resulting release date release status is correctly marked", function () {
          expect(this.result.comingSoon).toBe(false);
        });
      });
    });
  });
});
