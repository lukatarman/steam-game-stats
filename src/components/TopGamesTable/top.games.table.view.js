import Table from "react-bootstrap/Table";
import TopGamesTableBehavior from "./top.games.table.behavior.js";
import Container from "react-bootstrap/Container";

function TopGamesTable({ tableData, tableOptions }) {
  const renderResults = TopGamesTableBehavior(tableData);

  return (
    <Container fluid="lg">
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
    </Container>
  );
}

export default TopGamesTable;
