import axios from "axios";
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
      const response = await axios.get("http://localhost:3000/getTopTenGames");
      setTopTenData(response.data);
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
