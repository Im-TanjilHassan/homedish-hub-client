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

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/meals',
                element: <Meals></Meals>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout ></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                Component: Profile
            },
            {
                path: "profile",
                Component: Profile
            },
            {
                path: "myOrder",
                Component: MyOrder
            },
            {
                path: "myReview",
                Component: MyReview
            },
            {
                path: "favoriteMeal",
                Component: FavoriteMeal
            },
        ]
    }
])