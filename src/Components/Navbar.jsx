import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase/firebase.init";

// Initialize Firebase Auth
const auth = getAuth(app);

const Navbar = () => {
  // State for scroll background
  const [isScrolled, setScrolled] = useState(false);

  // Get user from context
  const { user } = useContext(AuthContext);

  // Get current route
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Scroll effect (only for home)
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Logout handler
  const handleLogout = () => {
    signOut(auth).catch(console.error);
  };

  // Navigation items with active highlighting
 const navLinkClass =
  ({ isActive }) =>
    "px-3 py-1 rounded transition " +
    (isActive ? "font-bold underline underline-offset-4 " : "hover:bg-gray-200/20 ") ;

const navItems = (
  <>
    <li>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/alltouristsspot" className={navLinkClass}>
        All Tourists Spot
      </NavLink>
    </li>
    <li>
      <NavLink to="/addtouristsspot" className={navLinkClass}>
        Add Tourists Spot
      </NavLink>
    </li>
    <li>
      <NavLink to="/mylist" className={navLinkClass}>
        My List
      </NavLink>
    </li>
  </>
);

  // Set background: transparent on home (until scrolled), black/50 elsewhere
  const navBg = isHome
    ? isScrolled
      ? "bg-black/50"
      : "bg-black/0"
    : "bg-black/50";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 backdrop-blur-sm ${navBg}`}
    >
      <div className="navbar max-w-7xl mx-auto transition-colors duration-300">
        {/* Navbar start: logo and mobile dropdown */}
        <div className="navbar-start">
          {/* Dropdown for mobile view */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
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
            {/* Dropdown menu for mobile */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          {/* Logo */}
          <Link to="/">
            <img src="/src/assets/logo.png" alt="Logo" />
          </Link>
        </div>
        {/* Navbar center: menu for large screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 text-white">
            {navItems}
          </ul>
        </div>
        {/* Navbar end: Auth Buttons or User Avatar */}
        <div className="navbar-end">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-sm sm:btn-sm mr-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm">
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown  dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer relative"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full border-2 border-green-400"
                  />
                ) : (
                  <span className="font-bold text-white">
                    {user.displayName || user.email}
                  </span>
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 transition-all duration-200 "
              >
                <li>
                  <span className="font-bold text-center ">
                    {user.displayName || user.email}
                  </span>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;