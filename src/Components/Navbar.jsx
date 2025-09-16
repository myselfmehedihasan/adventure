import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase/firebase.init";

// Initialize Firebase Auth
const auth = getAuth(app);

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false); // for shrinking navbar
  const [activeSection, setActiveSection] = useState("home"); // track section on home
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/"; // check if current page is Home

  // ------------------------------
  // Shrink navbar when scrolling on Home page
  // ------------------------------
  useEffect(() => {
    if (!isHome) return; // only run on Home
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // ------------------------------
  // Scroll spy (detect which section is in view on Home page)
  // ------------------------------
  useEffect(() => {
    if (!isHome) return; // only run on Home

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // update active section
          }
        });
      },
      { threshold: 0.6 } // trigger when 60% of section is visible
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, [isHome]);

  // ------------------------------
  // Logout
  // ------------------------------
  const handleLogout = () => signOut(auth).catch(console.error);

  // ------------------------------
  // Smooth scroll for sections
  // ------------------------------
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = isScrolled ? -56 : -80; // adjust for navbar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // ------------------------------
  // NavLink styling function
  // ------------------------------
  const navLinkClass = (id, path) => {
    if (isHome) {
      // On Home → active depends on scroll position
      return (
        "px-3 py-1 rounded transition " +
        (activeSection === id
          ? "font-bold underline underline-offset-4 "
          : "hover:bg-gray-200/20 ")
      );
    } else {
      // On other pages → use React Router's isActive
      return ({ isActive }) =>
        "px-3 py-1 rounded transition " +
        (isActive
          ? "font-bold underline underline-offset-4 "
          : "hover:bg-gray-200/20 ");
    }
  };

  // ------------------------------
  // Navbar background and height
  // ------------------------------
  const navBg = isHome
    ? isScrolled
      ? "bg-black/50 h-14"
      : "bg-black/0 h-20"
    : "bg-black/50 h-14";

  // ------------------------------
  // Navigation items
  // ------------------------------
  const navItems = (
    <>
      {/* Home link */}
      <li>
        <NavLink
          to="/"
          className={navLinkClass("home", "/")}
          onClick={(e) => {
            if (isHome) {
              // if already on Home → scroll smoothly
              e.preventDefault();
              scrollToSection("home");
            }
          }}
        >
          Home
        </NavLink>
      </li>

      {/* All Tourist Spot link */}
      <li>
        <NavLink
          to="/"
          className={navLinkClass("all-tourist-spot", "/")}
          onClick={(e) => {
            if (isHome) {
              // On Home → scroll to section
              e.preventDefault();
              scrollToSection("all-tourist-spot");
            } else {
              // On other page → navigate to Home first, then scroll
              e.preventDefault();
              navigate("/");
              setTimeout(() => scrollToSection("all-tourist-spot"), 200);
            }
          }}
        >
          All Tourist Spot
        </NavLink>
      </li>

      {/* Add Tourist Spot link */}
      <li>
        <NavLink
          to="/addtouristsspot"
          className={navLinkClass("addtouristsspot", "/addtouristsspot")}
        >
          Add Tourist Spot
        </NavLink>
      </li>

      {/* My List link */}
     {
      user && <>
       <li>
        <NavLink to="/mylist" className={navLinkClass("mylist", "/mylist")}>
          My List
        </NavLink>
      </li>
      </>
     }
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-sm ${navBg}`}
    >
      <div className="navbar max-w-7xl mx-auto px-4 transition-all duration-300">
        {/* ------------------------------ Navbar start: logo & mobile menu ------------------------------ */}
        <div className="navbar-start flex items-center">
          {/* Mobile menu */}
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
          <Link to="/" className="ml-2">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className={`transition-all duration-300`}
            />
          </Link>
        </div>

        {/* ------------------------------ Navbar center: desktop menu ------------------------------ */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 text-white">
            {navItems}
          </ul>
        </div>

        {/* ------------------------------ Navbar end: auth buttons / user avatar ------------------------------ */}
        <div className="navbar-end">
          {!user ? (
            <>
              <Link to="/login" className="btn border-none  hover:bg-gray-900 hover:text-white font-bold  sm:btn-sm ">
                Login
              </Link>
              
            </>
          ) : (
            <div className="dropdown dropdown-end relative">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full border-2 border-green-400"
                  />
                ) : (
                  <span className="font-bold text-white truncate">
                    {user.displayName || user.email}
                  </span>
                )}
              </div>

              <ul className="dropdown-content menu p-3 shadow bg-base-100 rounded-box min-w-52 right-0 absolute z-50">
                <li>
                  {/* 🔹 Allow wrapping long text */}
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
