import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Signup from "../pages/signUp/SignUp";
import PageNotFound from "../pages/error/PageNotFound";
import Schedules from "../pages/schedules/Schedules";
import Withdraw from "../pages/withdraw/Withdraw";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/schedules",
                element: <Schedules />,
            },
            {
                path: "/withdraw",
                element: <Withdraw />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signUp",
        element: <Signup />,
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

export default router;