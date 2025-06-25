import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import useConversation from "../../statemanage/useConversation.js";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider.jsx";

function Logout() {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();
  const [show, setShow] = useState(false);

  const showDetails = () => setShow((prev) => !prev);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/api/logout");
      localStorage.removeItem("messanger");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <>
      {/* Sidebar Avatar */}
      <div className="absolute top-3 left-1 z-50 hidden lg:flex">
        <img
          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt="User Avatar"
          onClick={showDetails}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      {/* User Info Popup */}
      {show && (
        <div className="absolute top-16 left-4 bg-white shadow-lg rounded-2xl border border-gray-200 w-72 p-5 z-50 animate-fade-in">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
            alt="User"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          />
          <h1 className="text-center text-lg font-semibold text-gray-800">
            {authUser?.user?.name}
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            {authUser?.user?.email}
          </p>
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold border border-gray-300 px-5 py-2 rounded-lg hover:scale-105 transition-transform"
            >
              {loading ? "Logging out..." : "Log Out"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
