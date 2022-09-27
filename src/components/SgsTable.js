import Table from "react-bootstrap/Table";

function SgsTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{tableOptions.firstCol}</th>
          <th>{tableOptions.secondCol}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Game 1</td>
          <td>2</td>
          <td>+1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Game 2</td>
          <td>3</td>
          <td>+2</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Game 3</td>
          <td>4</td>
          <td>+3</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default SgsTable;
