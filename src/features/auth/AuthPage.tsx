import React from 'react';
import {useLocation} from 'react-router-dom';
import AuthForm from "./components/AuthForm";


const AuthPage: React.FC = () => {
    const location = useLocation();
    const formType = location.pathname === '/register' ? 'register' : 'login';
    return (
        <>
            <AuthForm type={formType}/>
        </>

    );
};

export default AuthPage;
