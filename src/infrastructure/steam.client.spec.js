import axios from "axios";
import { JSDOM } from "jsdom";
import { SteamClient } from "./steam.client.js";

fdescribe("steam.client.js", () => {
  const steamClient = new SteamClient(axios);

  it("fetch html page of metro", async () => {
    // const page = await steamClient.getAppDetailsPage(12220);

    // console.log("Showing Metro page:");
    // console.log(page.data);

    // const appDetilsAsString = new JSDOM(page.data);
    // const testText = appDetilsAsString.window.document.querySelector(".blockbg").children[0].textContent;

    // const steamChartsAppDetailsAsString = await steamClient
    //   .getAppDetailsSteamCharts({ id: 829050 })
    //   .catch(function (error) {
    //     console.log("ERROR DETECTED");
    //   });
    // const steamChartsAppDetailsAsDom = new JSDOM(steamChartsAppDetailsAsString).data;
    // const myH1 = steamChartsAppDetailsAsDom.querySelector(".content-wrapper .header h1");
    // const myText = myH1.textContent;

    // console.log("this is the result:");
    // console.log(steamChartsAppDetailsAsDom);
    // console.log(myText);
    // console.log(myText);

    const myTest = [
      {test1: "hello"},
      {test1: "yo"},
      {test1: "hey there"},
      {test1: "sup"},
    ];
    const secondTest = {
      myArray: [10, 11, 12, 13, 14],
    }
    const indexOfTest = myTest.indexOf(test => test.test1 === "yo");

    console.log("Result:");
    console.log(indexOfTest);

    // expect(steamChartsAppDetailsAsDom).toBeDefined();
  });
});
