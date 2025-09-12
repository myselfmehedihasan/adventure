import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
// ✅ use react-router-dom for navigation inside React SPA

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);

  // detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Your reusable nav items
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/alltouristsspot">All Tourists Spot</NavLink>
      </li>
      <li>
        <NavLink to="/addtouristsspot">Add Tourists Spot</NavLink>
      </li>
      <li>
        <NavLink to="/mylist">My List</NavLink>
      </li>
    </>
  );

  return (
    // ✅ Make navbar fixed at top, transparent, always above hero (z-50)
    <div className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300  ${
        isScrolled ? "bg-black/50" : "bg-black/40"
      } backdrop-blur-sm`}>
      {/* ✅ Centered container, text color white so visible on hero */}
      <div className="navbar max-w-7xl mx-auto ">
        {/* ✅ Navbar Start (Logo + Mobile Menu) */}
        <div className="navbar-start">
          {/* Mobile Dropdown Menu */}
          <div className="dropdown">
            {/* Mobile hamburger icon */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* ✅ Mobile dropdown menu items */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-content rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {navItems}
              {/* Extra links only for mobile */}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>

          {/* ✅ Logo (changed from <a> → <Link>) */}
          <Link to="/">
            <img src="/src/assets/logo.png" alt="Logo"  />
          </Link>
        </div>

        {/* ✅ Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 text-white">
            {navItems}
            {/* Conditional login/register will go here */}
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm">
              Register
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
