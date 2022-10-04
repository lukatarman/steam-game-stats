import AppBehavior from "./app.behavior.js";
import SearchBar from "../SearchBar/search.bar.view.js";
import SearchResultsTable from "../SearchResultsTable/search.results.table.view.js";

const AppView = () => {
  const [topTenGames, tableOptions] = AppBehavior();

  return (
    <div>
      <SearchBar />
      <SearchResultsTable tableData={topTenGames} tableOptions={tableOptions} />
    </div>
  );
};

export default AppView;
