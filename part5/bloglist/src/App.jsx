import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0))),
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage(`${err.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)

    if (returnedBlog.error) {
      setErrorMessage(returnedBlog.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    } else {
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    setBlogs(
      blogs
        .concat(returnedBlog)
        .sort((a, b) => (b.likes || 0) - (a.likes || 0)),
    )
    blogFormRef.current.toggleVisibility()
  }

  const updateBlog = async (id, updatedBlog) => {
    const user = updatedBlog.user
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      returnedBlog.user = user
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : returnedBlog))
          .sort((a, b) => (b.likes || 0) - (a.likes || 0)),
      )
    } catch (err) {
      console.log(err)
      setErrorMessage(err.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    if (
      window.confirm(
        `Do you really want to remove the blog "${blogToRemove.title}" by ${blogToRemove.author}?`,
      )
    ) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      } catch (err) {
        setErrorMessage(err.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification message={message} errorMessage={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <h3>create new</h3>
          {blogForm()}
        </div>
      )}
      <h3 style={{ marginTop: '2em' }}>list of blogs</h3>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
      </div>
    </div>
  )
}

export default App
