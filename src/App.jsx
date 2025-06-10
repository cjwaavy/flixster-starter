import { useEffect, useState } from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import MovieCardContainer from './components/MovieCardContainer'

const App = () => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [activeFilter, setActiveFilter] = useState('')
  return (
    <div className="App">
      <header>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} showSearchResults={showSearchResults} setShowSearchResults={setShowSearchResults} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      </header>
      <MovieCardContainer page={page} setPage={setPage} searchTerm={searchTerm} setShowSearchResults={setShowSearchResults} showSearchResults={showSearchResults} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      <footer className="app-footer">
        @Copyright 2025 FLIXSTER
      </footer>
    </div>
  )
}

export default App
