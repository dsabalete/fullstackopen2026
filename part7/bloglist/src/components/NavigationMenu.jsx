import { Link } from 'react-router-dom'
import { useUserValue, logoutUser, useUserDispatch } from '../contexts/UserContext'

const NavigationMenu = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  const handleLogout = () => {
    logoutUser(userDispatch)
  }

  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-link">📚 Blogs</Link>
      <Link to="/users" className="nav-link">👥 Users</Link>
      {user && (
        <div className="nav-user-info">
          <span className="nav-user-name">👤 {user.name}</span>
          <button className="btn btn-light btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default NavigationMenu