import {createSlice} from "@reduxjs/toolkit";
import {CourseModel} from "../models/courseModel";

const initialState: { items: CourseModel[] } = {items: []};
const courseSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {}
})
export default courseSlice.reducer;