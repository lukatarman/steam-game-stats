import { useEffect, useState } from "react";

import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";

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
      <SgsNavbar />
      <SgsTable tableData={topTenData} tableOptions={tableOptions} />
    </div>
  );
};

export default App;
