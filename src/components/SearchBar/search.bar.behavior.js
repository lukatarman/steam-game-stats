import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { getSearchResults } from "../../adapters/http-client/http.client.adapter.js";

const SearchBarBehavior = (searchResultDOMelement) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [debounceTerm, setDebounceTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

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

    const onBodyClick = (e) => {
      if (!searchResultDOMelement.current.contains(e.target)) setIsOpen(false);
    };
    document.body.addEventListener("click", onBodyClick);
  }, [debounceTerm, searchResultDOMelement]);

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchResultsList = searchResponse.map((result) => {
    return (
      <Link to={"/game/" + result.id} key={result.id}>
        <div
          className="mb-1"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div className="container h-100">
            <div className="row align-items-center">
              <img className="col-2" src={result.imageUrl} alt="Not found"></img>
              <div className="col-10">
                <span className="fw-bold fs-3">{result.name}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return [searchTerm, isOpen, searchResultsList, onInputChange];
};

export default SearchBarBehavior;
