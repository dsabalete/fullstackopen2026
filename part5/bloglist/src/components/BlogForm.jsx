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
    <form onSubmit={addBlog}>
      <p>
        <label>
          title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </p>

      <p>
        <label>
          author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
      </p>

      <p>
        <label>
          url:
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
      </p>

      <button id="create-button" type="submit">
        save
      </button>
    </form>
  )
}

export default BlogForm
