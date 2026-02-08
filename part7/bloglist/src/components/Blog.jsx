import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: '1rem',
    border: 'solid',
    borderWidth: 1,
    marginBottom: '1rem',
  }

  const updateLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  const isCreator = blog.user?.username === username

  return (
    <div style={blogStyle} className="blog">
      <p className="blog-summary">
        <em className="blog-title">{blog.title}</em> - by{' '}
        <span className="blog-author">{blog.author}</span>{' '}
        <button
          className="view-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'hide' : 'view'}
        </button>
      </p>
      <div
        className="blog-details"
        style={{ display: showDetails ? 'block' : 'none' }}
      >
        <p>
          url:{' '}
          <a className="blog-url" href={blog.url} target="_blank">
            {blog.url}
          </a>
        </p>
        <p>
          likes: <span className="blog-likes">{blog.likes}</span>{' '}
          <button className="like-button" onClick={() => updateLike()}>
            like
          </button>
        </p>
        <p>
          {blog.user && (
            <span className="blog-added">added by {blog.user.name}</span>
          )}
        </p>
        {isCreator && (
          <button className="remove-button" onClick={() => removeBlog(blog.id)}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
