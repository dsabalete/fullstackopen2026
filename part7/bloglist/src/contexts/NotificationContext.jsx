import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        type: null,
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    type: null,
  })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

let timeoutId = null

export const setNotification = (dispatch, message, type, timeout = 5) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  dispatch({
    type: 'SET_NOTIFICATION',
    payload: { message, type },
  })

  timeoutId = setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, timeout * 1000)
}

export default NotificationContext
