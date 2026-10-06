import { Link } from 'react-router-dom'

const NO_POSTER = 'https://placehold.co/300x445/1b1b2f/f5c518?text=No+Poster'

function MovieCard({ movie }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : NO_POSTER
  const rating = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : '—'
  const plot = movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'Plot not available.'

  return (
    <div className="card movie-card h-100">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={poster}
          alt={movie.Title}
          className="card-img-top movie-poster"
          onError={(e) => (e.currentTarget.src = NO_POSTER)}
        />
      </Link>

      <div className="card-body">
        <h5 className="card-title fw-bold">{movie.Title}</h5>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">📅 {movie.Year}</span>
          <span className="text-warning fw-bold">⭐ {rating}</span>
        </div>
        <p className="card-text plot-text">{plot}</p>
      </div>
    </div>
  )
}

export default MovieCard

