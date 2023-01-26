import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "../../adapters/http-client/http.client.adapter.js";
import { monthToString } from "../../utils/dates.js";

const GameDetailsBehavior = () => {
  const [gameData, setGameData] = useState([]);
  const [tableContent, setTableContent] = useState(null);
  let { id: gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGameById(gameId);
      setGameData(response);
    };

    fetchData();
  }, [gameId]);

  useEffect(() => {
    if (!gameData.playerHistory) return;

    const renderTable = gameData.playerHistory.reverse().map((entry, index) => {
      return (
        <tr key={index}>
          <td>
            {monthToString(entry.month)} {entry.year}
          </td>
          <td>{entry.averagePlayers.toLocaleString()}</td>
        </tr>
      );
    });

    setTableContent(renderTable);
  }, [gameData]);

  return [gameData, tableContent];
};

export default GameDetailsBehavior;
