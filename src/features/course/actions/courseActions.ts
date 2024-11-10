import {createAsyncThunk} from "@reduxjs/toolkit";
import {CourseModel} from "../models/courseModel";

const API_URL = 'http://localhost:4000';
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
export const createCourse = createAsyncThunk<void, FormData>('course/create', async (FormData) => {
    const response = fetch(`${API_URL}/course/create`, {method: 'POST', headers: {}, body: FormData})


})