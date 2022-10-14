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

    const sortedHistories = sortHistories(gameData.playerHistory);

      setTableContent(
        sortedHistories.map((history) => {
          const year = history.date.getFullYear();
          const month = monthToString(history.date.getMonth());
          const players = history.players;

          return (
            <tr key={history.date}>
              <td>
                {year} {month}
              </td>
              <td>{players}</td>
            </tr>
          );
        })
      );
    }
  }, [gameData]);

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

  return [gameData, tableContent];
};

export default GameDetailsBehavior;
