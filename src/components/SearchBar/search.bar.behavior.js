import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSearchResults } from "../../adapters/http-client/http.client.adapter.js";

const SearchBarBehavior = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSearchResults(searchTerm);
      setSearchResponse(response);
    };

    if (searchTerm) {
      fetchData();
      setIsOpen(true);
    }

    if (!searchTerm) setIsOpen(false);
  }, [searchTerm]);

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchResultsList = searchResponse.map((result) => {
    return (
      <div key={result.id}>
        <img src={result.imageUrl}></img>
        <Link to={"/games/" + result.id} style={{ textDecoration: "none" }}>
          <strong>Game name</strong>: {result.name}
        </Link>
      </div>
    );
  });

  return [searchTerm, isOpen, searchResultsList, onInputChange];
};

export default SearchBarBehavior;
