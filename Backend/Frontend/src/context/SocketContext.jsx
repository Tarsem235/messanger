import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider"; // Ensure this import is correct
import io from "socket.io-client";

const socketContext = createContext();

// Custom hook to use socket context
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth(); // Get the authUser from the context
  
  useEffect(() => {
    if (authUser) {
      const socket = io("https://messanger-v0g3.onrender.com",{
        query: { userId: authUser.user._id }
      });
      setSocket(socket);
      console.log("Socket connected:", socket); // Check the socket connection
  
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("Received online users: ", users);
      });
  
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        console.log("Socket disconnected due to no authUser");
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
