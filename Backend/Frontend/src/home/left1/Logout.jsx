import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import useConversation from "../../statemanage/useConversation.js";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider.jsx"; 
function Logout() {
    const { authUser } = useAuth(); 
    console.log(authUser)
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();
  const [show, setShow] = useState(false);

  const showDetails = () => {
    setShow((prevState) => !prevState);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/api/logout");
      localStorage.removeItem("messanger");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-[3.5%] md:h-screen bg:white  md:bg-slate-100 text-black flex flex-col justify-start items-center pt-4 lg:block z-50">
        {/* Avatar Image */}
        <div className="relative">
          <img
            className="absolute  left-1.5  w-10 h-10  object-cover rounded-full cursor-pointer"
            src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
            alt="User Avatar"
            onClick={showDetails}
          />
          {show && (
            <div className="absolute top-30 left-13 bg-white p-2 shadow-2xl border border-gray-200 rounded-md h-[370px] lg:h-[400px]  w-[280px] sm:w-[350px] transform transition-all duration-300 ease-in-out opacity-100 animate-slide-up">
              <img
                className="w-30 mt-10 object-cover rounded-full mx-auto justify-end"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
                alt="User Avatar"
              />
         <h1 className="text-center text-xl lg:text-2xl mt-5" >{`***${authUser.user.name}***`}</h1>
         <h1 className="text-center text-md lg:text-xl text-gray-300" >{`***${authUser.user.email}***`}</h1>
         <div className="text-center mt-10">
  <button 
    onClick={handleLogout} 
    className="bg-white border border-gray-300 text-red-500 font-semibold py-2 px-9 rounded-lg shadow-md hover:bg-white transition duration-300 ease-in-out transform hover:scale-105"
  >
    Log Out
  </button>
</div>
  
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button onClick={showDetails} className="mt-10 w-10 absolute top-[-22px] left-90">
          <img
            className="block lg:hidden  cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/128/8212/8212730.png"
            alt="Logout"
          />
        </button>
      </div>
    </>
  );
}

export default Logout;
