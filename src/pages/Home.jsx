import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import { searchMoviesAPI, getMovieDetailsAPI } from '../api/allApi'

function Home() {
  // search word URL il (?q=avengers) save cheyyum, appo Back to Search cheythal results thirich kittum
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  const fetchMovies = async (title) => {
    setLoading(true)
    setError('')
    setNotFound(false)
    setMovies([])

    const result = await searchMoviesAPI(title)

    if (result.status === 200) {
      if (result.data.Response === 'True') {
        // search result il rating/plot illa, athu kondu oro movie yude details um edukkunnu
        const detailedMovies = await Promise.all(
          result.data.Search.map(async (m) => {
            const res = await getMovieDetailsAPI(m.imdbID)
            return res.status === 200 && res.data.Response === 'True' ? res.data : m
          })
        )
        setMovies(detailedMovies)
      } else if (result.data.Error === 'Movie not found!') {
        setNotFound(true)
      } else {
        setError(result.data.Error || 'Something went wrong. Please try again.')
      }
    } else {
      setError('Could not connect to the server. Please try again.')
    }

    setLoading(false)
  }

  // URL il search word maarumbol ellaam run aakum
  useEffect(() => {
    if (query) {
      fetchMovies(query)
    } else {
      setMovies([])
      setNotFound(false)
      setError('')
    }
  }, [query])

  const handleSearch = (title) => {
    setSearchParams({ q: title })
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="text-white fw-bold">Find your favourite movies</h1>
        <p className="text-secondary mb-4">Search → Discover → Explore</p>
        <SearchBar onSearch={handleSearch} initialValue={query} key={query} />
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="text-secondary mt-3">Searching movies...</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger text-center">⚠️ {error}</div>
      )}

      {!loading && notFound && (
        <div className="text-center py-5">
          <h1>🔍</h1>
          <h5 className="text-white">Movie not found. Try searching for another movie!</h5>
        </div>
      )}

      {!loading && !query && (
        <div className="text-center py-5">
          <h1>🍿</h1>
          <h5 className="text-white">Type a movie title above to get started.</h5>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <>
          <p className="text-secondary">
            Showing results for <b className="text-warning">"{query}"</b>
          </p>
          <div className="row g-4">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home