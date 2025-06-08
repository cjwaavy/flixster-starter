import { useEffect, useState } from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import MovieCardContainer from './components/MovieCardContainer'

const App = () => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  return (
    <div className="App">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} showSearchResults={showSearchResults} setShowSearchResults={setShowSearchResults} />
      <MovieCardContainer page={page} setPage={setPage} searchTerm={searchTerm} setShowSearchResults={setShowSearchResults} showSearchResults={showSearchResults}/>
    </div>
  )
}

export default App
