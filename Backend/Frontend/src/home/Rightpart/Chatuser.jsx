import React, { useState } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { Link } from "react-router-dom";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow((prev) => !prev);

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          {/* Back button for mobile */}
          <Link to="/left" className="block md:hidden">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3114/3114883.png"
              alt="Back"
              className="w-5 h-5"
            />
          </Link>

          {/* Avatar with online status dot */}
          <div className="relative cursor-pointer" onClick={handleClick}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
              alt="User"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                getOnlineUsersStatus(selectedConversation._id) === "Online"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></span>
          </div>

          {/* Name and status */}
          <div onClick={handleClick} className="cursor-pointer">
            <h2 className="text-base font-semibold text-gray-800">
              {selectedConversation.name}
            </h2>
            <span className="text-xs text-gray-500">
              {getOnlineUsersStatus(selectedConversation._id)}
            </span>
          </div>
        </div>
      </div>

      {/* User Detail Popup */}
      {show && (
        <div className="absolute top-20 left-4 bg-white shadow-lg border rounded-xl p-4 w-64 z-50 animate-fade-in">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
            alt="User"
            className="w-20 h-20 mx-auto rounded-full object-cover"
          />
          <p className="text-center mt-3 font-medium text-gray-800">
            {selectedConversation.name}
          </p>
          <p className="text-center text-sm text-gray-500 mt-1">
            {getOnlineUsersStatus(selectedConversation._id)}
          </p>
        </div>
      )}
    </>
  );
}

export default Chatuser;
