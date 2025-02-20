import React, { useState } from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { Link } from "react-router-dom";
import Search from "../Leftpart/Search.jsx";
import Users from "../Leftpart/Users.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const [show, setShow] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(false); // State to control Left component visibility

  // Toggle user details visibility on click
  const handleClick = () => {
    setShow((prevState) => !prevState);
  };

  // Handle toggle of Left component (show/hide when back button is clicked)
  const handleLeftToggle = () => {
    setIsLeftVisible((prevState) => !prevState);
  };

  // Get the online status of a user
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="pl-5 pt-2 h-[12vh] flex space-x-4 border border-slate-100 bg-white hover:bg-gray-300 w-full duration-300">
      <div className="relative">
        {/* Popup with user details for small screens */}
        {show && (
          <div className="absolute top-20 bg-white p-2 border border-gray-200 shadow-lg rounded-md w-[250px] sm:w-[300px] h-[250px] transform transition-all duration-300 ease-in-out opacity-100 animate-slide-in">
            <img
              className="w-20 object-cover rounded-full mx-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
              alt="User Avatar"
            />
            <p className="text-xl text-center mt-5">{selectedConversation.name}</p>
            <p className="text-sm text-gray-500 text-center mt-2">
              {getOnlineUsersStatus(selectedConversation._id)}
            </p>
          </div>
        )}

        {/* Back button (toggle Left component visibility) */}
        <Link to="/left">
        <img
          className="w-5 md:hidden pt-4 ml-[-15px] cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/128/3114/3114883.png"
          alt="Toggle Left Sidebar"
          onClick={handleLeftToggle} // Toggle Left component on click
        />
        </Link>

      

        {/* User Avatar */}
        <div
          className="mt-[-30px] ml-4 sm:ml-3 md:mt-1 rounded-full overflow-hidden cursor-pointer"
          onClick={handleClick}
        >
          <img
            className="w-11 sm:w-12 object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
            alt="User Avatar"
          />
        </div>

        {/* Online status indicator */}
        <div
          className={`absolute bottom-4
             sm:bottom-3 lg:bottom-4 right-0 w-3 h-3 rounded-full border-2 border-white ${
            getOnlineUsersStatus(selectedConversation._id) === "Online"
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
        ></div>
      </div>

      <div>
        {/* User Name */}
        <h2
          onClick={handleClick}
          className="text-10 sm:text-xl cursor-pointer mt-1"
        >
          {selectedConversation.name}
        </h2>
        <span className="text-sm text-gray-400">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
