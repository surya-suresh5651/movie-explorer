import { useState } from 'react'

function SearchBar({ onSearch, initialValue }) {
  const [title, setTitle] = useState(initialValue || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onSearch(title.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row gap-2 search-box mx-auto">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Search for a movie, e.g. Avengers"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn btn-warning btn-lg fw-bold px-4">
        Search
      </button>
    </form>
  )
}

export default SearchBar