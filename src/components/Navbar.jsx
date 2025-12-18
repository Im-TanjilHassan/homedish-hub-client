import { Link, NavLink } from "react-router";
import { IoHome } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { LuLogIn } from "react-icons/lu";
import { SiGnuprivacyguard } from "react-icons/si";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "./ThemeToggle";
import { BiSolidDashboard } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { SiCodechef } from "react-icons/si";



const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setLocked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const menu = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex justify-center items-center gap-2 text-neutral-content font-semibold hover:shadow-xl/50 rounded-xl px-3 py-2 ${
            isActive
              ? "rounded-l-2xl text-neutral-content shadow-xl/50"
              : "text-gray-300"
          }`
        }
      >
        <IoHome />
        <li> Home</li>
      </NavLink>
      <NavLink
        to="/meals"
        className={({ isActive }) =>
          `flex justify-center items-center gap-2 text-neutral-content hover:shadow-xl/50 rounded-xl px-3 py-2 ${
            isActive
              ? "rounded-l-2xl text-neutral-content shadow-xl/50"
              : "text-gray-300"
          }`
        }
      >
        <GiHotMeal />
        <li>Meals</li>
      </NavLink>
      <Link
        to="/login"
        hidden={user}
        className="md:hidden flex justify-center items-center gap-2 cursor-pointer font-bold px-3 py-2"
      >
        <LuLogIn />
        <button className="cursor-pointer">Log In</button>
      </Link>
      <Link
        to="/register"
        hidden={user}
        className="md:hidden flex justify-center items-center gap-2 cursor-pointer font-bold px-3 py-2"
      >
        <SiGnuprivacyguard />
        <button className="cursor-pointer">Register</button>
      </Link>
    </>
  );
  
  return (
    <div className="lg:w-7xl mx-auto navbar bg-base-100 lg:mt-6 rounded-4xl shadow-xl/30 lg:px-6 mb-10">
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
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-5 w-100 ml-auto p-2 shadow space-y-5 bg-base-200"
          >
            {menu}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-3">
          <SiCodechef className="text-2xl"/>

          <Link
            to="/"
            className="text-xl font-bold text-primary cursor-pointer"
          >
            HomeDish
            <span className="text-neutral-content">-Hub</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">{menu}</ul>
      </div>
      <div className="navbar-end">
        {loading && (
          <span className="loading loading-spinner text-error"></span>
        )}
        {!loading && user && (
          <div className="flex justify-center items-center gap-5">
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => !locked && setOpen(true)}
              onMouseLeave={() => !locked && setOpen(false)}
            >
              {/* Avatar */}
              <button
                onClick={() => {
                  setOpen(true);
                  setLocked(true);
                }}
                className="btn btn-ghost btn-circle avatar border border-white rounded-full"
              >
                <div className="w-10 rounded-full">
                  <img alt="user profile" src={user.photoURL} />
                </div>
              </button>

              {/* Dropdown */}
              {open && (
                <ul className="absolute right-0 w-52 bg-base-200 rounded-box p-2 space-y-3 shadow z-50">
                  <li className="bg-base-300 py-2 px-2 text-center rounded">
                    Hi, {user.displayName}
                  </li>

                  <li>
                    <Link
                      to="/dashboard"
                      className="flex justify-center items-center gap-2 hover:bg-base-300 py-2 rounded"
                      onClick={() => {
                        setOpen(false);
                        setLocked(false);
                      }}
                    >
                      <BiSolidDashboard />
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={async () => {
                        await logOut();
                        setOpen(false);
                        setLocked(false);
                      }}
                      className="w-full font-bold hover:bg-base-300 flex justify-center items-center gap-2 py-2 rounded"
                    >
                      Logout
                      <MdLogout />
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <ThemeToggle />
          </div>
        )}
        {!loading && !user && (
          <div className="space-x-7 px-14 h-13 lg:flex justify-center items-center rounded-full hidden">
            <Link
              to="/login"
              className="flex justify-center items-center gap-2 transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-100 cursor-pointer font-bold"
            >
              <button className="cursor-pointer">Log In</button>
              <LuLogIn />
            </Link>
            <Link
              to="/register"
              className="flex justify-center items-center gap-2 transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-100 cursor-pointer font-bold "
            >
              <button className="cursor-pointer">Register</button>
              <SiGnuprivacyguard />
            </Link>
            <ThemeToggle></ThemeToggle>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
