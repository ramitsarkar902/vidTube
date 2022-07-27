import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Card } from "../components"
import { fetchVideos } from "../apiCalls"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import ChangingProgressProvider from "../progressBarConfig/ChangingProgressProvider"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  scroll-behavior: smooth;
`

const ProgressDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
`

function Home({ type }) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      fetchVideos({ type, setVideos, setLoading })
    }, 1000)
  }, [type])

  return (
    <Container>
      {loading ? (
        <ChangingProgressProvider values={[0, 15, 50, 75, 100]}>
          {(percentage) => (
            <ProgressDiv>
              <CircularProgressbar
                styles={buildStyles({
                  textColor: "red",
                  pathColor: "blue",
                  trailColor: "gray",
                })}
                value={percentage}
              />
            </ProgressDiv>
          )}
        </ChangingProgressProvider>
      ) : (
        <>
          {videos.map((video) => (
            <Card key={video.id} video={video} />
          ))}
        </>
      )}
    </Container>
  )
}

export default Home
