import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import SgsNavbar from "./SgsNavbar.js";
import SgsTable from "./SgsTable.js";
import GameDetails from "./GameDetails.js";

const tableOptions = {
  firstCol: "Game Name",
  secondCol: "Current Players",
};

const App = () => {
  const [topTenData, setTopTenData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/games?sort=desc&limit=10");
      setTopTenData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <SgsNavbar />
      <Switch>
        <Route exact path="/">
          <SgsTable tableData={topTenData} tableOptions={tableOptions} />
        </Route>
        <Route path="/game/:id">
          <GameDetails />
        </Route>
      </Switch>
      <Link to="/game/4">CLICK to go to game detail screen</Link>
    </div>
  );
};

export default App;
