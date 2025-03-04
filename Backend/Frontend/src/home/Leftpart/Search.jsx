import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../statemanage/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    // Search for the user based on the name
    const conversation = allUsers.find((user) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
    );

    // If conversation is found, set it and clear the search
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // Clear the search
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[12vh] sm:h-[10vh] lg:h-[10vh]">
      <div className="ml-3 py-7">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className="border-[2px] border-gray-200 border-b-green-500 bg-white lg:rounded-xl rounded-full p-1 flex items-center h-10 gap-2 w-screen">
              <input
                type="text"
                className="grow outline-none bg-transparent"
                placeholder="   Search or start a new chat"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search state on input change
              />
            </label>
            <button type="submit">
              <FaSearch className="text-4xl p-2 hover:bg-gray-600 rounded-full duration-300 ml-[-1.2cm] h-8 w-8" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
