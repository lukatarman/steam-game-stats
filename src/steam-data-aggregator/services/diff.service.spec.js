import { gamesMock } from "../../../assets/small.data.set.js"
import { smallestGamesMock } from "../../../assets/smallest.data.set.js"
import { diff } from "./diff.service.js"

describe("diff.service.js", () => {
    describe(".diff", () => {
        describe("passing in two arrays of objects, the function", () => {
            let object;

            beforeAll(() => {
                object = diff(gamesMock, smallestGamesMock);
            })

            it("returns an array with the differences between the arrays", () => {
                expect(object.length).toBe(205);
            })
        })
    })
})