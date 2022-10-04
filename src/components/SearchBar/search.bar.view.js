import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const SearchBarView = () => {
  return (
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
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default SearchBarView;
