import {createSlice} from "@reduxjs/toolkit";
import {CourseModel} from "../models/courseModel";
import {
    createCourse,
    deleteCourseById,
    getCourseById,
    getCourses,
    saveCourse,
    uploadFilesWithIds
} from "../actions/courseActions";
import {uid} from "uid";

export interface CourseState {
    items: CourseModel[],
    courseInEdit: CourseModel | null;
    slideInEditIndex: number;
    loading: boolean
}

const initialState: CourseState = {items: [], loading: true, courseInEdit: null, slideInEditIndex: 0};
const courseSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
        updateSlide: (state, {payload}) => {

            if (state.courseInEdit) {
                const updatedSlideArray = state.courseInEdit.slides.map((slide) => {
                    if (slide.uid === payload.slide.uid) {
                        return payload.slide
                    }
                    return slide

                });
                state.courseInEdit.slides = updatedSlideArray;

            }


        },
        setSlideInEditIndex: (state, {payload}) => {
            if (state.courseInEdit) {
                state.slideInEditIndex = payload
            }
        },
        updateSlideElementProperties: (state, {payload}: { payload: { uid: string, properties: {} } }) => {
            if (state.courseInEdit) {
                state.courseInEdit.slides = state.courseInEdit.slides.map((slide, index) => {
                    if (index === state.slideInEditIndex) {
                        slide.elements = slide.elements.map(element => {
                            if (element.uid === payload.uid) {
                                return {...element, ...payload.properties}
                            }
                            return element
                        })
                        return slide;
                    }
                    return slide;
                })
            }
        },


        addSlide: (state) => {
            if (state.courseInEdit) {
                const slide = {uid: uid(), title: '', elements: [], duration: 400};
                state.courseInEdit.slides = [...state.courseInEdit.slides, slide]
            }
        },
        addElementToSlide: (state, {payload}) => {
            if (state.courseInEdit) {
                state.courseInEdit.slides = state.courseInEdit.slides.map((slide, index) => index === state.slideInEditIndex ? {
                    ...slide,
                    elements: [...slide.elements, payload],
                } : slide)
            }
        },
        clearCourseInEdit: (state) => {
            state.courseInEdit = null;
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
        builder.addCase(getCourseById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getCourseById.fulfilled, (state, {payload}) => {
            state.courseInEdit = payload;
            state.items = state.items.map(item => item._id === payload._id ? payload : item);
            state.loading = false;

        })
        builder.addCase(deleteCourseById.fulfilled, (state, {payload}) => {

        })
        builder.addCase(saveCourse.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(saveCourse.fulfilled, (state, {payload}) => {
            state.loading = false;
        })
    })
})
export const {
    addSlide,
    addElementToSlide,
    clearCourseInEdit,
    updateSlideElementProperties,
    setSlideInEditIndex
} = courseSlice.actions;
export default courseSlice.reducer;