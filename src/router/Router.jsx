import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/mainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Profile from "../pages/DashboardPages/profile/Profile";
import MyOrder from "../pages/DashboardPages/myOrder/MyOrder";
import MyReview from "../pages/DashboardPages/myReview/MyReview";
import FavoriteMeal from "../pages/DashboardPages/fvrtMeal/FavoriteMeal";
import PrivateRoute from "./PrivateRoute";
import ManageRequest from "../pages/DashboardPages/adminDashboard/manageRequest/ManageRequest";
import CreateMeal from "../pages/DashboardPages/CHEF_dashboard/CREATE_Meal/CreateMeal";
import RoleRoute from "./RoleRoute";
import MyMeal from "../pages/DashboardPages/CHEF_dashboard/MY_Meal/MyMeal";
import Order from "../pages/DashboardPages/CHEF_dashboard/ORDER_Requests/Order";
import ManageUser from "../pages/DashboardPages/adminDashboard/manageUser/ManageUser";
import PlatformStatics from "../pages/DashboardPages/adminDashboard/platformStatics/PlatformStatics";
import MealDetails from "../pages/Meals/mealDetails/MealDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/meals/:id",
        element: (
          <PrivateRoute>
            <MealDetails></MealDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Profile,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "myOrder",
        element: (
          <RoleRoute allow={["user"]}>
            <MyOrder></MyOrder>
          </RoleRoute>
        ),
      },
      {
        path: "myReview",
        element: (
          <RoleRoute allow={["user"]}>
            <MyReview></MyReview>
          </RoleRoute>
        ),
      },
      {
        path: "favoriteMeal",
        element: (
          <RoleRoute allow={["user"]}>
            <FavoriteMeal></FavoriteMeal>
          </RoleRoute>
        ),
      },
      // chefs routes
      {
        path: "createMeal",
        element: (
          <RoleRoute allow={["chef"]}>
            <CreateMeal></CreateMeal>
          </RoleRoute>
        ),
      },
      {
        path: "myMeal",
        element: (
          <RoleRoute allow={["chef"]}>
            <MyMeal></MyMeal>
          </RoleRoute>
        ),
      },
      {
        path: "order",
        element: (
          <RoleRoute allow={["chef"]}>
            <Order></Order>
          </RoleRoute>
        ),
      },
      //admin routes
      {
        path: "manageUsers",
        element: (
          <RoleRoute allow={["admin"]}>
            <ManageUser></ManageUser>
          </RoleRoute>
        ),
      },
      {
        path: "manageRequest",
        element: (
          <RoleRoute allow={["admin"]}>
            <ManageRequest></ManageRequest>
          </RoleRoute>
        ),
      },
      {
        path: "platformStatics",
        element: (
          <RoleRoute allow={["admin"]}>
            <PlatformStatics></PlatformStatics>
          </RoleRoute>
        ),
      },
    ],
  },
]);
