import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../utils/UserContext"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {setUserLogged,setUserId} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!username.trim()) validationErrors.username = "Username is required.";
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post(
          "https://noteflux.onrender.com/api/auth/login",
          { username, password },
          { withCredentials: true }
        );
        // console.log(res)
        if (res.status === 200) {
          
          setUserLogged(true)
          localStorage.setItem("userLogged","true")
          setUserId(()=>{
            // return localStorage.setItem("userId",)
          })
        
          navigate("/");
        }
      } catch (err) {
        if (err.response?.data?.message) {
          setErrors({ server: err.response.data.message });
        } else {
          console.error("Login error:", err);
        }
      }
    }
  };

  return (
    <>
      <Link to="/">
        <div className="text-2xl font-bold px-6 py-4 bg-black text-white">
          Noteflux<sup className="text-sm">®</sup>
        </div>
      </Link>

      <section className="min-h-[90vh] flex items-center justify-center bg-black px-4">
        <div className="w-full flex flex-col items-center text-white text-center space-y-8">
          {/* Heading Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight whitespace-nowrap">
              Sign in to Noteflux
            </h1>
            <p className="text-[#898989] text-3xl font-bold leading-tight md:text-4xl tracking-tighter whitespace-nowrap">
              Access your notes and blogs
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto space-y-5">
            {/* Username */}
            <div className="text-left space-y-1">
              <label className="text-sm text-[#898989]">Username</label>
              <input
                type="text"
                placeholder="janesmith"
                className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="text-red-500 italic text-sm">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="text-left space-y-1">
              <label className="text-sm text-[#898989]">Password</label>
              <input
                type="password"
                placeholder="Your password"
                className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 italic text-sm">{errors.password}</p>
              )}
            </div>

            {/* Server Error */}
            {errors.server && (
              <p className="text-red-500 italic text-sm text-left">{errors.server}</p>
            )}

            {/* Register Redirect */}
            <div className="text-sm text-[#898989] text-left">
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:underline">
                Register here
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition"
            >
              Login
            </button>
            <div className="h-4"></div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
