import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/mainLayout/MainLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            
        ]
    }
])