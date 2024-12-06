import {createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "../actions/authActions";
import {UserModel} from "../model/userModel";

const userToken = localStorage.getItem('userToken');
export type AuthState = { userInfo: UserModel | null, token: string | null, loading: boolean, error: string | undefined | null, success: boolean }
const initialState: AuthState = {
    userInfo: null,
    token: userToken,
    loading: false,
    error: '',
    success: false
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.setItem('userToken', '')
            state.userInfo = null;
            state.token = null;
        },
        setCredentials: (state, {payload}) => {
            state.userInfo = payload
        },
        setToken: (state, {payload}) => {
            state.token = payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(registerUser.pending, (state => {
            state.loading = true;
            state.error = null;
        }))
        builder.addCase(registerUser.fulfilled, (state => {
            state.loading = false;
            state.success = true;
        }))
        builder.addCase(registerUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(loginUser.pending, (state, {payload}) => {
            state.loading = true;
            state.error = null;

        })
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.token = payload.token;
            state.userInfo = payload.user;

        })
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload?.error;

        })
    })

})
export const {logout, setCredentials, setToken} = authSlice.actions;
export default authSlice.reducer;
