import {createAsyncThunk} from "@reduxjs/toolkit";
import {CourseModel} from "../models/courseModel";
import {useSelector} from "react-redux";
import {SliceState} from "../../auth/reducer/authSlice";

const API_URL = process.env.REACT_APP_API_URL;
export const uploadFiles = createAsyncThunk<void, File, { rejectValue: string }>('course/upload', async (file, {rejectWithValue}) => {
    try {

        await fetch(`${API_URL}/course/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'file',
                'X-Requested-With': 'XMLHttpRequest'


            },
            body: file
        })
    } catch (error: any) {
        // return custom error message from backend if present
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})
export const createCourse = createAsyncThunk<CourseModel, FormData>('course/create', async (FormData) => {
    const response = await fetch(`${API_URL}/course/create`, {method: 'POST', headers: {}, body: FormData})
    const data = await response.json()
    return data;


})
export const getCourses = createAsyncThunk<CourseModel[]>('course/get', async () => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${API_URL}/course`, {method: 'GET', headers: {Authorization: `Bearer ${token}`}})
    const data = await response.json();
    return data;
})