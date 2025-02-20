import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem('messanger')); // Assuming 'messanger' holds the user data
  const itsMe = String(message.senderId) === String(authUser.user._id); // Check if it's the current user
  
  // Determine alignment and color based on message sender
  const chatName = itsMe ? "justify-end" : "justify-start"; // Align chat to the right (sent) or left (received)
  const chatColor = itsMe ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white" : "bg-gradient-to-r from-gray-300 to-gray-200 text-black"; // Sent: gradient blue, Received: gradient gray

  // Format timestamp to show only hours and minutes
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 ">
      <div className={`flex ${chatName} items-start mb-4   `}>
        {/* Message bubble with gradient, rounded corners, shadow and tail */}
        <div
          className={`chat-bubble ${chatColor} w-auto rounded-lg p-2 pr-11 h-10 shadow-xl relative`}

        >
          <span className="block ">{message.message}</span>
          
          {/* Tail */}
          <span className="absolute -bottom-2 left-4 w-4 h-4 bg-white transform rotate-45 shadow-md"></span>
          
          {/* Timestamp - positioned at bottom-right within the message bubble */}
          <span className="text-xs text-gray-700 absolute bottom-3 right-2 " >
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Message;
