import { useState } from "react"
import styled from "styled-components"
import { Menu, Navbar } from "./components"
import { darkTheme, lightTheme } from "./utils/Theme"
const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`
const Wrapper = styled.div`
  padding: 22px 96px;
`

function App() {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <Container>
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
      <Main>
        <Navbar />
        <Wrapper>video cards and all</Wrapper>
      </Main>
    </Container>
  )
}

export default App
