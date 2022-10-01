import { useState, useEffect } from "react";
import { getTopTenGamesData } from "../../../adapters/index-adapter/";

const AppBl = () => {
  const [topTenGames, setTopTenGames] = useState([]);

  const tableOptions = {
    firstCol: "Game Name",
    secondCol: "Current Players",
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopTenGamesData();
      console.log(data);
      setTopTenGames(data);
    };

    fetchData();
  }, []);

  return [topTenGames, tableOptions];
};

export default AppBl;
