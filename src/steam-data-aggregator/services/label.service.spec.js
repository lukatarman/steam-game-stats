import { labelAsNotIdentified } from "./label.service.js";
import { gamesMock } from "../../../assets/small.data.set.js"

fdescribe("label.service.js", () => {
  describe(".labelAsNotIdentified", () => {
    describe("if an array of objects is passed into the function", () => {
      let result;

      beforeAll(() => {
        const steamApps = gamesMock;
        result = labelAsNotIdentified(steamApps);
      })

      it("object in the first index has its 'identified' property set to false", () => {
        expect(result[0].identified).toBeFalse();
      })
      it("object in the 15th index has its 'identified' property set to false", () => {
        expect(result[15].identified).toBeFalse();
      })
      it("object in the last index has its 'identified' property set to false", () => {
        expect(result.pop().identified).toBeFalse();
      })
    })
  })
})