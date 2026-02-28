import { Link } from 'react-router-dom'

const Menu = ({ token, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        authors
      </Link>
      <Link to="/books" style={padding}>
        books
      </Link>
      {token && (
        <Link to="/add" style={padding}>
          add book
        </Link>
      )}
      {token && <button onClick={handleLogout}>logout</button>}
      {!token && (
        <Link to="/login" style={padding}>
          login
        </Link>
      )}
    </div>
  )
}

export default Menu
