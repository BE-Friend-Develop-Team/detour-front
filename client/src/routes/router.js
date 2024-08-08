import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";
import Signup from "../pages/signUp/SignUp";
import PageNotFound from "../pages/error/PageNotFound";
import Schedules from "../pages/schedules/Schedules";
import MyTrip from "../pages/mytrip/MyTrip";
import MyLikeTrip from "../pages/mylike/MyLikeTrip";
import Profiles from "../pages/profile/Profile";
import Withdraw from "../pages/withdraw/Withdraw";
import Trip from "../pages/trip/Trip";
import SchedulesDetail from "../pages/schedules/SchedulesDetail";
import EditSchedules from "../pages/schedules/EditSchedules";
import KakaoCallback from "../pages/login/KakaoCallback";
import Review from "../pages/review/Review";

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
                path: "/mytrip",
                element: <MyTrip />,
            },
            {
                path: "/withdraw",
                element: <Withdraw />,
            },
            {
                path: "/profile",
                element: <Profiles />,
            },
            {
                path: "/trip",
                element: <Trip />,
            },
            {
                path: "/mylike",
                element: <MyLikeTrip />,
            },
            {
                path: "/schedules/:scheduleId",
                element: <SchedulesDetail />,
            },
            {
                path: "/schedules/:scheduleId/edit",
                element: <EditSchedules />,
            },
            {
                path: "/review",
                element: <Review />,
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
    {
        path: "/auth/kakao/callback",
        element: <KakaoCallback />
    }
]);

export default router;