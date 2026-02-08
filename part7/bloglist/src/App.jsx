import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (err) {
      dispatch(setNotificationWithTimeout(err.response.data.error, 'error', 5))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await dispatch(createBlog(blogObject))
      dispatch(
        setNotificationWithTimeout(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          'success',
          5,
        ),
      )
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout(
          exception.response?.data?.error || 'Error creating blog',
          'error',
          5,
        ),
      )
    }
  }

  const handleLike = async (id, blogToUpdate) => {
    try {
      const returnedBlog = await dispatch(likeBlog(blogToUpdate))
      dispatch(
        setNotificationWithTimeout(
          `blog "${returnedBlog.title}" by ${returnedBlog.author} liked`,
          'success',
          5,
        ),
      )
    } catch (err) {
      console.log(err)
      dispatch(setNotificationWithTimeout(err.response.data.error, 'error', 5))
    }
  }

  const handleDelete = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    if (
      window.confirm(
        `Do you really want to remove the blog "${blogToRemove.title}" by ${blogToRemove.author}?`,
      )
    ) {
      try {
        await dispatch(removeBlog(id))
      } catch (err) {
        dispatch(
          setNotificationWithTimeout(err.response.data.error, 'error', 5),
        )
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
      <Notification />

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
        {[...blogs]
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={handleLike}
              removeBlog={handleDelete}
              username={user?.username}
            />
          ))}
      </div>
    </div>
  )
}

export default App
