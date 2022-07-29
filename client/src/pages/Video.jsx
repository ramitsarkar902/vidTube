import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined"
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined"
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined"
import { Comments, Recommendation } from "../components"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchVideoData,
  handleLike,
  handleDislike,
  handleSubscription,
} from "../apiCalls"
import { fetchStart } from "../redux/videoSlice"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"

const Container = styled.div`
  display: flex;
  gap: 25px;
`

const Content = styled.div`
  flex: 5;
`
const VideoWrapper = styled(motion.div)`
  height: 500px;

  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`

const ChannelName = styled.span`
  font-weight: 500;
`

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`

const Description = styled.p`
  font-size: 14px;
`

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`

function Video() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [channelDetails, setChannelDetails] = useState({})
  const { currentVideo } = useSelector((state) => state.video)
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchStart())
    fetchVideoData({ id, dispatch, setChannelDetails })
  }, [id, dispatch])

  return (
    <Container>
      <Content>
        <VideoWrapper
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        >
          <iframe
            src={currentVideo.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • Jun 22, 2022</Info>
          <Buttons>
            {user && (
              <>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    handleLike({ currentVideo, dispatch, user })
                  }}
                >
                  {currentVideo.likes.includes(user._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                  {currentVideo.likes.length}
                </Button>

                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    handleDislike({ currentVideo, dispatch, user })
                  }}
                >
                  {currentVideo.dislikes.includes(user._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}{" "}
                  Dislike
                </Button>
              </>
            )}

            <Button
              onClick={() => {
                navigator.clipboard.writeText(currentVideo.videoUrl)
                alert("Copied to clipboard")
              }}
            >
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channelDetails.img} />
            <ChannelDetail>
              <ChannelName>{channelDetails.name}</ChannelName>
              <ChannelCounter>
                {channelDetails.subscribers} subscribers
              </ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {user && (
            <Subscribe
              onClick={(e) => {
                e.preventDefault()
                handleSubscription({ channelDetails, user, dispatch })
              }}
            >
              {user.subscribedUsers.includes(channelDetails._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  )
}

export default Video
