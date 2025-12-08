import { Link, NavLink } from "react-router";
import { IoHome } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { LuLogIn } from "react-icons/lu";
import { SiGnuprivacyguard } from "react-icons/si";
import logo from '../assets/logo.png'
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const {user, loading, logOut} = useContext(AuthContext)
  const menu = (
    <>
      <NavLink
        to="/"
        className="flex justify-center items-center gap-2 hover:shadow-xl/50 rounded-xl px-3 py-2"
      >
        <IoHome />
        <li> Home</li>
      </NavLink>
      <NavLink
        to="/meals"
        className="flex justify-center items-center gap-2 hover:shadow-xl/50 rounded-xl px-3 py-2"
      >
        <GiHotMeal />
        <li>Meals</li>
      </NavLink>
      <Link
        to="/login"
        className="md:hidden flex justify-center items-center gap-2 cursor-pointer font-bold px-3 py-2"
      >
        <LuLogIn />
        <button className="cursor-pointer">Log In</button>
      </Link>
      <Link
        to="/register"
        className="md:hidden flex justify-center items-center gap-2 cursor-pointer font-bold px-3 py-2"
      >
        <SiGnuprivacyguard />
        <button className="cursor-pointer">Register</button>
      </Link>
    </>
  );

  console.log(user);
  
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-5 w-100 border ml-auto p-2 shadow space-y-5"
          >
            {menu}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-3">
          <img src={logo} className="w-8 h-8" alt="" />

          <a className="text-xl font-bold text-primary">
            HomeDish
            <span className="text-neutral-content">-Hub</span>
          </a>
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
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-white rounded-full"
              >
                <div className="w-10 rounded-full">
                  <img alt="user profile" src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>{user.name}</a>
                </li>
                <Link to="/dashboard">
                  <li>Dashboard</li>
                </Link>
                <li>
                  <button onClick={() => logOut()}>Logout</button>
                </li>
              </ul>
            </div>
            <div>
              <ThemeToggle></ThemeToggle>
            </div>
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
