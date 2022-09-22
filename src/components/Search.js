import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./search.css";

const Search = () => {
  // add fontawesome icon to whole search input bar
  //test
  return (
    <div>
      <FontAwesomeIcon icon={faMagnifyingGlass} size="" />
    </div>
  );
};

export default Search;
