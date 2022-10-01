import businessLogic from "./bl.js";

import SearchBar from "../SearchBar";
import SearchResultsTable from "../SearchResultsTable";

const App = () => {
  const [topTenGames, tableOptions] = businessLogic();

  return (
    <div>
      <SearchBar />
      <SearchResultsTable tableData={topTenGames} tableOptions={tableOptions} />
    </div>
  );
};

export default App;
