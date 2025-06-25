import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Logout from "./home/left1/Logout";
function AppRoutes() {
  const { authUser } = useAuth(); // Only get authUser since you're not setting it here
  console.log(authUser)
  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex ">
              <Logout />
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" />  // Redirect to login if not authenticated
          )
        }
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />} // Redirect to home if logged in
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />} // Redirect to home if already signed in
      />
      <Route
        path="/left"
        element={authUser ? <Navigate to="/" /> : <Left />} // Redirect to home if logged in
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
