import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  const handleUser = () => {
    setSelectedConversation(user);
  };

  return (
    <div
      onClick={handleUser}
      className={`flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      } rounded-xl mx-2 my-1`}
    >
      {/* Avatar Section */}
      <div className="relative">
        <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
              alt="User"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
            />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
      </div>

      {/* Name & Email */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-gray-900">{user.name}</span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
    </div>
  );
}

export default User;
