import { useDispatch } from "react-redux"
import { loginFailure, loginStart, loginSuccess } from "./redux/userSlice"
import axios from "axios"

export const Login = async ({ name, password }, dispatch) => {
  try {
    setTimeout(async () => {
      const res = await axios.post("auth/signin", { name, password })
      dispatch(loginSuccess(res.data))
    }, 2000)
  } catch (err) {
    dispatch(loginFailure(err))
  }
}

export const fetchVideos = async ({ type, setVideos, setLoading }) => {
  const res = await axios.get(`videos/${type}`)
  setVideos(res.data)
  setLoading(false)
}
