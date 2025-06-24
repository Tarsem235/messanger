import React from "react";
import Search from "./Search.jsx";
import Users from "./Users.jsx";
import useConversation from "../../statemanage/useConversation.js";

function Left() {
  const { selectedConversation } = useConversation(); 
  return (
    <>
      <div
        className={`fixed inset-0 md:ml-12 md:w-1/4 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white font-semibold border-r border-gray-700 shadow-xl h-screen transition-transform duration-300 z-30 ${
          selectedConversation ? "transform -translate-x-full md:translate-x-0" : ""
        }`}
      >
        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-gray-700">
          <Search />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          <Users />
        </div>
      </div>
    </>
  );
}

export default Left;
