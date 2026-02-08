import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  useNotificationDispatch,
  setNotification,
} from './contexts/NotificationContext'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import blogService from './services/blogs'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const blogFormRef = useRef()

  // Fetch blogs using React Query
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  // Create blog mutation
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification(
        notificationDispatch,
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success',
        5,
      )
      blogFormRef.current.toggleVisibility()
    },
    onError: (error) => {
      setNotification(
        notificationDispatch,
        error.response?.data?.error || 'Error creating blog',
        'error',
        5,
      )
    },
  })

  // Update blog mutation
  const updateBlogMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification(
        notificationDispatch,
        `blog "${updatedBlog.title}" by ${updatedBlog.author} liked`,
        'success',
        5,
      )
    },
    onError: (error) => {
      setNotification(
        notificationDispatch,
        error.response?.data?.error || 'Error updating blog',
        'error',
        5,
      )
    },
  })

  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      setNotification(
        notificationDispatch,
        error.response?.data?.error || 'Error deleting blog',
        'error',
        5,
      )
    },
  })

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
      setNotification(
        notificationDispatch,
        err.response.data.error,
        'error',
        5,
      )
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const addBlog = async (blogObject) => {
    newBlogMutation.mutate(blogObject)
  }

  const handleLike = async (id, blogToUpdate) => {
    updateBlogMutation.mutate({ id, blog: blogToUpdate })
  }

  const handleDelete = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    if (
      window.confirm(
        `Do you really want to remove the blog "${blogToRemove.title}" by ${blogToRemove.author}?`,
      )
    ) {
      deleteBlogMutation.mutate(id)
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
        {isLoading && <div>Loading blogs...</div>}
        {isError && <div>Error loading blogs</div>}
        {blogs &&
          [...blogs]
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
