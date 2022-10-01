import { useState, useEffect } from "react";
import { getTopTenGamesData } from "../../adapters/axios";

const AppBuisnessLogic = () => {
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

export default AppBuisnessLogic;
