import { useDispatch } from "react-redux"
import {
  loginFailure,
  subscription,
  loginSuccess,
  logout,
} from "./redux/userSlice"
import { fetchSuccess, like, dislike } from "./redux/videoSlice"
import axios from "axios"
import storage from "redux-persist/lib/storage"

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

export const LogOut = async ({ dispatch }) => {
  try {
    await axios.post("/auth/logout")
    dispatch(logout())
  } catch (error) {
    console.log(error)
  }
}

export const fetchVideoData = async ({ setChannelDetails, id, dispatch }) => {
  try {
    const videoRes = await axios.get(`/videos/find/${id}`)
    const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
    setChannelDetails(channelRes.data)
    dispatch(fetchSuccess(videoRes.data))
  } catch (err) {
    dispatch(loginFailure(err))
  }
}

export const SignUpCall = async ({ name, email, password, setSignup }) => {
  try {
    await axios.post("auth/signup", { name, email, password })
    setSignup(true)
  } catch (err) {
    console.log(err)
  }
}

export const handleLike = async ({ currentVideo, dispatch, user }) => {
  await axios.put(`/users/like/${currentVideo._id}`)
  dispatch(like(user._id))
}
export const handleDislike = async ({ currentVideo, dispatch, user }) => {
  await axios.put(`/users/dislike/${currentVideo._id}`)
  dispatch(dislike(user._id))
}

export const handleSubscription = async ({
  user,
  channelDetails,
  dispatch,
}) => {
  try {
    user.subscribedUsers.includes(channelDetails._id)
      ? await axios.put(`/users/unsub/${channelDetails._id}`)
      : await axios.put(`/users/sub/${channelDetails._id}`)
    dispatch(subscription(channelDetails._id))
    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}

export const fetchComments = async ({ videoId, setComments }) => {
  try {
    const res = await axios.get(`/comments/${videoId}`)
    setComments(res.data)
  } catch (err) {}
}

export const fetchComment = async ({ comment, setChannel }) => {
  const res = await axios.get(`/users/find/${comment.userId}`)
  setChannel(res.data)
}

export const handleCommentSubmit = async ({ desc, user, videoId }) => {
  if (desc === "") {
    alert("Please enter a comment")
    return
  } else {
    await axios.post("/comments", {
      userId: user.id,
      videoId: videoId,
      desc: desc,
    })
    window.location.reload()
  }
}

export const deleteComment = async ({ comment }) => {
  await axios.delete(`/comments/${comment._id}`)
  window.location.reload()
}
