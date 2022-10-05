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

          return (
            <tr key={month.date}>
              <td>
                {date.getFullYear()} {monthString}
              </td>
              <td>{month.players}</td>
              <td>Test3</td>
            </tr>
          );
        })
      );
    }
  }, [gameData]);

  return [gameData, tableContent];
};

export default GameDetailsBehavior;
