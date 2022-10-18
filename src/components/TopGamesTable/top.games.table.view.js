import Table from "react-bootstrap/Table";
import TopGamesTableBehavior from "./top.games.table.behavior.js";
import Container from "react-bootstrap/Container";

function TopGamesTable({ tableData, tableOptions }) {
  const renderResults = TopGamesTableBehavior(tableData);

  return (
    <div style={{ marginBottom: "2000px" }}>
      <Container fluid="lg">
        <div style={{ backgroundColor: "#fafafa", padding: "15px 15px" }}>
          <h3 style={{ marginBottom: "15px" }}>Top Ten Games</h3>
          <Table striped bordered hover style={{ padding: "0px 0px" }}>
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
