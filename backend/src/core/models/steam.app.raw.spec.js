import { eldenRingSteamApiData } from "../../../assets/steam-api-responses/elden.ring.js";
import { partyAnimalsApiMissingData } from "../../../assets/steam-api-responses/party.animals.missing.data.js";
import { ReleaseDate } from "./release.date.js";
import { SteamAppRaw } from "./steam.app.raw.js";
import { eldenRingRawMockResult } from "./steam.app.raw.mock.js";

describe("SteamAppRaw", function () {
  describe("When the class is instantiated", function () {
    fdescribe("and all the data is provided", function () {
      beforeAll(function () {
        this.result = new SteamAppRaw(eldenRingSteamApiData);
      });

      it("the result has the correct values", function () {
        expect(this.result).toEqual(eldenRingRawMockResult());
      });
    });

    describe("and the developers, genres, description and releaseDate properties are missing", function () {
      beforeAll(function () {
        this.result = new SteamAppRaw(partyAnimalsApiMissingData);
        this.expectedReleaseDate = ReleaseDate.fromSteamAppRaw(null, true);
      });

      it("the result has the correct values", function () {
        expect(this.result.developers).toEqual([]);
        expect(this.result.genres).toEqual([]);
        expect(this.result.description).toEqual("");
        expect(this.result.releaseDate).toEqual(this.expectedReleaseDate);
      });
    });
  });
});
