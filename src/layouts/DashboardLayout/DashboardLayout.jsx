import React from 'react';
import { NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <div className="w-64 bg-gray-100 border-r p-5">
          <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

          <ul className="space-y-3">
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                My Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="myOrder"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                My Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="myReview"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                My Reviews
              </NavLink>
            </li>

            <li>
              <NavLink
                to="FavoriteMeal"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                Favorite Meals
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    );
};

export default DashboardLayout;