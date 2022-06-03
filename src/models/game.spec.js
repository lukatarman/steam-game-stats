import { Game } from "./game.js"

describe("game.js", function() {
  describe("Game", function() {
    describe(".fromSteamApp", function() {
      describe("is called with no arguments, ", function() {

        it(("an Error is thrown"), function() {
          expect(Game.fromSteamApp).toThrowError();
        });
      });

      describe("is called with incomplete arguments, ", function() {
        beforeEach(function() {
          this.testObject = {
            id: 123,
            name: "test game",
          }
        });

        it(("an Error is thrown"), function() {
          expect(Game.fromSteamApp.bind(this.testObject)).toThrowError();
        });
      });

      describe("is called with appropriate attributes and the returned value", function() {
        beforeEach(function() {
          this.testObject = {
            appid: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          }

          this.result = Game.fromSteamApp(this.testObject);
        });

        it("is an instance of Game", function() {
          expect(this.result).toBeInstanceOf(Game);
        });

        it("has an 'id' property which equals 123", function() {
          expect(this.result.id).toBe(this.testObject.appid);
        });

        it("has a 'name' property which equals 'test game'", function() {
          expect(this.result.name).toBe(this.testObject.name);
        });

        it("has an 'imageUrl' property which equals a link", function() {
          expect(this.result.imageUrl).toBe(`https://cdn.akamai.steamstatic.com/steam/apps/${this.testObject.appid}/header.jpg`);
        });

        it("has a 'playerHistory' property which equals an empty array", function() {
          expect(this.result.playerHistory).toEqual(this.testObject.playerHistory);
        });
      });
    });

    describe(".fromDbEntry", function() {
      describe("is called with no arguments, ", function() {

        it(("an Error is thrown"), function() {
          expect(Game.fromDbEntry).toThrowError();
        });
      });

      describe("is called with incomplete arguments, ", function() {
        beforeEach(function() {
          this.testObject = {
            id: 123,
            name: "test game",
          }
        });

        it(("an Error is thrown"), function() {
          expect(Game.fromDbEntry.bind(this.testObject)).toThrowError();
        });
      });

      describe("is called with appropriate attributes and the returned value", function() {
        beforeEach(function() {
          this.testObject = {
            id: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          }

          this.result = Game.fromDbEntry(this.testObject);
        });

        it("is an instance of Game", function() {
          expect(this.result).toBeInstanceOf(Game);
        });

        it("has an 'id' property which equals 123", function() {
          expect(this.result.id).toBe(this.testObject.id);
        });

        it("has a 'name' property which equals 'test game'", function() {
          expect(this.result.name).toBe(this.testObject.name);
        });

        it("has an 'imageUrl' property which equals 'test url'", function() {
          expect(this.result.imageUrl).toBe(this.testObject.imageUrl);
        });

        it("has a 'playerHistory' property which equals an empty array", function() {
          expect(this.result.playerHistory).toEqual(this.testObject.playerHistory);
        });
      });
    });

    describe("class is instantiated,", function() {
      describe("with object whose playerHistory property has an empty array", function() {
        beforeEach(function () {
          this.testObject = {
            id: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          }

          this.testClass = Game.fromDbEntry(this.testObject);

          this.result = this.testClass.lastUpdate;
        });

        it("it returns 'undefined'", function() {
          expect(this.result).toBeUndefined();
        });
      });

      describe("with object whose playerHistory property has entries", function() {
        beforeEach(function () {
          this.testObject = {
            id: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [{ date: "21 September 1989" }],
          }

          this.testClass = Game.fromDbEntry(this.testObject);
        });

        it("it returns 'undefined'", function() {
          expect(this.testClass.lastUpdate).toBe("21 September 1989");
        });
      });
    });
  });
});