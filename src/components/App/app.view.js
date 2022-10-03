import AppBehavior from "./app.behavoir.js";
import SearchBar from "../SearchBar";
import SearchResultsTable from "../SearchResultsTable/search.results.table.view";

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
