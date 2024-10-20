import {createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "./authActions";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {token: '', loading: false, error: <string | undefined | null>'', success: false},
    reducers: {},
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
        })
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload?.error;

        })
    })

})

export default authSlice.reducer;
