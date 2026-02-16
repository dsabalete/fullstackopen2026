import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} className="blog-form">
      <div className="blog-form-group">
        <label htmlFor="blog-title" className="blog-form-label">Title:</label>
        <input
          id="blog-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="blog-form-input"
          placeholder="Enter blog title..."
          required
        />
      </div>

      <div className="blog-form-group">
        <label htmlFor="blog-author" className="blog-form-label">Author:</label>
        <input
          id="blog-author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="blog-form-input"
          placeholder="Enter author name..."
          required
        />
      </div>

      <div className="blog-form-group">
        <label htmlFor="blog-url" className="blog-form-label">URL:</label>
        <input
          id="blog-url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="blog-form-input"
          placeholder="Enter blog URL..."
          type="url"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ marginTop: '10px' }}
      >
        💾 Create Blog
      </button>
    </form>
  )
}

export default BlogForm
