import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!name.trim()) validationErrors.name = "Name is required.";
    if (!email.trim()) validationErrors.email = "Email is required.";
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
          "https://noteflux.onrender.com/api/auth/register",
          { name, email, username, password },
          { withCredentials: true }
        );

        if (res.status === 200) {
          navigate("/login");
        }
      } catch (err) {
        if (err.response?.data?.message) {
          setErrors({ server: err.response.data.message });
        } else {
          console.error("Registration error:", err);
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
          {/* Heading */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight whitespace-nowrap mt-10">
              Signup for Noteflux
            </h1>
            <p className="text-[#898989] text-3xl font-bold leading-tight md:text-4xl tracking-tighter whitespace-nowrap">
              Start your blogging journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-5">
            {/* Name */}
            <div className="text-left space-y-1">
              <label className="text-sm text-[#898989]">Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 italic text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="text-left space-y-1">
              <label className="text-sm text-[#898989]">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 italic text-sm">{errors.email}</p>
              )}
            </div>

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

            {/* Redirect to login */}
            <div className="text-sm text-[#898989] text-left">
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:underline">
                Login here
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition"
            >
              Register
            </button>
            <div className="h-4"></div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
