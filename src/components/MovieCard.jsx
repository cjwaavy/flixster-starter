import { useState } from 'react'
import '../styles/MovieCards.css'
import Modal from './Modal'

const MovieCard = ({movie, imageUrl}) => {
    // console.log(movie)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='movie-card' onClick={handleCardClick}>
        <img src={imageUrl} alt={movie.title} />
        <p className='movie-card-title'>{movie.title}</p>
        <p className='movie-card-rating'>Rating: {movie.vote_average}</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movie={movie}
        imageUrl={imageUrl}
      />
    </>
  )
}

export default MovieCard
