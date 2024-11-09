import {CourseSlideModel} from "./courseSlideModel";

export interface CourseModel {
    _id?: string;
    title: string;
    description: string;
    thumbnail?: string;
    author: string;
    createdAt: string;
    slides: CourseSlideModel[],


}