import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import axios from "axios";

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
      <SgsTable tableData={fetchData} tableOptions={tableOptions} />
    </div>
  );
};

export default App;
