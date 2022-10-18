import { useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import SearchBarBehavior from "./search.bar.behavior.js";
import "./search.bar.css";

const SearchBar = () => {
  const searchResultDOMelement = useRef();
  const [searchTerm, isOpen, searchResultsList, onInputChange] =
    SearchBarBehavior(searchResultDOMelement);

  return (
    <div className="search-results-content">
      <Navbar fixed="top" bg="light" expand="lg">
        <Container fluid="lg">
          <Link to="/">
            <Navbar.Brand>Steam Game Stats</Navbar.Brand>
          </Link>
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

      <div ref={searchResultDOMelement} className="search-results-list">
        {isOpen ? searchResultsList : null}
      </div>
    </div>
  );
};

export default SearchBar;
