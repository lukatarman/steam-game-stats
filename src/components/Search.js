import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./search.css";

const Search = () => {
  return (
    <div>
      // add fontawesome icon to whole search input bar
      <FontAwesomeIcon icon={faMagnifyingGlass} size="" />
    </div>
  );
};

export default Search;
