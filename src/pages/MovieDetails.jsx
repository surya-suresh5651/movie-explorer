import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetailsAPI } from '../api/allApi'

const NO_POSTER = 'https://placehold.co/400x600/1b1b2f/f5c518?text=No+Poster'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchMovie = async () => {
    setLoading(true)
    setError('')

    const result = await getMovieDetailsAPI(id)

    if (result.status === 200 && result.data.Response === 'True') {
      setMovie(result.data)
    } else if (result.status === 200) {
      setError(result.data.Error || 'Movie not found.')
    } else {
      setError('Could not load movie details. Please try again.')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchMovie()
  }, [id])

  // oru detail line (OMDb "N/A" thannal kaanikkilla)
  const showRow = (icon, label, value) => {
    if (!value || value === 'N/A') return null
    return (
      <div className="mb-3">
        <div className="text-warning fw-bold">
          {icon} {label}
        </div>
        <div className="text-white">{value}</div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      {/* previous page il povum, search results athe pole kittum */}
      <button className="btn btn-outline-warning mb-4" onClick={() => navigate(-1)}>
        ⬅️ Back to Search
      </button>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status"></div>
          <p className="text-secondary mt-3">Loading movie details...</p>
        </div>
      )}

      {!loading && error && <div className="alert alert-danger text-center">⚠️ {error}</div>}

      {!loading && movie && (
        <div className="row g-5">
          <div className="col-12 col-md-4 text-center">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : NO_POSTER}
              alt={movie.Title}
              className="img-fluid rounded-4 details-poster"
              onError={(e) => (e.currentTarget.src = NO_POSTER)}
            />
          </div>

          <div className="col-12 col-md-8">
            <h1 className="text-white fw-bold">{movie.Title}</h1>

            <div className="d-flex gap-4 my-3">
              <span className="text-secondary">📅 {movie.Year}</span>
              <span className="text-warning fw-bold">
                ⭐ {movie.imdbRating !== 'N/A' ? `${movie.imdbRating}/10` : 'Not rated'}
              </span>
            </div>

            {showRow('🎭', 'Genre', movie.Genre)}
            {showRow('📖', 'Plot', movie.Plot)}
            {showRow('🎥', 'Director', movie.Director)}
            {showRow('👥', 'Actors', movie.Actors)}
            {showRow('⏱️', 'Runtime', movie.Runtime)}
            {showRow('🌍', 'Language', movie.Language)}
            {showRow('🏆', 'Awards', movie.Awards)}
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetails