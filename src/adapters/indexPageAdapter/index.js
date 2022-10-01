import axios from "axios";

export async function getTopTenGamesData(url) {
  return axios.get("http://localhost:3000/games?sort=desc&limit=10");
}
