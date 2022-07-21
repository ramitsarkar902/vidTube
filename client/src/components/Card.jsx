import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  padding: 0px 0px 5px 0px;

  &:hover {
    box-shadow: ${({ theme }) => {
      if (theme.name === "darkTheme") {
        return "0px 0px 10px rgb(232, 204, 202);"
      }
      return "0px 0px 10px rgb(92, 80, 79);"
    }};
    transform: scale(1.02);
    border-radius: 5px;
  }
`
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  object-fit: cover;
  border-radius: 3px;
`

const Details = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 12px;
  flex: 1;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  margin-left: 5px;
`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`

const Texts = styled.div``

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`

const Card = ({ type }) => {
  return (
    <Link to="/video/type" style={{ textDecoration: "none" }}>
      <Container
        type={type}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      >
        <Image
          type={type}
          src="https://hakune.co/wp-content/uploads/2022/01/Mr-Beast.jpg"
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://yt3.ggpht.com/ytc/AKedOLQiUg3bH-I1OhPOfuEpQL_VmU92oiBkJL46hgh8dg=s900-c-k-c0x00ffffff-no-rj"
          />
          <Texts>
            <Title>Playing Squid Games in Real scenes</Title>
            <ChannelName>Mr Beast</ChannelName>
            <Info>660,908 views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  )
}

export default Card
