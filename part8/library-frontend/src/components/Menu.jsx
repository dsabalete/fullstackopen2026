import { Link } from 'react-router-dom'

const Menu = () => {
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
      <Link to="/add" style={padding}>
        add book
      </Link>
    </div>
  )
}

export default Menu
