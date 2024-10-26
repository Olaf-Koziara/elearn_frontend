import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserModel} from "./userModel";
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:4000'; // URL Twojego API

type AuthResponse = {
    success: boolean
    token: string
    user: UserModel
};
type ErrorResponse = {
    success: boolean;
    error: string;
}
export const registerUser = createAsyncThunk<void, { email: string, password: string, confirmPassword: string, name: string, surname: string }, { rejectValue: string }>('auth/register', async ({
                                                                                                                                                                                                     email,
                                                                                                                                                                                                     password,
                                                                                                                                                                                                     confirmPassword,
                                                                                                                                                                                                     name,
                                                                                                                                                                                                     surname
                                                                                                                                                                                                 }, {rejectWithValue}) => {
    try {
        await fetch(`${API_URL}/user/register`, {
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

    } catch (error: any) {
        // return custom error message from backend if present
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }

})
export const loginUser = createAsyncThunk<AuthResponse, { email: string, password: string }, { rejectValue: ErrorResponse }>('auth/login', async ({
                                                                                                                                                      email,
                                                                                                                                                      password
                                                                                                                                                  }, {rejectWithValue}) => {


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

    })
    if (response.status === 400) {
        return rejectWithValue((await response.json()) as ErrorResponse);
    }
    const data: AuthResponse = (await response.json());
    localStorage.setItem('userToken', data.token);
    return data;


})