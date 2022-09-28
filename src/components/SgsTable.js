import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function SgsTable({ tableData, tableOptions }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await tableData();
      setResults(data);
    };

    getData();
  }, []);

  const renderResults = results.map((result, index) => {
    return (
      <tr key={result.id}>
        <td>{index + 1}</td>
        <td>{result.name}</td>
        <td>{result.currentPlayers}</td>
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

export default SgsTable;
