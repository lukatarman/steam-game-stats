import { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import SearchBarBehavior from "./search.bar.behavior.js";

const SearchBar = () => {
  const searchResultElement = useRef();
  const [searchTerm, isOpen, searchResultsList, onInputChange] =
    SearchBarBehavior(searchResultElement);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link to="/">
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
      <div ref={searchResultElement}>{isOpen ? searchResultsList : null}</div>
    </div>
  );
};

export default SearchBar;
