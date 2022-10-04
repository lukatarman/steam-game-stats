import { useState, useEffect } from "react";
import { getTopTenGamesData } from "../../adapters/http-client/http.client.adapter.js";

const AppBehavior = () => {
  const [topTenGames, setTopTenGames] = useState([]);

  const tableOptions = {
    firstCol: "Game Name",
    secondCol: "Current Players",
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopTenGamesData();
      setTopTenGames(data);
    };

    fetchData();
  }, []);

  return [topTenGames, tableOptions];
};

export default AppBehavior;
