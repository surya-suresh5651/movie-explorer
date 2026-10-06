import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar header-nav px-4 py-3">
      <Link to="/" className="navbar-brand text-white fw-bold fs-3">
        🎬 Movie <span className="text-warning">Explorer</span>
      </Link>
    </nav>
  )
}

export default Header