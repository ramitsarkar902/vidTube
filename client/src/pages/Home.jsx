import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Card } from "../components"
import { fetchVideos } from "../apiCalls"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  scroll-behavior: smooth;
`

function Home({ type }) {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos({ type, setVideos })
  }, [type])

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video.id} video={video} />
      ))}
    </Container>
  )
}

export default Home
