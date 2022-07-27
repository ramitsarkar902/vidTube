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
    logOut: (state) => {
      state.user = null
      state.isLoading = false
      state.error = false
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions

export default userSlice.reducer
