import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Signup from "../pages/signUp/SignUp";
import PageNotFound from "../pages/error/PageNotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Main />,
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
