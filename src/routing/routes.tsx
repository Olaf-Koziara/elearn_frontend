import {Route, RouteObject} from "react-router-dom";
import App from "../App";
import AuthPage from "../features/auth/AuthPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import CoursePage from "../features/course/CoursePage";
import {courseRoutes} from "../features/course/routing/routes";

export const routes: RouteObject[] = [{
    path: "/",
    element: <App/>,
    children: [{
        path: "login",
        element: <AuthPage/>
    }, {
        path: "register",
        element: <AuthPage/>
    },
        {
            path: "",
            element: <ProtectedRoute/>,
            children: [{path: '', element: <DashboardPage/>}, courseRoutes]
        }

    ]
}]