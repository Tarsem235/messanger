import React, { useState } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

import Search from "./Search.jsx";
import Users from "./Users.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  // const [show, setShow] = useState(true); // Manage chat visibility

  // const showClick = () => {
  //   setShow(prevShow => !prevShow); // Toggle visibility of chat components
  // };

  const handleUser = () => {
    setSelectedConversation(user); 
    // Set the selected user as the active conversation
    // setShow(true); // Ensure chat components are shown when a user is selected
  };

  return (
    <div
      className={`hover:bg-gradient-to-r from-pink-400 to purple-400 duration-300 ${isSelected ? "bg-slate-900" : ""}`}
      onClick={handleUser} // Handle user selection
    >
      {/* Show chat components only if show is true and a selected conversation exists */}
      

      {/* Show the user list section or other UI when show is false */}
      
        <div
          className="flex  space-x-4 px-8 py-3 hover:bg-slate-100 cursor-pointer"
          // onClick={showClick} // Toggle chat components visibility when clicked
        >
          <div className="relative ">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                className="w-12 h-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
                alt="User Avatar"
              />
            </div>
            <div
              className={`absolute bottom-1 right-0 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-500" : "bg-gray-500"
              }`}
            ></div>
          </div>

          <div>
            <p className="text-white font-bold text-1 sm:text-base">{user.name}</p>
            <p className="text-gray-100 text-1 mt-[-2px] sm:text-1">{user.email}</p>
          </div>
        </div>
    </div>
  );
}

export default User;
