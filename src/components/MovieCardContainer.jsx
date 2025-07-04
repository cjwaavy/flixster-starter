import {
  fetchMoivesByTitle,
  fetchMovieConfig,
  fetchMovieData,
} from "../utils/fetchMovieData.js";
import "../styles/MovieCards.css";
import { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard.jsx";
import LoadMore from "./LoadMore.jsx";
import SideBar from "./SideBar.jsx";
import ScreenToggle from "./ScreenToggle.jsx";
const MovieCardContainer = ({
  page,
  setPage,
  searchTerm,
  showSearchResults,
  setShowSearchResults,
  activeFilter,
}) => {
  const [movieData, setMovieData] = useState([]);
  const [movieConfig, setMovieConfig] = useState(null);
  const [sideBarFilter, setSideBarFilter] = useState("");
  const [originalMovieData, setOriginalMovieData] = useState([]);

  // Create a ref to track the previous search term
  const prevSearchTermRef = useRef("");
  const sortMoviesByWatched = () => {
    return originalMovieData.filter((movie) => movie.isWatched === true)
  }
  const sortMoviesByLiked = () => { 
    return originalMovieData.filter((movie) => movie.isLiked === true)
  }
  const sortAlphabetically = (filteredData) => {
    return [...filteredData].sort((movieA, movieB) => movieA.title.localeCompare(movieB.title))
  }
  const sortByReleaseDate = (filteredData) => {
    return [...filteredData].sort((movieA, movieB) => movieA.release_date.localeCompare(movieB.release_date))
  }
  const sortByPopularity = (filteredData) => {
    return [...filteredData].sort((movieA, movieB) => movieB.vote_movieAverage - a.vote_average);
  }
  useEffect(() => {
    let filteredData = [...originalMovieData];

    if (sideBarFilter === "watched") {
      filteredData = sortMoviesByWatched()
    } else if (sideBarFilter === "liked") {
      filteredData = sortMoviesByLiked()
    }

    if (activeFilter === "alphabetic") {
      filteredData = sortAlphabetically(filteredData)
    } else if (activeFilter === "release-date") {
      filteredData = sortByReleaseDate(filteredData)
    } else if (activeFilter === "popularity") {
      filteredData = sortByPopularity(filteredData)
    }

    setMovieData(filteredData);
  }, [activeFilter, sideBarFilter, originalMovieData]);

  useEffect(() => {
    const getConfig = async () => {
      const config = await fetchMovieConfig();
      if (config) {
        setMovieConfig(config);
      }
    };
    getConfig();
  }, []);
  // Reset sideBarFilter and page when switching tabs or entering a search term
  useEffect(() => {
    // Reset the filter to empty string
    setSideBarFilter("");

    // Reset page to 1 when search term changes
    if (searchTerm !== prevSearchTermRef.current) {
      setPage(1);
    }
  }, [showSearchResults, searchTerm, setPage]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieData(page);
      if (data) {
        const processedData = data.results.map((movie) => ({
          ...movie,
          isLiked: false,
          isWatched: false,
        }));

        const newData =
          page === 1 ? processedData : [...originalMovieData, ...processedData];
        setOriginalMovieData(newData);
        setMovieData(newData);
      }
    };
    const getSearchResults = async () => {
      const data = await fetchMoivesByTitle(page, searchTerm);
      if (data) {
        const processedData = data.results.map((movie) => ({
          ...movie,
          isLiked: false,
          isWatched: false,
        }));

        // For search, always replace the data when the search term changes
        // Only append if we're loading more pages of the same search
        const isNewSearch = searchTerm !== prevSearchTermRef.current;
        const newData =
          page === 1 || isNewSearch
            ? processedData
            : [...originalMovieData, ...processedData];

        setOriginalMovieData(newData);
        setMovieData(newData);

        // Update the previous search term reference
        prevSearchTermRef.current = searchTerm;
      }
    };
    showSearchResults ? getSearchResults() : getData();
  }, [page, searchTerm, showSearchResults]);

  return (
    <main className="MovieCardContainer">
      <div className="side-bar-container">
        <SideBar
          setSideBarFilter={setSideBarFilter}
          sideBarFilter={sideBarFilter}
        />
      </div>
      <div className="toggle-movie-card-contaitner">
        <ScreenToggle
          showSearchResults={showSearchResults}
          setShowSearchResults={setShowSearchResults}
          setSideBarFilter={setSideBarFilter}
        />
        <div className="movie-card-container">
          {movieData && movieConfig && movieData.length > 0 ? (
            movieData.map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                imageUrl={`${movieConfig.images.base_url}original${movie.poster_path}`}
                onMovieUpdate={(updatedMovie) => {
                  const updatedOriginalData = originalMovieData.map((m) =>
                    m.id === updatedMovie.id ? updatedMovie : m
                  );
                  setOriginalMovieData(updatedOriginalData);
                }}
              />
            ))
          ) : (
            <div className="no-movies-container">
              <div className="no-movies-icon">🎬</div>
              <h2 className="no-movies-title">No Movies Found</h2>
              <p className="no-movies-message">
                {sideBarFilter
                  ? `No movies match the "${
                      sideBarFilter === "liked" ? "Liked" : "Watched"
                    }" filter. Try liking or marking some movies as watched, or select a different filter.`
                  : showSearchResults
                  ? `No movies match your search for "${searchTerm}". Try a different search term.`
                  : "No movies available. Please try again later."}
              </p>
            </div>
          )}
        </div>
        {movieData && movieData.length > 0 && (
          <LoadMore
            page={page}
            setPage={setPage}
            setMovieData={setMovieData}
            movieData={movieData}
          />
        )}
      </div>
    </main>
  );
};

export default MovieCardContainer;
