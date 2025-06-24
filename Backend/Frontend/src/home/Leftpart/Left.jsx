import React from "react";
import Search from "./Search.jsx";
import Users from "./Users.jsx";
import useConversation from "../../statemanage/useConversation.js";

function Left() {
  const { selectedConversation } = useConversation(); 
  return (
    <>
      <div
        className={`fixed inset-0 md:ml-12 md:w-1/4 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white font-semibold border-r border-slate-700 shadow-lg h-screen transition-transform duration-300 z-30 ${
          selectedConversation ? "transform -translate-x-full md:translate-x-0" : ""
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold italic text-green-400 tracking-wide">
            Messenger
          </h1>
        </div>

        <div className="px-4 py-3 border-b border-gray-700">
          <Search />
        </div>

        <div className="px-4 py-3 flex-1 overflow-y-auto">
          <Users />
        </div>
      </div>
    </>
  );
}

export default Left;
