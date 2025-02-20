import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true); // Start loading
      try {
        const token = Cookies.get("jwt"); // Get JWT token from cookies
       

      
        const response = await axios.get("/api/api/getUserProfile", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
          credentials: true, // Ensure credentials are included in the request (if needed)
        });

        // Update state with the fetched data
        setAllUsers(response.data);
      } catch (error) {
        // Handle the error
        console.error("Error in useGetAllUsers:", error.message || error);
      } finally {
        // Set loading to false whether the request succeeds or fails
        setLoading(false);
      }
    };

    getUsers(); // Call the function to fetch users
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return [allUsers, loading]; // Return the users and loading state
}

export default useGetAllUsers;
