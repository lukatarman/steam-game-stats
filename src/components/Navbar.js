import Navbar from "react-bootstrap/Navbar";
import Search from "./Search.js";
import Container from "react-bootstrap/Container";

import "./navbar.css";

const SgsNavbar = ({ includeSearch }) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text className="navbar-item">Steam Game Stats</Navbar.Text>
          <Navbar.Text>{includeSearch && <Search />}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SgsNavbar;
