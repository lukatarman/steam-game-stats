import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import GameDetailsBehavior from "./game.details.behavior.js";

const GameDetails = () => {
  const [gameData, tableContent] = GameDetailsBehavior();

  return (
    <div>
      <Container>
        <div className="col d-flex pb-2 mt-4 mb-2">
          <div className="align-items-center justify-content-center ">
            <img src={gameData.imageUrl} alt="Not found" />
          </div>
          <div className="m-2">
            <p className="pb-2 h2">{gameData.name}</p>
            <p>
              <span className="fw-bold">Release Date</span>: {gameData.releaseDate}
            </p>
            <p>
              <span className="fw-bold">Developer</span>: {gameData.developers}
            </p>
          </div>
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
