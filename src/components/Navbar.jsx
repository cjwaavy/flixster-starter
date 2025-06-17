import { useEffect, useState } from "react";
import "../styles/Navbar.css";

const Navbar = ({
  setShowSearchResults,
  showSearchResults,
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}) => {
  const [liveSearchTerm, setLiveSearchTerm] = useState(""); //used to detect if search bar is empty
  const handleClearSearch = () => {
    setShowSearchResults(false);
    setLiveSearchTerm("");
    setSearchTerm("");
    document.querySelector(".search-bar").value = "";
  };
  const handleSearch = () => {
    setShowSearchResults(true);
    if (document.querySelector(".search-bar")) {
      setSearchTerm(document.querySelector(".search-bar").value);
    }
  };
  useEffect(() => {
  }, [searchTerm]);
  useEffect(() => {
    if (liveSearchTerm === "") {
      setShowSearchResults(false);
    }
  }, [liveSearchTerm]);
  return (
    <nav className="nav-bar">
      <a href="/">
        <p className="title">🎥Flixster🎬</p>
      </a>
      <div className="search-sort-containter">
        <div className="search-area">
          <input
            className="search-bar"
            placeholder="Search for movies"
            onChange={(event) => {
              setLiveSearchTerm(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="submit-search-button" onClick={handleSearch}>
            Search
          </button>
          <button
            className="submit-search-button-mobile"
            onClick={handleSearch}
          >
            Search
          </button>
          <button className="submit-search-button" onClick={handleClearSearch}>
            Clear
          </button>
        </div>
        <div className="sort-area">
          <select
            className="sort-dropdown"
            defaultValue="Sort By"
            onChange={(event) => setActiveFilter(event.target.value)}
          >
            <option value="default" selected disabled>
              {"Sort By"}
            </option>
            <option value="alphabetic">{"Alphabetic: (A-Z)"}</option>
            <option value="release-date">{"Release Date: (New to Old)"}</option>
            <option value="popularity">{"Popularity: (Descending)"}</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
