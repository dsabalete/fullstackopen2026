import { createContext, useReducer, useContext, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  // Initialize user from localStorage on mount
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
    }
  }, [])

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export const loginUser = async (dispatch, credentials) => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  blogService.setToken(user.token)
  dispatch({ type: 'SET_USER', payload: user })
}

export const logoutUser = (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  blogService.setToken(null)
  dispatch({ type: 'CLEAR_USER' })
}

export default UserContext
