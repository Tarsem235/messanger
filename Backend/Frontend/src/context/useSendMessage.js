import React, { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios"
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {


    setLoading(true);
    try {
      
      const res = await axios.post(`/api/message/send/${selectedConversation._id}`, {  message
    });
      setMessage([...messages,res.data]);  // Add the new message to state
      setLoading(false);  
    } catch (error) {
      console.error("Error sending message:", error); 
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
