import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: '1rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: '1rem',
  }

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
