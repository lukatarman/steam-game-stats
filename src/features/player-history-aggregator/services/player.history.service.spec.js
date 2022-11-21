import {
  addCurrentPlayersFromSteam,
  addPlayerHistoriesFromSteamcharts,
} from "./player.history.service.js";
import { XXXaddCurrentPlayersFromSteam } from "./player.history.service.js";
import { TrackedPlayers } from "../../../models/tracked.players.js";
import { Players } from "../../../models/players.js";
import { eldenRingHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/elden.ring.multiple.histories.html.details.page.js";
import { sniperEliteHttpDetailsSteamcharts } from "../../../../assets/steamcharts-details-pages/sniper.elite.just.released.html.details.page.js";

describe("player.history.service.js", function () {
  describe(".addCurrentPlayersFromSteam adds the current players and date to the tracked players array. So,", function () {
    fdescribe("if a game just had '15' players playing it most recently,", function () {
      beforeEach(function () {
        this.players = [15];

        this.games = [
          {
            playerHistory: [],
          },
        ];

        this.result = addCurrentPlayersFromSteam(this.players, this.games);
      });

      it("the resulting array's first entry will include a value 'playerHistory'. It will be an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].playerHistory[0]).toBeInstanceOf(TrackedPlayers);
      });
      it("the resulting array's first entry will include a value 'playerHistory'. The players property will equal '15'", function () {
        expect(this.result[0].playerHistory[0].players).toBe(15);
      });
    });
  });

  describe(".XXXaddCurrentPlayersFromSteam adds the current players to the games object and calculates the average players. So,", function () {
    describe("if the game's 'playerHistory' array is empty, the first array entry in this.result[0].playerHistory'", function () {
      beforeEach(function () {
        this.playersFromSteam = ["32"];

        this.games = [
          {
            id: 1,
            name: "Random Game",
            playerHistory: [],
          },
        ];

        this.result = XXXaddCurrentPlayersFromSteam(this.playersFromSteam, this.games);
      });

      it("will be an instance of Players", function () {
        expect(this.result[0].playerHistory[0]).toBeInstanceOf(Players);
      });
      it("will have a property called 'average players', which will equal '32'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(32.0);
      });
      it("will have a property called 'tracked players'. Its first array entry will be an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].playerHistory[0].trackedPlayers[0]).toBeInstanceOf(
          TrackedPlayers,
        );
      });
    });

    describe("if the game's 'playerHistory' array includes this month's entry", function () {
      beforeEach(function () {
        this.playersFromSteam = ["32"];

        this.games = [
          {
            id: 1,
            name: "Random Game",
            playerHistory: [
              {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                averagePlayers: 0,
                trackedPlayers: [new TrackedPlayers("23"), new TrackedPlayers("66")],
              },
            ],
          },
        ];

        this.result = XXXaddCurrentPlayersFromSteam(this.playersFromSteam, this.games);
      });

      it("will have a property called 'average players', which will equal '40.3'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(40.3);
      });
      it("will have a property called 'tracked players'. Its first array entry will be an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].playerHistory[0].trackedPlayers[0]).toBeInstanceOf(
          TrackedPlayers,
        );
      });
    });

    describe("if the game's 'playerHistory' array is not empty, and it does not include this month's entry", function () {
      beforeEach(function () {
        this.playersFromSteam = ["32"];
        this.date = new Date("2021");

        this.games = [
          {
            id: 1,
            name: "Random Game",
            playerHistory: [
              {
                year: this.date.getFullYear(),
                month: this.date.getMonth(),
                averagePlayers: 0,
                trackedPlayers: [new TrackedPlayers("23"), new TrackedPlayers("66")],
              },
            ],
          },
        ];

        this.result = XXXaddCurrentPlayersFromSteam(this.playersFromSteam, this.games);
      });

      it("will have a property called 'average players', which will equal '0'", function () {
        expect(this.result[0].playerHistory[0].averagePlayers).toBe(0);
      });
      it("will have a property called 'tracked players' its first array entry will be an instance of 'TrackedPlayers'", function () {
        expect(this.result[0].playerHistory[0].trackedPlayers[0]).toBeInstanceOf(
          TrackedPlayers,
        );
      });
      it("the playerHistory array will have an entry that will be an instance of Players", function () {
        expect(this.result[0].playerHistory[1]).toBeInstanceOf(Players);
      });
    });
  });

  describe(".addPlayerHistoriesFromSteamcharts", function () {
    describe("if the game has multiple histories", function () {
      beforeEach(function () {
        this.playerHistories = parsePlayerHistory(eldenRingHttpDetailsSteamcharts);
      });

      it("playerHistories is an instance of 'TrackedPlayers'", function () {
        expect(this.playerHistories[0]).toBeInstanceOf(TrackedPlayers);
      });

      it("playerHistories has two entries", function () {
        expect(this.playerHistories.length).toBe(2);
      });

      it("the first entries' player amount is 522066.4", function () {
        expect(this.playerHistories[0].players).toBe(522066.4);
      });

      it("the first entries' month is March", function () {
        expect(this.playerHistories[0].date.getMonth()).toBe(2);
      });

      it("the first entries' year is 2022", function () {
        expect(this.playerHistories[0].date.getFullYear()).toBe(2022);
      });
    });
  });
});
