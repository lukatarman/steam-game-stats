import { Game } from "./game.js"

describe("game.js", function() {
  describe("Game", function() {
    describe(".fromSteamApp", function() {
      describe("is called with incomplete arguments or no arguments, ", function() {

        it(("an Error is thrown"), function() {
          expect(Game.fromSteamApp).toThrowError();
        });
        });

      describe("is called with appropriate attributes", function() {
        beforeEach(function() {
          this.testObject = {
            id: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          }

          this.myLittleTest = Game.fromSteamApp(this.testObject);
        });

        it("the returned value is an instance of Game", function() {
          expect(this.myLittleTest).toBeInstanceOf(Game);
        })
      });
    });

    describe(".fromDbEntry", function() {
      describe("is called with incomplete arguments or no arguments, ", function() {
        it(("an Error is thrown"), function() {
          expect(Game.fromDbEntry).toThrowError();
        });
        });

      describe("is called with appropriate attributes", function() {
        beforeEach(function() {
          this.testObject = {
            id: 123,
            name: "test game",
            imageUrl: "test url",
            playerHistory: [],
          }

          this.myLittleTest = Game.fromDbEntry(this.testObject);
        });

        it("the returned value is an instance of Game", function() {
          expect(this.myLittleTest).toBeInstanceOf(Game);
        })
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