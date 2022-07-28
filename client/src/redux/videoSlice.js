import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentVideo: null,
  isLoading: false,
  error: null,
}

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.currentVideo = action.payload
    },
    fetchFailure: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions

export default videoSlice.reducer
