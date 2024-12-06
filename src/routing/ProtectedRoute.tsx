import React, {ReactNode, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {AuthState} from "../features/auth/reducer/authSlice";

const ProtectedRoute = () => {
    const {userInfo} = useSelector((state: { auth: AuthState }) => state.auth)

    return (userInfo != null ? <Outlet></Outlet> : <Navigate to={'/login'}/>)

}
export default ProtectedRoute;