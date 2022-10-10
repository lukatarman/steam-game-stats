import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "../../adapters/http-client/http.client.adapter.js";
import { monthToString } from "../../utils/dates.js";

const GameDetailsBehavior = () => {
  const [gameData, setGameData] = useState([]);
  const [tableContent, setTableContent] = useState(null);
  const [currentPlayers, setCurrentPlayers] = useState("Unknown");
  let { id: gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGameById(gameId);
      console.log(response);
      setGameData(response);
    };

    fetchData();
  }, [gameId]);

  useEffect(() => {
    if (gameData.playerHistory) {
      setTableContent(
        gameData.playerHistory.reverse().map((month) => {
          const date = new Date(month.date);
          const monthString = monthToString(date.getMonth());
          const day = date.getDay();

          return (
            <tr key={month.date}>
              <td>
                {date.getFullYear()} {monthString}
              </td>
              <td>{history.players}</td>
            </tr>
          );
        })
      );
    }
  }, [gameData]);

  return [gameData, tableContent];
};

export default GameDetailsBehavior;

function sortHistories(playerHistory) {
  let previousMonth = "";

  return playerHistory
    .reverse()
    .map((history) => {
      const date = new Date(history.date);
      const month = date.getMonth();
      const players = history.players;

      if (previousMonth === month) {
        return null;
      }

      previousMonth = month;

      return {
        date,
        players,
      };
    })
    .filter((history) => !!history);
}
