import { Link } from "react-router-dom";

const TopGamesTableBehavior = (tableData) => {
  const renderResults = tableData.map((data, index) => {
    const currentPlayersThousandsSeparated = data.currentPlayers.toLocaleString("en-US");
    return (
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>
          <Link to={"/game/" + data.id}>{data.name}</Link>
        </td>
        <td>{currentPlayersThousandsSeparated}</td>
      </tr>
    );
  });

  return renderResults;
};

export default TopGamesTableBehavior;
