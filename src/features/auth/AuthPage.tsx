import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import AuthForm from "./components/AuthForm";


const AuthPage: React.FC = () => {
    const location = useLocation();

    // W zależności od ścieżki ustalamy typ formularza
    const formType = location.pathname === '/register' ? 'register' : 'login';


    return (
        <>
            <AuthForm type={formType}/>
        </>

    );
};

export default AuthPage;
