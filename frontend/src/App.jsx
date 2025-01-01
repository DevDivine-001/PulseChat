import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import SignUp from "./pages/SignUp"
import Homepage from "./pages/Homepage"
import LogIn from "./pages/LogIn"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import { AuthStore } from "./store/Auth.store"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import LandingPages from "./pages/LandingPages"
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = AuthStore()

  useEffect(() => {
    checkAuth()

  }, [checkAuth])

  console.log({ authUser })


  if (isCheckingAuth && !authUser) return (<div>
    <div className="justify-center items-center flex h-screen bg-black">
      <Loader className="size-10 animate-spin" />
    </div>

  </div>)

  return (
    <div className="text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/homepage" element={authUser ? <Homepage /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/homepage" />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to="/homepage" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
