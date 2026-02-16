import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  useNotificationDispatch,
  setNotification,
} from './contexts/NotificationContext'
import {
  useUserValue,
  useUserDispatch,
  loginUser,
} from './contexts/UserContext'
import blogService from './services/blogs'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'
import Users from './components/Users.jsx'
import User from './components/User.jsx'
import BlogView from './components/BlogView.jsx'
import NavigationMenu from './components/NavigationMenu.jsx'

const App = () => {
  const user = useUserValue()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userDispatch = useUserDispatch()
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await loginUser(userDispatch, { username, password })
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

  const blogsList = () => (
    <div className="blogs-list-container">
      <h3 className="blogs-list-header">📚 Blog Posts</h3>
      <div>
        {isLoading && <div className="blogs-list-loading">Loading blogs...</div>}
        {isError && <div className="blogs-list-loading">Error loading blogs</div>}
        {blogs && blogs.length === 0 && (
          <div className="blogs-list-empty-state">
            No blogs yet. Create your first blog post!
          </div>
        )}
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

  return (
    <Router>
      <div className="bloglist-app">
        <NavigationMenu />
        <div className="container">
          <h1 className="app-title">📝 Bloglist App</h1>
          <Notification />

          {!user && loginForm()}

          <Routes>
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/blogs/:id" element={
              <BlogView
                updateBlog={handleLike}
                removeBlog={handleDelete}
                username={user?.username}
              />
            } />
            <Route
              path="/"
              element={
                user ? (
                  <div>
                    <div className="create-blog-section">
                      <h3 className="create-blog-heading">✍️ Create New Blog</h3>
                      {blogForm()}
                    </div>
                    {blogsList()}
                  </div>
                ) : null
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
