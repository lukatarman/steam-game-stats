import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import GameDetailsBehavior from "./game.details.behavior.js";

const GameDetails = () => {
  const [gameData, tableContent] = GameDetailsBehavior();

  return (
    <div>
      <Container fluid="lg">
        <div>
          <img src={gameData.imageUrl} alt="Not found" />
          <div>{gameData.name}</div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Month</th>
              <th>Players</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GameDetails;
