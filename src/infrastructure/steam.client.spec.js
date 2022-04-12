import axios from "axios";
import { SteamClient } from "./steam.client.js";

xdescribe('steam.client.js', () => {
  const steamClient = new SteamClient(axios);

  it('fetch html page of metro',  async () => {
    const page = await steamClient.getAppDetailsPage(412020);

    console.log(page);

    expect(page).toBeDefined();
  });
});