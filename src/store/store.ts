import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import {useDispatch} from "react-redux";
import {authApi} from "../features/auth/authService";
import editorReducer from "../features/editor/reducer/editorSlice";
import editorItemReducer from "../features/editor/reducer/editorItemSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        editor: editorReducer,
        editorItem: editorItemReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),

})
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;