import { useEffect, useState } from "react";
import "../styles/MovieCards.css";
import Modal from "./Modal";

const MovieCard = ({ movie, imageUrl, onMovieUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(movie.isLiked || false);
  const [isWatched, setIsWatched] = useState(movie.isWatched || false);
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = (event) => {
    event.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    movie.isLiked = newIsLiked;

    if (onMovieUpdate) {
      onMovieUpdate(movie);
    }
  };

  const handleWatchedClick = (event) => {
    event.stopPropagation();
    const newIsWatched = !isWatched;
    setIsWatched(newIsWatched);
    movie.isWatched = newIsWatched;

    if (onMovieUpdate) {
      onMovieUpdate(movie);
    }
  };

  useEffect(() => {
    setIsLiked(movie.isLiked || false);
    setIsWatched(movie.isWatched || false);
  }, [movie.isLiked, movie.isWatched]);
  return (
    <>
      <div className="movie-card" onClick={handleCardClick}>
        <button id="likeButton" className={isLiked ? "like-button" : "hide"}>
          <svg
            className="like-heart"
            onClick={handleLike}
            viewBox="0 0 24 24"
            fill={isLiked ? "red" : "none"}
            xmlns="http://www.w3.org/2000/svg"
            stroke={`red`}
            strokeWidth="1.5px"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <button
          id="watchedButton"
          className={isWatched ? "watched-button" : "hide"}
        >
          <svg
            className="watch-eye"
            onClick={handleWatchedClick}
            viewBox="0 0 24 24"
            fill={isWatched ? "yellow" : "white"}
            stroke-width="0"
          >
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 16H13L10.8368 13.3376C9.96488 13.7682 8.99592 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8L3.07945 4.30466C3.14989 4.22013 3.22229 4.13767 3.29656 4.05731L0 0H3L16 16ZM5.35254 6.58774C5.12755 7.00862 5 7.48941 5 8C5 9.65685 6.34315 11 8 11C8.29178 11 8.57383 10.9583 8.84053 10.8807L5.35254 6.58774Z"
                fill={isWatched ? "yellow" : "white"}
              ></path>{" "}
              <path
                d="M16 8L14.2278 10.1266L7.63351 2.01048C7.75518 2.00351 7.87739 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8Z"
                fill={isWatched ? "yellow" : "white"}
              ></path>{" "}
            </g>
          </svg>
        </button>
        <img src={imageUrl} alt={movie.title} />
        <p className="movie-card-title">{movie.title}</p>
        <p className="movie-card-rating">Rating: {movie.vote_average}</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movie={movie}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default MovieCard;
