import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("messanger"));
  const itsMe = String(message.senderId) === String(authUser.user._id);

  // Alignments and styles
  const alignment = itsMe ? "justify-end" : "justify-start";
  const bubbleColor = itsMe
    ? "bg-gradient-to-br from-pink-500 to-rose-400 text-white"
    : "bg-gray-100 text-gray-900";

  // Format time (e.g., 10:25 AM)
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${alignment} px-4 py-1`}>
      <div className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2 shadow-md ${bubbleColor}`}>
        <p className="text-sm leading-snug break-words">{message.message}</p>
        <span
          className={`text-[10px] mt-1 block text-right ${
            itsMe ? "text-white/70" : "text-gray-500"
          }`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
}

export default Message;
