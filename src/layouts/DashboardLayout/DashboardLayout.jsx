import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../providers/AuthProvider";
import { MdLogout } from "react-icons/md";
import ThemeToggle from "../../components/ThemeToggle";

const DashboardLayout = () => {
  const { logOut, dbUser, user, loading } = useContext(AuthContext);

  const adminMenu = (
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
          to="/manageUser"
          className={({ isActive }) =>
            `w-full block px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/50 hover:font-bold
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/50" : "text-gray-300"}`
          }
        >
          Manage User
        </NavLink>
      </li>

      <li>
        <NavLink
          to="manageRequest"
          className={({ isActive }) =>
            `w-full block px-4 py-2 transition text-neutral-content font-semibold hover:bg-base-300 hover:rounded-l-2xl hover:shadow-xl/50 hover:font-bold 
     ${isActive ? "bg-base-300 rounded-l-2xl shadow-xl/50" : "text-gray-300"}`
          }
        >
          Manage Request
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
          Platform Statistics
        </NavLink>
      </li>
    </ul>
  );

  const userMenu = (
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
  );

  console.log(dbUser, user);

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
              {dbUser.role === "admin" && adminMenu}
              {dbUser.role === "user" && userMenu}
            </ul>
          </div>
          <div className="flex justify-center items-center gap-3 md:mb-5">
            <img src={logo} className="w-4 h-4" alt="" />

            <a className="text-lg font-bold text-primary">
              HomeDish
              <span className="text-neutral-content">-Hub</span>
            </a>
          </div>
          <div className="float-end px-2">
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
        {/* SIDEBAR */}
        <div className="hidden md:block lg:block w-64 bg-base-200 border-r border-r-base-100 py-5 min-h-screen relative">
          <div>
            {dbUser.role === "admin" && adminMenu}
            {dbUser.role === "user" || dbUser.role === "chef-pending" && userMenu}
          </div>

          <div className="sticky top-135 z-50 w-full ">
            <button
              className="flex justify-center items-center gap-3 hover:font-bold w-full py-1 bg-base-300 cursor-pointer text-neutral-content font-semibold hover:rounded-l-2xl hover:shadow-xl/50"
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
