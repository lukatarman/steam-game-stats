import Table from "react-bootstrap/Table";
import SearchResultsTableBehavior from "./search.results.table.behavior.js";

function SearchResultsTableView({ tableData, tableOptions }) {
  const renderResults = SearchResultsTableBehavior(tableData);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{tableOptions.firstCol}</th>
          <th>{tableOptions.secondCol}</th>
        </tr>
      </thead>
      <tbody>{renderResults}</tbody>
    </Table>
  );
}

export default SearchResultsTableView;
