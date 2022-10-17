import { Table } from "react-bootstrap";
import GameDetailsBehavior from "./game.details.behavior.js";

const GameDetails = () => {
  const [gameData, tableContent] = GameDetailsBehavior();

  return (
    <div>
      <div>
        <img src={gameData.imageUrl} alt="Not found" />
        <div>{gameData.name}</div>
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
    </div>
  );
};

export default GameDetails;
