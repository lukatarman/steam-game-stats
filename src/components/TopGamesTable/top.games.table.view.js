import Table from "react-bootstrap/Table";
import TopGamesTableBehavior from "./top.games.table.behavior.js";
import Container from "react-bootstrap/Container";
import "./top.games.table.css";

function TopGamesTable({ tableData, tableOptions }) {
  const renderResults = TopGamesTableBehavior(tableData);

  return (
    <div>
      <Container fluid="lg">
        <div className="table-content">
          <h3>Top Ten Games</h3>
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
        </div>
      </Container>
    </div>
  );
}

export default TopGamesTable;
