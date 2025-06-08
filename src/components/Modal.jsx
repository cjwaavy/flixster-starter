import React, { useEffect, useState } from 'react';
import '../styles/Modal.css';
import { fetchMovieDetails } from '../utils/fetchMovieData';

const Modal = ({ isOpen, onClose, movie, imageUrl }) => {
  if (!isOpen) return null;

  const [movieRuntime, setMovieRuntime] = useState(null);
  useEffect(() => {
    const getRuntime = async () => {
        const data = await fetchMovieDetails(movie.id)
        if (data) {
            // console.log(data)
            setMovieRuntime(data.runtime)
        }
    }
    getRuntime()
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{movie.title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-image">
            <img src={imageUrl} alt={movie.title} />
          </div>
          <div className="modal-details">
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}/10 ({movie.vote_count} votes)</p>
            <p><strong>Runtime:</strong> {movieRuntime ? `${movieRuntime} minutes` : 'Runtime information not available'}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            {movie.genres && (
              <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
