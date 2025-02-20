import React from "react";
import Search from "./Search.jsx";
import Users from "./Users.jsx";
import Logout from "../left1/Logout.jsx";
import useConversation from "../../statemanage/useConversation.js";

function Left() {
  const { selectedConversation } = useConversation(); // Using selectedConversation from context

  return (
    <>
      {/* Left Panel */}
      <div
        className={`  absolute left-0 top-0 bottom-0 right-0 md:ml-12  md:w-[28%]  bg-white text-black border md:rounded-tl-xl border-slate-300 h-screen ${
          selectedConversation ? "hidden md:block" : ""
        }`}
      >
        {/* Messenger Title */}
        <h1 className="font-bold px-5 text-2xl sm:text-3xl mt-6 md:px-1 text-green-500">
          Messenger
        </h1>

        {/* Search and Users Components */}
        <Search />
        <Users />

        {/* Placeholder for additional content */}
        <div className="flex-1 overflow-y-auto">
          {/* Additional content can go here */}
        </div>
      </div>
    </>
  );
}

export default Left;
