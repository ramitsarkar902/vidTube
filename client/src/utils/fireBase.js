import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD2MHv84RRViWQfUgy_bz7IR0Vwm_Vvmh0",
  authDomain: "vidmate-f2abc.firebaseapp.com",
  projectId: "vidmate-f2abc",
  storageBucket: "vidmate-f2abc.appspot.com",
  messagingSenderId: "730398487144",
  appId: "1:730398487144:web:45b1a9a6cf6594d07d41dd",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app
