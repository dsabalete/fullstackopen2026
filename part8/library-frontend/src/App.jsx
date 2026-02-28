import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Menu from './components/Menu'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Menu token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add"
          element={token ? <NewBook /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/recommendations"
          element={token ? <Recommendations /> : undefined}
        />
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <LoginForm setToken={setToken} setError={notify} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
