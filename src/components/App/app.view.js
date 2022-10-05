import { Switch, Route, Link } from "react-router-dom";
import AppBehavior from "./app.behavior.js";
import GameDetails from "../GameDetails/game.details.view.js";
import SearchBar from "../SearchBar/search.bar.view.js";
import TopGamesTable from "../TopGamesTable/top.games.table.view.js";

const App = () => {
  const [topTenGames, tableOptions] = AppBehavior();

  return (
    <div>
      <SearchBar />
      <Switch>
        <Route exact path="/">
          <TopGamesTable tableData={topTenGames} tableOptions={tableOptions} />
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
