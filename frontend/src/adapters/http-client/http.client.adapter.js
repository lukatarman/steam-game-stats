import axios from "axios";

export async function getTopTenGamesData() {
  const response = await axios.get("http://localhost:3000/games?sort=desc&limit=10");
  return response.data;
}

export async function getSearchResults(searchTerm) {
  const response = await axios.get(`http://localhost:3000/games?q=${searchTerm}`);
  return response.data;
}

export async function getGameById(id) {
  const response = await axios.get(`http://localhost:3000/games/${id}`);
  return response.data;
}
