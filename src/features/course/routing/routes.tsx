import {RouteObject} from "react-router-dom";
import CoursePage from "../CoursePage";
import CourseForm from "../components/CourseForm/CourseForm";
import CourseList from "../components/CourseList/CourseList";

export const courseRoutes: RouteObject = {
    path: 'courses', element: <CoursePage/>,
    children: [{path: '', element: <CourseList/>}, {path: 'edit', element: <CourseForm/>}]
}