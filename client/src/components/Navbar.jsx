import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white relative">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-5">
          <Link to="/"><div className="text-2xl font-bold">
            Noteflux<sup className="text-sm">®</sup>
          </div></Link>

          <ul className="hidden md:flex gap-6 text-md font-medium tracking-tighter leading-snug">
            <li>
              <a href="#home" className="text-[#898989] hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#blogs" className="text-[#898989] hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="#about" className="text-[#898989] hover:text-white">
                Create Post
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Hamburger on Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ✅ Mobile Menu With Smooth Animation */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden absolute top-full left-0 w-full bg-black z-50 text-center px-6 ${
          isOpen
            ? "max-h-60 opacity-100 py-4 border-t border-gray-800"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <a
          href="#home"
          className="block text-[#898989] hover:text-gray-300 mb-3"
        >
          Home
        </a>
        <a
          href="#blogs"
          className="block text-[#898989] hover:text-gray-300 mb-3"
        >
          Blogs
        </a>
        <a
          href="#about"
          className="block text-[#898989] hover:text-gray-300"
        >
          Create Post
        </a>
      </div>
    </header>
  );
}

export default Navbar;
