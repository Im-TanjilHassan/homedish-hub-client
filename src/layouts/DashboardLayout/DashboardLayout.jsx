import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../providers/AuthProvider";
import { MdLogout } from "react-icons/md";
import ThemeToggle from "../../components/ThemeToggle";

const DashboardLayout = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div className="w-64 bg-base-200 border-r border-r-base-100 py-5 ">
        <div className="float-end px-2">
          <ThemeToggle></ThemeToggle>
        </div>
        <div className="flex justify-center items-center gap-3 mb-5">
          <img src={logo} className="w-4 h-4" alt="" />

          <a className="text-lg font-bold text-primary">
            HomeDish
            <span className="text-neutral-content">-Hub</span>
          </a>
        </div>
        <hr className="mb-5 text-base-100" />
        <ul className="space-y-3 pl-5">
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `w-full block px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/50 hover:font-bold
     ${
       isActive
         ? "bg-base-300 rounded-l-2xl text-neutral-content shadow-xl/50"
         : "text-gray-300"
     }`
              }
            >
              My Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="myOrder"
              className={({ isActive }) =>
                `w-full block px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/50 hover:font-bold
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/50" : "text-gray-300"}`
              }
            >
              My Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="myReview"
              className={({ isActive }) =>
                `w-full block px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/50 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/50" : "text-gray-300"}`
              }
            >
              My Reviews
            </NavLink>
          </li>

          <li>
            <NavLink
              to="FavoriteMeal"
              className={({ isActive }) =>
                `w-full block px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/50 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/50" : "text-gray-300"}`
              }
            >
              Favorite Meals
            </NavLink>
          </li>
        </ul>
        <div className="mt-65">
          <button
            className="flex justify-center items-center gap-3 hover:font-bold w-full py-1 bg-base-300 cursor-pointer text-neutral-content font-semibold hover:rounded-l-2xl hover:shadow-xl/50"
            onClick={() => logOut()}
          >
            Logout <MdLogout />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
