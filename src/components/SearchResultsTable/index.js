import Table from "react-bootstrap/Table";

function SearchResultsTable({ tableData, tableOptions }) {
  const renderResults = tableData.map((data, index) => {
    return (
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.currentPlayers}</td>
      </tr>
    );
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{tableOptions.firstCol}</th>
          <th>{tableOptions.secondCol}</th>
        </tr>
      </thead>
      <tbody>{renderResults}</tbody>
    </Table>
  );
}

export default SearchResultsTable;
