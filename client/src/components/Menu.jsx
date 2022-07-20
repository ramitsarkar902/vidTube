import React from "react"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  background-color: #202020;
  height: 100vh;
  color: white;
`

const Wrapper = styled.div`
  padding: 18px 26px;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: bold;
  margin-bottom: 25px;
  cursor: pointer;

  span {
    margin-left: 10px;
    font-size: 0.8rem;
  }
`

const Img = styled.img`
  height: 25px;
  width: 30px;
`
function Menu({ darkMode, setDarkMode }) {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src="https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png" />
          <span>VidTube</span>
        </Logo>
      </Wrapper>
    </Container>
  )
}

export default Menu
