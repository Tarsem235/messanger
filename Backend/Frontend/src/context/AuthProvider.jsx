import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const initialUserState = Cookies.get("jwt") || localStorage.getItem("messanger");

  let parsedUser = null;
  try {
    parsedUser = initialUserState ? JSON.parse(initialUserState) : null;
  } catch (error) {
    console.error("Failed to parse user data:", error);
  }

  const [authUser, setAuthUser] = useState(parsedUser);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
