import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/reducer/authSlice'
import {useDispatch} from "react-redux";
import {authApi} from "../features/auth/service/authService";
import courseReducer from "../features/course/reducer/courseSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        course: courseReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),

})
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;