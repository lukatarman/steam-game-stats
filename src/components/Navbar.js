import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import "./navbar.css";

const SgsNavbar = ({ includeSearch }) => {
  return (
    <Container>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Steam Game Stats</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Container>
      </Navbar>
    </Container>
  );
};

export default SgsNavbar;
