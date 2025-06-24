import React from "react";
import Search from "./Search.jsx";
import Users from "./Users.jsx";
import useConversation from "../../statemanage/useConversation.js";
function Left() {
  const { selectedConversation } = useConversation(); 
  return (
    <>
      <div
        className={`fixed inset-0 md:ml-12 md:w-1/4 bg-black text-white font-bold  border border-slate-300 h-screen transition-transform duration-300 ${
          selectedConversation ? "transform -translate-x-full md:translate-x-0" : ""
        }`}
      >
        <Search />
        <Users />
        <div className="flex-1 overflow-y-auto">
        </div>
      </div>
    </>
  );
}

export default Left;