import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Comment from "./Comment"
import { useSelector } from "react-redux"
import { fetchComments, handleCommentSubmit } from "../apiCalls"
import { motion } from "framer-motion"
import axios from "axios"

const Container = styled.div``

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-items: center;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`

const Button = styled(motion.button)`
  border-radius: 3px;
  border: none;
  padding: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }
`

const Comments = ({ videoId }) => {
  const { user } = useSelector((state) => state.user)

  const [comments, setComments] = useState([])
  const [desc, setDesc] = useState("")

  useEffect(() => {
    fetchComments({ videoId, setComments })
  }, [videoId])

  return (
    <Container>
      {user && (
        <NewComment>
          <Avatar src={user.img} />
          <Input
            placeholder="Add a comment..."
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleCommentSubmit({ videoId, desc, user })
            }}
            whileHover={{ scale: 1.1 }}
          >
            Submit
          </Button>
        </NewComment>
      )}
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </Container>
  )
}

export default Comments
