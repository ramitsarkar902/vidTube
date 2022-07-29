import { formLabelClasses } from "@mui/material"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isLoading = false
      state.error = false
    },
    subscription: (state, action) => {
      if (state.user.subscribedUsers.includes(action.payload)) {
        state.user.subscribedUsers.splice(
          state.user.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        )
      } else {
        state.user.subscribedUsers.push(action.payload)
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions

export default userSlice.reducer
