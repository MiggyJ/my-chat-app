import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import PreloaderScreen from "./components/PreloaderScreen";
import { SocketContext } from "./context/SocketContext";



export default function App() {
  const socket = useContext(SocketContext)
  const { username, getUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = localStorage.getItem('authenticated')
      if (authenticated)
        getUser()
    }
    checkAuth()
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  useEffect(() => {
    if (username)
      socket.emit('user-session', username)
  }, [username])

  return (
    <>
      {
        loading
          ? <PreloaderScreen />
          : username === ''
            ? <AuthPage />
            : <ChatPage />
      }
    </>
  );
}
