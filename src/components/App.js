import axios from "axios";
import { Routes, Route } from "react-router-dom";

import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import GameDetails from "./GameDetails.js";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/getTopTenGames");
  return response;
};

const tableOptions = {
  firstCol: "Game Name",
  secondCol: "Current Players",
};

const App = () => {
  return (
    <div>
      <SgsNavbar />
      <Routes>
        <Route
          path="/"
          element={<SgsTable tableData={fetchData} tableOptions={tableOptions} />}
        />

        <Route path="game/:id" element={<GameDetails />} />
      </Routes>
    </div>
  );
};

export default App;
