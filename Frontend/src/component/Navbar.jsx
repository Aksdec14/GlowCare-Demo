// src/components/Navbar.jsx

import React, { useState } from "react";
import logo from '../assets/images/logo-svg.svg'; // Ensure this path is correct

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
          <img src={logo} alt="Site Logo" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold">GlowCare</span>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li>
            <button onClick={() => scrollToSection("home")} className="hover:text-gray-200">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("about")} className="hover:text-gray-200">
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("services")} className="hover:text-gray-200">
              Services
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("contact")} className="hover:text-gray-200">
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 p-4 space-y-4">
          <button onClick={() => scrollToSection("home")} className="block w-full text-left hover:text-gray-200">
            Home
          </button>
          <button onClick={() => scrollToSection("about")} className="block w-full text-left hover:text-gray-200">
            About
          </button>
          <button onClick={() => scrollToSection("services")} className="block w-full text-left hover:text-gray-200">
            Services
          </button>
          <button onClick={() => scrollToSection("contact")} className="block w-full text-left hover:text-gray-200">
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
