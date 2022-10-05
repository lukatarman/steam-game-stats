import { useEffect, useState } from "react";
import { getGameById } from "../../adapters/http-client/http.client.adapter.js";
import { useParams } from "react-router-dom";

const GameDetails = () => {
  const [gameData, setGameData] = useState({});
  let { id: gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGameById(gameId);
      console.log(response);
      setGameData(response);
    };

    fetchData();
    console.log(gameData);
  }, []);

  return (
    <div>
      <div>
        <div>{gameData.name}</div>
        <img src={gameData.imageUrl} alt="Not found" />
      </div>
    </div>
  );
};

export default GameDetails;
