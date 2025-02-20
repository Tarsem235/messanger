import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const { authUser, setAuthUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmpasswordErr, setConfirmpasswordErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (name.length < 4) {
      setNameErr(true);
      isValid = false;
    } else {
      setNameErr(false);
    }

    if (email.trim() === "") {
      setEmailErr(true);
      isValid = false;
    } else {
      setEmailErr(false);
    }

    if (password.length < 6) {
      setPasswordErr(true);
      isValid = false;
    } else {
      setPasswordErr(false);
    }

    if (confirmpassword !== password) {
      setConfirmpasswordErr(true);
      isValid = false;
    } else {
      setConfirmpasswordErr(false);
    }

    const userInfo = {
      name,
      email,
      password,
      confirmpassword
    };
    try {
      const data = await axios.post("/api/api/signup", userInfo);
      console.log("Response:", data);
      if (userInfo) {
        alert('Signup Successfully.....');
      }
      localStorage.setItem("Messanger", JSON.stringify(userInfo));
      setAuthUser(userInfo);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert('Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl text-blue-600 font-semibold mb-4 text-center">
            Create a new Account
          </h1>
          <p className="text-center text-gray-600 mb-4">
            It's free and always will be.
          </p>

          {/* Name */}
          <div className="mb-4">
            <input
              className="w-full p-2 border border-slate-300 rounded-lg"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />
            {nameErr && (
              <span className="text-red-500 text-sm">Name must be at least 4 characters long.</span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              className="w-full p-2 border border-slate-300 rounded-lg"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {emailErr && <span className="text-red-500 text-sm">Please enter a valid email.</span>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              className="w-full p-2 border border-slate-300 rounded-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {passwordErr && (
              <span className="text-red-500 text-sm">Password must be at least 6 characters long.</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <input
              className="w-full p-2 border border-slate-300 rounded-lg"
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Confirm Password"
            />
            {confirmpasswordErr && <span className="text-red-500 text-sm">Passwords do not match.</span>}
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <input
              type="submit"
              value="Sign Up"
              className="w-full p-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-800"
            />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
