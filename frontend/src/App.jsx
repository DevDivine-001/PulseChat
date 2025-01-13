import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import LogIn from "./pages/LogIn";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import LandingPages from "./pages/LandingPages";
import { AuthStore } from "./store/Auth.store";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = AuthStore();
  const { theme } = useThemeStore()
  console.log({ onlineUsers })

  useEffect(() => {
    checkAuth().catch((error) => console.error("Authentication error:", error));
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader className="size-12 animate-spin text-white" />
      </div>
    );

  const routes = [
    { path: "/", element: <LandingPages /> },
    { path: "/chat", element: authUser ? <Homepage /> : <Navigate to="/login" /> },
    { path: "/signup", element: !authUser ? <SignUp /> : <Navigate to="/login" /> },
    { path: "/login", element: !authUser ? <LogIn /> : <Navigate to="/chat" /> },
    { path: "/profile", element: authUser ? <Profile /> : <Navigate to="/login" /> },
    { path: "/settings", element: authUser ? <Settings /> : <Navigate to="/login" /> },
  ];

  return (
    <div className="" data-theme={theme}>
      <Navbar />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

