import { fetchMoivesByTitle, fetchMovieConfig, fetchMovieData } from '../utils/fetchMovieData.js'
import '../styles/MovieCards.css'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import MovieCard from './MovieCard.jsx'
import LoadMore from './LoadMore.jsx'

const MovieCardContainer = ({page, setPage, searchTerm, showSearchResults, setShowSearchResults}) => {
    const [movieData, setMovieData] = useState([])
    const [movieConfig, setMovieConfig] = useState(null)

    useEffect(() =>{
        const getConfig = async () => {
            const config = await fetchMovieConfig()
            if (config) {
                console.log(config)
                setMovieConfig(config)
            }
        }
        getConfig()
    },[])
    useEffect(() => {
        const getData = async () => {
            const data = await fetchMovieData(page)
            if (data) {
                console.log(data)
                setMovieData(page === 1 ? data.results : [...movieData, ...data.results])
            }
        }
        const getSearchResults = async () => {
            console.log("in getSearchResults")
            const data = await fetchMoivesByTitle(page, searchTerm)
            if (data) {
                console.log("data reuslts for query", data.results)
                setMovieData(page === 1 ? data.results : [...movieData, ...data.results])
            }
        }
        console.log("showSeachResults was ", showSearchResults)
        showSearchResults ? getSearchResults() : getData()
        console.log("updated moveData to", movieData)
    }, [page, searchTerm, showSearchResults])
    useEffect(() => {
        console.log(movieData)
    }, [movieData])
    useEffect(() => {
        console.log(movieConfig)
    }, [movieConfig])
    useEffect(() => {

    }, [showSearchResults])

    return (
        <div>
            <div className="toggle-container">
                <div className="toggle-switch">
                    <button
                        className={`toggle-option ${!showSearchResults ? 'active' : ''}`}
                        onClick={() => setShowSearchResults(false)}
                    >
                        Now Playing
                    </button>
                    <button
                        className={`toggle-option ${showSearchResults ? 'active' : ''}`}
                        onClick={() => setShowSearchResults(true)}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="movie-card-container">
                {movieData && movieConfig && movieData.map((movie, index) => {
                    return (
                        <MovieCard key={index} movie={movie} imageUrl={`${movieConfig.images.base_url}original${movie.poster_path}`} />
                    )
                })}
            </div>
            <LoadMore page={page} setPage={setPage} setMovieData={setMovieData} movieData={movieData} />
        </div>
    )
}

export default MovieCardContainer
