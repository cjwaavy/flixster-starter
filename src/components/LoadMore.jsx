import "../styles/MovieCards.css";

const LoadMore = ({ movieData, setMovieData, page, setPage }) => {
  const handLoadMore = () => {
    setPage(page + 1);
  };
  return (
    <div className="load-more">
      <button className="load-more-btn" onClick={handLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default LoadMore;
