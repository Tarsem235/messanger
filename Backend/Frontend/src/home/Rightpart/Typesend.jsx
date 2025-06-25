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
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 right-0 w-full lg:w-[72%] bg-white px-4 py-3 border-t border-gray-200 z-10"
    >
      <div className="flex items-center rounded-full bg-gray-100 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-pink-400">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
        />
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
