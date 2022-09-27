import axios from "axios";
import { useEffect } from "react";
import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import "./app.css";

const App = () => {
  return (
    <div>
      <SgsNavbar />
      <SgsTable />
    </div>
  );
};

export default App;
