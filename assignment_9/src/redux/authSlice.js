import { createSlice } from '@reduxjs/toolkit'

const savedUser = localStorage.getItem('user')
const parsedUser = savedUser ? JSON.parse(savedUser) : null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!parsedUser,
    user: parsedUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer