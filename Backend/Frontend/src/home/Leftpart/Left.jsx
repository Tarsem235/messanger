import React from "react";
import Search from "./Search.jsx";
import Users from "./Users.jsx";
import useConversation from "../../statemanage/useConversation.js";
function Left() {
  const { selectedConversation } = useConversation(); 
  return (
    <>
      <div
        className={`fixed inset-0 md:ml-12 md:w-1/4 bg-white text-black border border-slate-300 h-screen transition-transform duration-300 ${
          selectedConversation ? "transform -translate-x-full md:translate-x-0" : ""
        }`}
      >
        <h1 className="font-bold px-5  italic text-2xl sm:text-3xl mt-6 md:px-5 text-green-500">
          Messenger 
        </h1>
        <Search />
        <Users />
        <div className="flex-1 overflow-y-auto">
        </div>
      </div>
    </>
  );
}

export default Left;