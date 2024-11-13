import {createSlice} from "@reduxjs/toolkit";
import {CourseModel} from "../models/courseModel";
import {createCourse, getCourses, uploadFilesWithIds} from "../actions/courseActions";
import {CourseSlideModel} from "../models/courseSlideModel";

export interface CourseState {
    items: CourseModel[],
    loading: boolean
}

const initialState: CourseState = {items: [], loading: false};
const courseSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
        updateSlide: (state, {payload}) => {
            console.log('slide update')
            const courseIndex = state.items.findIndex(item => item._id === payload.courseId);
            if (state.items[courseIndex]) {
                state.items[courseIndex].slides = state.items[courseIndex].slides.map((slide) => {
                    if (slide.uid === payload.slide.uid) {
                        return payload.slide
                    } else {
                        return slide
                    }
                })
            }
        },
        addSlide: (state, {payload}) => {
            const courseIndex = state.items.findIndex(item => item._id === payload.courseId);
            state.items[courseIndex].slides = [...state.items[courseIndex].slides, payload.slide]
        }
    },
    extraReducers: (builder => {
        builder.addCase(createCourse.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createCourse.fulfilled, (state, {payload}) => {
            state.loading = false;
        })
        builder.addCase(getCourses.fulfilled, (state, {payload}) => {
            state.items = payload;
        })
        builder.addCase(uploadFilesWithIds.fulfilled, (state, {payload}) => {

        })
    })
})
export const {addSlide, updateSlide} = courseSlice.actions;
export default courseSlice.reducer;