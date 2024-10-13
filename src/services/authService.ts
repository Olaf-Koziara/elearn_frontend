const API_URL = 'http://localhost:4000'; // URL Twojego API

type AuthResponse = {
    token: string;
    user: {
        id: string;
        email: string;
    };
};

// Rejestracja użytkownika
export const register = async (email: string, password: string, confirmPassword: string,name:string,surname:string): Promise<AuthResponse> => {
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

// Logowanie użytkownika
export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data: AuthResponse = await response.json();
    saveToken(data.token); // Zapisz token w lokalnym magazynie
    return data;
};

// Wylogowanie użytkownika
export const logout = () => {
    localStorage.removeItem('token');
};

// Sprawdzenie, czy użytkownik jest zalogowany
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return token !== null;
};

// Zapisz token w localStorage
const saveToken = (token: string) => {
    localStorage.setItem('token', token);
};

// Pobierz token z localStorage
export const getToken = (): string | null => {
    return localStorage.getItem('token');
};
