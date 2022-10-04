import AppBehavior from "./app.behavior.js";
import SearchBarView from "../SearchBar/search.bar.view.js";
import SearchResultsTableView from "../SearchResultsTable/search.results.table.view.js";

const AppView = () => {
  const [topTenGames, tableOptions] = AppBehavior();

  return (
    <div>
      <SearchBarView />
      <SearchResultsTableView tableData={topTenGames} tableOptions={tableOptions} />
    </div>
  );
};

export default AppView;
