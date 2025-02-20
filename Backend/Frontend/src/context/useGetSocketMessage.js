import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../statemanage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    // Listen for new messages from the socket
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play()
      setMessage([...messages , newMessage]);  // Update state based on previous state
    });

    // Cleanup socket on component unmount
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages , setMessage]); // Remove messages from dependency array

};

export default useGetSocketMessage;
