import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./search.css";

const Search = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
    </div>
  );
};

export default Search;
