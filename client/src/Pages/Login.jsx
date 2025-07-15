import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
        <Link to="/"><div className="text-2xl font-bold px-6 py-4 bg-black text-white">
        Noteflux<sup className="text-sm">®</sup>
      </div></Link>

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
          <form className="w-full max-w-xs mx-auto space-y-5">
            <div className="text-left space-y-1">
              <label className="text-sm text-[#898989]">Username</label>
              <input
                type="text"
                placeholder="janesmith"
                className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none"
              />
            </div>

            <div className="text-left space-y-1">
              <label className="text-sm text-[#898989]">Password</label>
              <input
                type="password"
                placeholder="Your password"
                className="w-full px-4 py-3 bg-[#1c1c1c] text-white rounded-md focus:outline-none"
              />
            </div>

            <div className="text-sm text-[#898989] text-left">
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:underline">
                Register here
              </Link>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition"
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
