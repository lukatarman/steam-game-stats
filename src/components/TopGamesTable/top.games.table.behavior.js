const TopGamesTableBehavior = (tableData) => {
  const renderResults = tableData.map((data, index) => {
    return (
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.currentPlayers}</td>
      </tr>
    );
  });

  return renderResults;
};

export default TopGamesTableBehavior;
