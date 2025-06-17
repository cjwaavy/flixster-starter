import "../styles/ScreenToggle.css";

const ScreenToggle = ({
  showSearchResults,
  setShowSearchResults,
  setSideBarFilter,
}) => {
  return (
    <div className="toggle-container">
      <div className="toggle-switch">
        <button
          className={`toggle-option ${!showSearchResults ? "active" : ""}`}
          onClick={() => {
            setShowSearchResults(false);
            setSideBarFilter(""); // Reset filter when clicking Now Playing
          }}
        >
          Now Playing
        </button>
        <button
          className={`toggle-option ${showSearchResults ? "active" : ""}`}
          onClick={() => {
            setShowSearchResults(true);
            setSideBarFilter(""); // Reset filter when clicking Search
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ScreenToggle;
