import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import GameDetailsBehavior from "./game.details.behavior.js";

const GameDetails = () => {
  const [gameData, tableContent] = GameDetailsBehavior();

  return (
    <div>
      <Container>
        <div className="col align-items-center justify-content-center pb-2">
          <p className="pb-2 h2">{gameData.name}</p>
          <img src={gameData.imageUrl} alt="Not found" />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Month</th>
              <th>Average Players</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GameDetails;
