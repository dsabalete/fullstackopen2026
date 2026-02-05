import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Initial notification for Exercise 6.12',
  reducers: {
    messageChange(_state, action) {
      return action.payload
    },
  },
})

export const { messageChange } = notificationSlice.actions
export default notificationSlice.reducer
