import axios from "axios";
import { useEffect } from "react";
import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import "./app.css";

//todo
// https://www.fastify.io/docs/latest/Guides/Getting-Started/
// https://www.fastify.io/docs/latest/Reference/Routes/

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
