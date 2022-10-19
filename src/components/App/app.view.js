import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AppBehavior from "./app.behavior.js";
import GameDetails from "../GameDetails/game.details.view.js";
import SearchBar from "../SearchBar/search.bar.view.js";
import TopGamesTable from "../TopGamesTable/top.games.table.view.js";
import "./app.css";
import "../../assets/global.css";

const App = () => {
  const [topTenGames, tableOptions] = AppBehavior();

  //TODO: change custom css files to premade bootstrap classes for padding and margin

  return (
    <div className="main-content">
      <SearchBar />
      <Switch>
        <Route exact path="/">
          <Container>
            <TopGamesTable tableData={topTenGames} tableOptions={tableOptions} />
          </Container>
        </Route>
        <Route path="/game/:id">
          <GameDetails />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
