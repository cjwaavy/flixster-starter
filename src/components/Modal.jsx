import React, { useEffect, useState } from "react";
import "../styles/Modal.css";
import { fetchMovieDetails, fetchMovieVideo } from "../utils/fetchMovieData";

const Modal = ({ isOpen, onClose, movie, imageUrl }) => {
  if (!isOpen) return null;

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieTrailerYTId, setMovieTrailerYTId] = useState(null);
  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(movie.id);
      if (data) {
        setMovieDetails(data);
      }
    };
    const getMovieTrailerYTId = async () => {
      const data = await fetchMovieVideo(movie.id);
      if (data) {
        setMovieTrailerYTId(data.results[0].key);
      }
    };
    getMovieDetails();
    getMovieTrailerYTId();
  }, [movie.id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{movie.title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-image">
            <img src={imageUrl} alt={movie.title} />
          </div>
          <div className="modal-details">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10 (
              {movie.vote_count} votes)
            </p>
            <p>
              <strong>Runtime:</strong>{" "}
              {movieDetails
                ? `${movieDetails.runtime} minutes`
                : "Runtime information not available"}
            </p>
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>
            {movieDetails && movieDetails.genres && (
              <p>
                <strong>Genres:</strong>{" "}
                {movieDetails.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
            <iframe
              className="modal-trailer"
              src={`https://www.youtube.com/embed/${movieTrailerYTId}`}
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
