import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import "./search.css";

const Search = () => {
  // add fontawesome icon to whole search input bar
  return (
    <Form>
      <Form.Control type="search" placeholder="Enter email" />
    </Form>
  );
};

export default Search;
