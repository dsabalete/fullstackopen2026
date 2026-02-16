import { Link } from 'react-router-dom'
import { useUserValue, logoutUser, useUserDispatch } from '../contexts/UserContext'

const NavigationMenu = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  const handleLogout = () => {
    logoutUser(userDispatch)
  }

  return (
    <nav className='nav-menu'>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user && (
        <span>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      )}
    </nav>
  )
}

export default NavigationMenu