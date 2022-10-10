import { Table } from "react-bootstrap";
import GameDetailsBehavior from "./game.details.behavior.js";

const GameDetails = () => {
  const [gameData, tableContent] = GameDetailsBehavior();

  return (
    <div>
      <div>
        <div>{gameData.name}</div>
        <img src={gameData.imageUrl} alt="Not found" />
        <div>Current Players: ${gameData.currentPlayers}</div>
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
    </div>
  );
};

export default GameDetails;
