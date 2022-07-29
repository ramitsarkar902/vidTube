import React from "react"
import styled from "styled-components"
import HomeIcon from "@mui/icons-material/Home"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined"
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined"
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined"
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined"
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined"
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined"
import LogoutIcon from "@mui/icons-material/Logout"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import { LogOut } from "../apiCalls"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  flex: 1.2;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  position: sticky;
  font-size: 14px;
  top: 0;
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
`

const Wrapper = styled.div`
  padding: 18px 20px;

  height: 100%;
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
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 3px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 3px;
  }
`

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`

const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`

function Menu({ darkMode, setDarkMode }) {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src="https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png" />
            <span>VidTube</span>
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        {user && (
          <Link
            to="/subscriptions"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <SubscriptionsOutlinedIcon />
              Subscriptions
            </Item>
          </Link>
        )}

        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {user ? (
          <Login>
            Logout
            <Button
              onClick={(e) => {
                e.preventDefault()
                LogOut({ dispatch })
                navigate("/")
              }}
            >
              <LogoutIcon />
            </Button>
          </Login>
        ) : (
          <Login>
            Sign in to like videos, comment, and subscribe.
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          </Login>
        )}
        <Hr />
        <Title>BEST OF VidTube</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu
