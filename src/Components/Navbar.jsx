import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {

  const navItems = (
    <>
      <li >
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/alltouristsspot">All Tourists Spot</NavLink>
      </li>
      <li>
        <NavLink to="/addtouristsspot">Add Tourists Spot</NavLink>
      </li>
      <li>
        <NavLink to="/mylist">My List </NavLink>
      </li>
    </>
  )
  return (
    <div className=" bg-accent">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src="/src/assets/logo.png" alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
           {navItems}
          </ul>
        </div>

      {/* 
  • The “Login” and “Register” buttons are conditional. 
  • If the user is not logged in, both “Login” and “Register” buttons are shown.
  • Clicking “Login” redirects the user to the Login page.
  • Clicking “Register” redirects the user to the Register page.
*/}
        <div className="navbar-end gap-5">
        
  {/* • If the user is logged in, show the user's photo (photoURL). 
  • Hovering over the photo displays the user's displayName. 
  • Show the “Log out” button for the logged-in user.  */}


          <Link to='/login' className="btn">Login</Link>
          <Link to='/register' className="btn">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
