import { useParams, useRouteMatch } from "react-router-dom";

const GameDetails = () => {
  let { url } = useRouteMatch();
  let { id } = useParams();

  return (
    <div>
      <div>{url}</div>
      <div>{id}</div>
      <div>{id.name}</div>
    </div>
  );
};

export default GameDetails;
