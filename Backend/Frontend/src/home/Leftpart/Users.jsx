import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";
function Users() {
  const [allUsers, loading] = useGetAllUsers(); // destructuring the data from the custom hook

  if (loading) {
    return <p className="mt-5">Loading...</p>; // show loading message until data is fetched
  }

  return (
    <div>
      <h1 className=" mt-[-13px] sm:mt-5 lg:mt-2 h-8 px-7 py-1 text-black font-semibold bg-slate-300 rounded-md">
        Messages
      </h1>
      <div
        className="py-1 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(88vh - 10vh)" }}
      >
        {allUsers.map((user, index) => {
          console.log(user.name)
          return <User key={index} user={user} />;
        })}
      </div>
    </div>
  );
}

export default Users;
