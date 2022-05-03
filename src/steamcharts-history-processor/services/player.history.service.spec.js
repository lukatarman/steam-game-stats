import * as fs from 'fs';
import { parsePlayerHistory } from "./player.history.service.js";

fdescribe("player.history.service.js", () => {
    describe(".parsePlayerHistory", () => {
        describe("if the first entry is 'Last 30 Days', and the game is Elden Ring", () => {
            let playerHistories;
            let response;

            beforeAll(async () => {
                try{
                    response = fs.readFileSync("assets/elden-ring-steamcharts.txt", "utf8");
                } catch (err) {
                    console.error(err);
                }

                playerHistories = parsePlayerHistory({data: response});
            })

            it("playerHistories has two entries", () => {
                expect(playerHistories.length).toBe(2);
            })
        })

        describe("the first entries' player amount", () => {
            let playerHistories;
            let response;

            beforeAll(async () => {
                try{
                    response = fs.readFileSync("assets/elden-ring-steamcharts.txt", "utf8");
                } catch (err) {
                    console.error(err);
                }

                playerHistories = parsePlayerHistory({data: response});
            })

            it("is 211468", () => {
                expect(playerHistories[0].players).toBe(211468);
            })
        })

        describe("the second entries' month", () => {
            let playerHistories;
            let response;

            beforeAll(async () => {
                try{
                    response = fs.readFileSync("assets/elden-ring-steamcharts.txt", "utf8");
                } catch (err) {
                    console.error(err);
                }

                playerHistories = parsePlayerHistory({data: response});
            })

            it("to be March", () => {
                expect(playerHistories[1].date.getMonth()).toBe(2);
            })
        })

        describe("the second entries' year", () => {
            let playerHistories;
            let response;

            beforeAll(async () => {
                try{
                    response = fs.readFileSync("assets/elden-ring-steamcharts.txt", "utf8");
                } catch (err) {
                    console.error(err);
                }

                playerHistories = parsePlayerHistory({data: response});
            })

            it("to be March", () => {
                expect(playerHistories[1].date.getFullYear()).toBe(2022);
            })
        })
    })
})