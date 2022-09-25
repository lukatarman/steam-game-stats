import axios from "axios";
import { useEffect } from "react";
import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import "./app.css";

const App = () => {
  useEffect(() => {
    const response = axios.get("http://localhost:3000/getTopTenGames");
    console.log(response);
  });

  return (
    <div>
      <SgsNavbar />
      <SgsTable />
    </div>
  );
};

export default App;
