import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase/firebase.init";

// Initialize Firebase Auth
const auth = getAuth(app);

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false); // Track if page is scrolled to shrink navbar
  const [activeSection, setActiveSection] = useState("home"); // Track active section on home page
  const [scrollToSectionId, setScrollToSectionId] = useState(null); // Track section to scroll to after navigation
  const { user } = useContext(AuthContext); // Get current user from Auth Context

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/"; // Check if current page is Home

  // Shrink navbar on scroll (only on home page)
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Observe sections on home page to highlight active nav link
  useEffect(() => {
    if (!isHome) return;
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }),
      { threshold: 0.4 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, [isHome]);

  // Scroll to a specific section after navigation
  useEffect(() => {
    if (isHome && scrollToSectionId) {
      scrollToSection(scrollToSectionId);
      setScrollToSectionId(null); // Reset after scrolling
    }
  }, [isHome, scrollToSectionId]);

  // Logout function
  const handleLogout = () => signOut(auth).catch(console.error);

  // Scroll smoothly to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = isScrolled ? 56 : 80; // Adjust for navbar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scroll to top of home page
  const scrollToTop = () => {
    const sliderElement = document.getElementById("home");
    if (sliderElement) {
      sliderElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Slider section not found!");
    }
  };

  // Determine classes for nav links
  const navLinkClass = (id, path) =>
    isHome
      ? "px-3 py-1 rounded transition " +
        (activeSection === id
          ? "font-bold underline underline-offset-4 "
          : "hover:bg-gray-200/20 ")
      : ({ isActive }) =>
          "px-3 py-1 rounded transition " +
          (isActive
            ? "font-bold underline underline-offset-4 "
            : "hover:bg-gray-200/20 ");

  // Determine navbar background and height based on scroll
  const navBg = isHome
    ? isScrolled
      ? "bg-black/50 h-14"
      : "bg-black/0 h-20"
    : "bg-black/50 h-14";

  // All navbar items
  const navItems = (
    <>
      {/* Home link */}
      <li>
        <NavLink
          to="/"
          className={navLinkClass("home", "/")}
          onClick={(e) => {
            e.preventDefault();
            if (isHome) {
              scrollToTop(); // Scroll to the slider
            } else {
              navigate("/");
              setScrollToSectionId("home"); // Set section to scroll to after navigation
            }
          }}
        >
          Home
        </NavLink>
      </li>

      {/* All Tourist Spot section link */}
      <li>
        <NavLink
          to="/"
          className={navLinkClass("all-tourist-spot", "/")}
          onClick={(e) => {
            e.preventDefault();
            if (isHome) {
              scrollToSection("all-tourist-spot");
            } else {
              navigate("/");
              setScrollToSectionId("all-tourist-spot"); // Set section to scroll to after navigation
            }
          }}
        >
          All Tourist Spot
        </NavLink>
      </li>

      {/* Add Tourist Spot page link */}
      <li>
        <NavLink
          to="/addtouristsspot"
          className={navLinkClass("addtouristsspot", "/addtouristsspot")}
        >
          Add Tourist Spot
        </NavLink>
      </li>

      {/* Country section link */}
      <li>
        <NavLink
          to="/"
          className={navLinkClass("country", "/")}
          onClick={(e) => {
            e.preventDefault();
            if (isHome) {
              scrollToSection("country");
            } else {
              navigate("/");
              setScrollToSectionId("country"); // Set section to scroll to after navigation
            }
          }}
        >
          Country
        </NavLink>
      </li>

      {/* Protected My List page link */}
      {user && (
        <li>
          <NavLink to="/mylist" className={navLinkClass("mylist", "/mylist")}>
            My List
          </NavLink>
        </li>
      )}

      {/* Protected Add Country page link */}
      {user && (
        <li>
          <NavLink
            to="/addcountry"
            className={navLinkClass("AddCountry", "/addcountry")}
          >
            Add Country
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-sm ${navBg}`}
    >
      <div className="navbar max-w-7xl mx-auto px-4 transition-all duration-300">
        {/* Navbar start: logo + mobile dropdown */}
        <div className="navbar-start flex items-center">
          {/* Mobile menu dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="ml-2"
            onClick={(e) => {
              e.preventDefault();
              if (isHome) {
                scrollToTop();
              } else {
                navigate("/");
                setScrollToSectionId("home"); // Set section to scroll to after navigation
              }
            }}
          >
            <img
              src="https://i.ibb.co.com/cSvdsXcw/logo.png"
              alt="Logo"
              className="transition-all duration-300"
            />
          </Link>
        </div>

        {/* Navbar center: desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 text-white">
            {navItems}
          </ul>
        </div>

        {/* Navbar end: login/logout */}
        <div className="navbar-end">
          {!user ? (
            // Login button for guests
            <Link
              to="/login"
              className="btn border-none hover:bg-gray-900 hover:text-white font-bold sm:btn-sm"
            >
              Login
            </Link>
          ) : (
            // User dropdown when logged in
            <div className="dropdown dropdown-end relative">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer"
              >
                {user.photoURL ? (
                  // Display profile photo if available
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full border-2 border-green-400"
                  />
                ) : (
                  // Otherwise display user name/email
                  <span className="font-bold text-white truncate">
                    {user.displayName || user.email}
                  </span>
                )}
              </div>

              {/* Dropdown menu for logout */}
              <ul className="dropdown-content menu p-3 shadow bg-base-100 rounded-box min-w-52 right-0 absolute z-50">
                <li>
                  <span className="font-bold break-words whitespace-normal block max-w-xs">
                    {user.displayName || user.email}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
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