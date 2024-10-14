import {Route, RouteObject} from "react-router-dom";
import App from "../App";
import AuthPage from "../features/auth/AuthPage";

export const routes:RouteObject[] = [{
    path:"/",
    element:<App/>,
    children:[{
        path:"login",
        element:<AuthPage/>
    },{
        path:"register",
        element:<AuthPage/>
    },]
}]