import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { fetchComment, deleteComment } from "../apiCalls"
import { useSelector } from "react-redux"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import axios from "axios"

const Container = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;

  div {
    display: flex;
    gap: 10px;
  }
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`

const Text = styled.span`
  font-size: 14px;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({})
  const { user } = useSelector((state) => state.user)
  useEffect(() => {
    fetchComment({ comment, setChannel })
  }, [comment])

  return (
    <Container>
      <div>
        <Avatar src={channel.img} />
        <Details>
          <Name>
            {channel.name} <Date>1 day ago</Date>
          </Name>
          <Text>{comment.desc}</Text>
        </Details>
      </div>

      {user && comment.userId === user._id && (
        <Button
          onClick={(e) => {
            e.preventDefault()
            deleteComment({ comment })
          }}
        >
          <DeleteOutlineIcon />
        </Button>
      )}
    </Container>
  )
}

export default Comment
