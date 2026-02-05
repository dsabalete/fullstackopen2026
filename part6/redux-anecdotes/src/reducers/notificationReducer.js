import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    messageChange(_state, action) {
      return action.payload
    },
  },
})

const { messageChange } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(messageChange(message))
    setTimeout(() => {
      dispatch(messageChange(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
