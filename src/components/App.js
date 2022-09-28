import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

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

        <Route path="game/:id" element={"TEST"} />
      </Routes>
    </div>
  );
};

export default App;
