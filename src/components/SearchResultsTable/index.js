import Table from "react-bootstrap/Table";
import businessLogic from "./business-logic.js";

function SearchResultsTable({ tableData, tableOptions }) {
  const renderResults = businessLogic(tableData);

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

export default SearchResultsTable;
