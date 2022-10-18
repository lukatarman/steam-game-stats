import { Switch, Route } from "react-router-dom";
import AppBehavior from "./app.behavior.js";
import GameDetails from "../GameDetails/game.details.view.js";
import SearchBar from "../SearchBar/search.bar.view.js";
import TopGamesTable from "../TopGamesTable/top.games.table.view.js";
import "../../assets/global.css";

const App = () => {
  const [topTenGames, tableOptions] = AppBehavior();

  return (
    <div style={{ paddingTop: "54px" }}>
      <SearchBar />
      <Switch>
        <Route exact path="/">
          <TopGamesTable tableData={topTenGames} tableOptions={tableOptions} />
        </Route>
        <Route path="/game/:id">
          <GameDetails />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
