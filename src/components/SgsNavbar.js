import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const SgsNavbar = () => {
  const [inputValue, setInputValue] = useState("placeholder");

  useEffect(() => {
    // axios.get();
  }, [inputValue]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
            onChange={onInputChange}
            value={inputValue}
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default SgsNavbar;
