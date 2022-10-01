import { useEffect, useState } from "react";

import SearchBar from "../SearchBar/index.js";
import SearchResultsTable from "../SearchResultsTable/index.js";

const tableOptions = {
  firstCol: "Game Name",
  secondCol: "Current Players",
};

const App = () => {
  const [topTenData, setTopTenData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await get("http://localhost:3000/games?sort=desc&limit=10");
      console.log(response);
      setTopTenData(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      <SearchBar />
      <SearchResultsTable tableData={topTenData} tableOptions={tableOptions} />
    </div>
  );
};

export default App;
