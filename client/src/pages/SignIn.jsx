import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice"
import { Login, SignUpCall } from "../apiCalls"
import { useDispatch, useSelector } from "react-redux"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import ChangingProgressProvider from "../utils/progressBarConfig/ChangingProgressProvider"
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../utils/fireBase"
import { signInWithPopup } from "firebase/auth"
import axios from "axios"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`

const Title = styled.h1`
  font-size: 24px;
`

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`

const Button = styled(motion.button)`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`

const Links = styled.div`
  margin-left: 50px;
`

const Link = styled.span`
  margin-left: 30px;
`

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [signup, setSignup] = useState(false)
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!password || !name) {
      alert("Please fill in all fields")
      return
    }
    dispatch(loginStart())
    Login({ name, password }, dispatch)
    navigate("/")
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!password || !name || !email) {
      alert("Please fill in all fields")
      return
    }
    SignUpCall({ name, email, password, setSignup })
    alert("Please login now")
  }

  const signInWithGoogle = async (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data))
          })
          .catch((err) => {
            dispatch(loginFailure(err))
          })
      })
      .catch((err) => {
        dispatch(loginFailure(err))
      })
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to VidTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
            {(percentage) => (
              <div style={{ width: 30, height: 10 }}>
                <CircularProgressbar
                  styles={buildStyles({
                    textColor: "red",
                    pathColor: "turquoise",
                    trailColor: "gold",
                  })}
                  value={percentage}
                />
              </div>
            )}
          </ChangingProgressProvider>
        ) : (
          <Button whileHover={{ scale: 1.1 }} onClick={handleLogin}>
            Sign in
          </Button>
        )}

        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign In with Goggle</Button>
        {signup === false && (
          <>
            <Title>or</Title>
            <Input
              placeholder="username"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button whileHover={{ scale: 1.1 }} onClick={handleSignup}>
              Sign up
            </Button>
          </>
        )}
      </Wrapper>
      <More>
        @Ramit Sarkar
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default SignIn
