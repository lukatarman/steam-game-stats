import { Switch, Route, Link } from "react-router-dom";
import AppBehavior from "./app.behavior.js";
import GameDetailsView from "../GameDetails/game.details.view.js";
import SearchBarView from "../SearchBar/search.bar.view.js";
import SearchResultsTableView from "../SearchResultsTable/search.results.table.view.js";

const AppView = () => {
  const [topTenGames, tableOptions] = AppBehavior();

  return (
    <div>
      <SearchBarView />
      <Switch>
        <Route exact path="/">
          <SearchResultsTableView tableData={topTenGames} tableOptions={tableOptions} />
        </Route>
        <Route path="/game/:id">
          <GameDetailsView />
        </Route>
      </Switch>
      <Link to="/game/4">CLICK to go to game detail screen</Link>
    </div>
  );
};

export default AppView;
