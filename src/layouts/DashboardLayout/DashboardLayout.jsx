import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../providers/AuthProvider";
import { MdLogout } from "react-icons/md";
import ThemeToggle from "../../components/ThemeToggle";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineReviews } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { VscRequestChanges } from "react-icons/vsc";
import { SiStatista } from "react-icons/si";
import { IoCreateOutline } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";

const DashboardLayout = () => {
  const { logOut, dbUser, loading } = useContext(AuthContext);

  const adminMenu = (
    <ul className="space-y-3 pl-5 mb-10">
      <li>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold
     ${
       isActive
         ? "bg-base-300 rounded-l-2xl text-neutral-content shadow-xl/30"
         : "text-gray-300"
     }`
          }
        >
          <FaRegUser />
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="manageUsers"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <FaUserPen />
          Manage User
        </NavLink>
      </li>

      <li>
        <NavLink
          to="manageRequest"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <VscRequestChanges />
          Manage Request
        </NavLink>
      </li>

      <li>
        <NavLink
          to="platformStatics"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <SiStatista />
          Platform Statistics
        </NavLink>
      </li>
    </ul>
  );

  const userMenu = (
    <ul className="space-y-3 pl-5 mb-3">
      <li>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold
     ${
       isActive
         ? "bg-base-300 rounded-l-2xl text-neutral-content shadow-xl/30"
         : "text-gray-300"
     }`
          }
        >
          <FaRegUser />
          My Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          to="myOrder"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <FiShoppingCart />
          My Orders
        </NavLink>
      </li>

      <li>
        <NavLink
          to="myReview"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <MdOutlineReviews />
          My Reviews
        </NavLink>
      </li>

      <li>
        <NavLink
          to="FavoriteMeal"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <MdFavoriteBorder />
          Favorite Meals
        </NavLink>
      </li>
    </ul>
  );

  const chefMenu = (
    <ul className="space-y-3 pl-5 mb-3">
      <li>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold
     ${
       isActive
         ? "bg-base-300 rounded-l-2xl text-neutral-content shadow-xl/30"
         : "text-gray-300"
     }`
          }
        >
          <FaRegUser />
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="createMeal"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <IoCreateOutline />
          Create Meal
        </NavLink>
      </li>

      <li>
        <NavLink
          to="myMeal"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <GiHotMeal />
          My Meals
        </NavLink>
      </li>

      <li>
        <NavLink
          to="order"
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/30 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/30" : "text-gray-300"}`
          }
        >
          <CiViewList />
          Oder Requests
        </NavLink>
      </li>
    </ul>
  );

  if (loading && !dbUser) return <p>Loading...</p>;

  return (
    <div className="md:flex lg:flex min-h-screen">
      <div>
        <div className="flex justify-between items-center mb-5 md:mb-0 lg:mb-0 bg-base-200 py-2">
          <div className="dropdown block md:hidden lg:hidden">
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
              <div>
                <div>
                  {(dbUser?.role === "user" && userMenu) ||
                    (dbUser?.role === "chef-pending" && userMenu) ||
                    (dbUser.role === "admin-pending" && userMenu)}
                  {dbUser?.role === "chef" && chefMenu}
                  {dbUser?.role === "admin" && adminMenu}
                </div>

                <div className="sticky top-135 z-50 w-full ">
                  <button
                    className="flex justify-center items-center gap-3 hover:font-bold w-full py-1 bg-base-300 cursor-pointer text-neutral-content font-semibold hover:rounded-l-2xl hover:shadow-xl/30"
                    onClick={async () => await logOut()}
                  >
                    Logout <MdLogout />
                  </button>
                </div>
              </div>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-3 md:mb-5">
            <img src={logo} className="w-4 h-4" alt="" />

            <Link to="/" className="text-lg font-bold text-primary">
              HomeDish
              <span className="text-neutral-content">-Hub</span>
            </Link>
          </div>
          <div className="float-end px-2">
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
        {/* SIDEBAR */}
        <div className="hidden md:block lg:block w-64 bg-base-200 border-r border-r-base-100 py-5 min-h-screen h-full relative">
          <div>
            {(dbUser?.role === "user" && userMenu) ||
              (dbUser?.role === "chef-pending" && userMenu) ||
              (dbUser.role === "admin-pending" && userMenu)}
            {dbUser?.role === "chef" && chefMenu}
            {dbUser?.role === "admin" && adminMenu}
          </div>

          <div className="sticky top-135 z-50 w-full ">
            <button
              className="flex justify-center items-center gap-3 hover:font-bold w-full py-1 bg-base-300 cursor-pointer text-neutral-content font-semibold hover:rounded-l-2xl hover:shadow-xl/30"
              onClick={async () => await logOut()}
            >
              Logout <MdLogout />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 px-2 md:p-8 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
