import Table from "react-bootstrap/Table";
import TopGamesTableBehavior from "./top.games.table.behavior.js";

function TopGamesTable({ tableData, tableOptions }) {
  const renderResults = TopGamesTableBehavior(tableData);

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

export default TopGamesTable;
