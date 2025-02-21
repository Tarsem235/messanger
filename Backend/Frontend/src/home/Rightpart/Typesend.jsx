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
    <form onSubmit={handleSubmit} className="fixed bottom-0 right-0 border-[1px] border-white border-t-green-500 border-l-gray-200 w-full  lg:w-[71.5%] px-4 py-3 bg-white ">
      <div className="flex items-center space-x-3 rounded-full">
        <div className="w-full">
          <input
            type="text"
            placeholder="   Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full py-2 px-4 rounded-full lg:rounded-lg bg-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
  type="submit"
  disabled={loading}
  className="p-2 bg-transparent text-white ml-[-50px] rounded-full hover:bg-green-500 transition duration-300 zoom-in-out"
>
          <IoSend className="text-xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
