import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";

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
      <Switch>
        <Route exact path="/">
          <SgsTable tableData={fetchData} tableOptions={tableOptions} />
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
