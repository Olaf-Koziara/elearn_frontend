import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthState} from "../reducer/authSlice";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
        prepareHeaders: (headers, {getState}) => {

            const token = (getState() as { auth: AuthState }).auth.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query(
            {
                query: (arg: any) => ({
                    url: 'user/profile',
                    method: 'GET',
                }),

            }
        ),

    }),
})
export const {useGetUserDetailsQuery} = authApi;