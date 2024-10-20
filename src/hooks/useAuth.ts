import {useState} from "react";

const API_URL = 'http://localhost:4000'; // URL Twojego API

type AuthResponse = {
    token: string;
    user: {
        id: string;
        email: string;
    };
};
export const useAuth = () => {
    const [token, setToken] = useState<string>('');

    const saveToken = (jwtToken: string) => {
        setToken(jwtToken);
        localStorage.setItem('token', token);
    };


    const register = async (email: string, password: string, confirmPassword: string, name: string, surname: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'

            },
            body: JSON.stringify({
                email,
                password,
                confirmPassword,
                name,
                surname
            }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data: AuthResponse = await response.json();

        saveToken(data.token); // Zapisz token w lokalnym magazynie
        return data;
    };
    const login = async (email: string, password: string) => {
        await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
                email,
                password,
            }),

        }).then(async (response) => {
            const data: AuthResponse = await response.json();
            saveToken(data.token); // Zapisz token w lokalnym magazynie
            return {success: true}
        }).catch(err => {
            return {success: false, error: err}
        })


    };
    const isAuthenticated = (): boolean => {
        const token = localStorage.getItem('token');
        return token !== null;
    };
    const getToken = (): string | null => {
        return localStorage.getItem('token');
    };
    const logout = () => {
        localStorage.removeItem('token');
    };
    return {register, login, logout, isAuthenticated}

}
// Rejestracja użytkownika


// Logowanie użytkownika


// Wylogowanie użytkownika


// Sprawdzenie, czy użytkownik jest zalogowany

// Zapisz token w localStorage

// Pobierz token z localStorage
