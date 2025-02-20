import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { authUser, setAuthUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr(false);
    setPasswordErr(false);

    // Email validation
    if (!email.includes("@gmail.com")) {
      setEmailErr(true);
      return;
    }

    // Password validation
    if (password.length < 6) {
      setPasswordErr(true);
      return;
    }

    try {
      const response = await axios.post("/api/api/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      toast.success("Login successful!");

      // Store token in local storage (if backend sends token)
      if (response.data) {
        localStorage.setItem("messanger", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-4">
            Login to Your Account
          </h1>

          {/* Email */}
          <div className="mb-4">
            <input
              className="w-full p-2 border border-slate-300 rounded-lg"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {emailErr && (
              <span className="text-red-500 text-sm">Please enter a valid Gmail address.</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              className="w-full p-2 border border-slate-300 rounded-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {passwordErr && (
              <span className="text-red-500 text-sm">Password must be at least 6 characters.</span>
            )}
          </div>

          {/* Submit */}
          <div className="mb-4">
            <input
              type="submit"
              value="Log in"
              className="w-full p-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-800"
            />
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
