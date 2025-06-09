import { useEffect, useState } from 'react'
import '../styles/Navbar.css'
// import { handleSearch } from '../utils/searchActions'

const Navbar = ({ setShowSearchResults, showSearchResults, searchTerm, setSearchTerm, activeFilter, setActiveFilter}) => {
  const [liveSearchTerm, setLiveSearchTerm] = useState('')
  const handleClearSearch = () => {
    setShowSearchResults(false)
    setLiveSearchTerm('')
    setSearchTerm('')
    document.querySelector('.search-bar').value = ''
  }
  const handleSearch = () => {
    console.log("handleSearch")
    setShowSearchResults(true)
    if(document.querySelector('.search-bar')) {
      setSearchTerm(document.querySelector('.search-bar').value)
    }
  }
  useEffect(() => {
    console.log("showSearchResults:", showSearchResults)
  }, [searchTerm])
  useEffect(() => {

    console.log(liveSearchTerm)
    if(liveSearchTerm === '') {
      setShowSearchResults(false)
      console.log("setShowSearchResults to false because empty search bar")
    }
  }, [liveSearchTerm])
  return (
    <nav className='nav-bar'>
      <a href="/">
        <p className='title'>🎥Flixster🎬</p>
      </a>
      <div className='search-sort-containter'>
        <div className='search-area'>
          <input className='search-bar' placeholder='Search for movies' onChange={(event) => {setLiveSearchTerm(event.target.value)}}>

          </input>
          <button className='submit-search-button' onClick={handleSearch}>
            Search
          </button>
          <button className='submit-search-button' onClick={handleClearSearch}>
            Clear
          </button>
        </div>
        <div className='sort-area'>
          <select className='sort-dropdown' defaultValue="Sort By" onChange={(event) => setActiveFilter(event.target.value)}>
            <option value="default" selected disabled>{"Sort By"}</option>
            <option value="alphabetic">{"Alphabetic: (A-Z)"}</option>
            <option value="release-date">{"Release Date: (New to Old)"}</option>
            <option value="popularity">{"Popularity: (Descending)"}</option>
          </select>
        </div>
      </div>
    </nav>
  )

}

export default Navbar
