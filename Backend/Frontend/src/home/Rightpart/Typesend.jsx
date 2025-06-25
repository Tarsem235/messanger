// Typesend.js
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessages(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bottom-0 right-0 border-[1px] border-white border-t-pink-500 border-l-gray-200 w-full  lg:w-[71.5%] px-4 py-3 bg-white ">
      <div className="flex items-center space-x-3 rounded-full">
         <div className="flex items-center rounded-full bg-white px-4 py-2 shadow-sm ">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className= " w-xl flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 absolute right-7 border-2"
        />
        </div>
          <button
          type="submit"
          disabled={loading || !message.trim()}
          className="ml-2 text-pink-500 hover:text-pink-600 transition-colors duration-200"
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
