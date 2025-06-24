import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider"; 
import io from "socket.io-client";

// Create context
const socketContext = createContext();
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      // ✅ Use a different variable name
      const newSocket = io("https://messanger-v0g3.onrender.com", {
        query: { userId: authUser.user._id }
      });

      setSocket(newSocket);
      console.log("Socket connected:", newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("Received online users: ", users);
      });

      return () => {
        newSocket.close();
        console.log("Socket closed");
      };
    } else {
      // Cleanup if user logs out
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
