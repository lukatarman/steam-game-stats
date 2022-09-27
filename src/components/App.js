import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import axios from "axios";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/getTopTenGames");
  return response;
};

const App = () => {
  return (
    <div>
      <SgsNavbar />
      <SgsTable tableData={fetchData} />
    </div>
  );
};

export default App;
