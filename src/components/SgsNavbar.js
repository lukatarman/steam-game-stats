import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

// todo
// add endpoint for search to backend
// add search results to JSX

const SgsNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/search?q=${searchTerm}`);
      setSearchResponse(response.data);
    };

    if (searchTerm) {
      fetchData();
      setIsOpen(true);
    }
  }, [searchTerm]);

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchList = searchResponse.map((result) => {
    return (
      <div key={result.id}>
        <strong>Game name</strong>: {result.name}, <strong>Current players</strong>:{" "}
        {result.currentPlayers}
      </div>
    );
  });

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Brand>Steam Game Stats</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={onInputChange}
              value={searchTerm}
            />
          </Form>
        </Container>
      </Navbar>
      <div>{isOpen ? searchList : null}</div>
    </div>
  );
};

export default SgsNavbar;
