import {createAsyncThunk} from "@reduxjs/toolkit";
import {CourseModel} from "../models/courseModel";
import {useSelector} from "react-redux";
import {SliceState} from "../../auth/reducer/authSlice";
import {CourseSlideElementImageModel, CourseSlideModel} from "../models/courseSlideModel";
import slideElement from "../components/CourseEditor/components/SlideElement/SlideElement";


const API_URL = process.env.REACT_APP_API_URL;

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


const uploadFiles = async (files: UploadFile[]) => {
    try {
        const formData = new FormData();

        files.forEach(({file, id}) => {
            formData.append(`file-${id}`, file);
        });

        const response = await fetch(`${API_URL}/course/files/upload`, {
            method: 'POST',
            body: formData
        });


        const result = await response.json();


        return result.files.map((file: { id: string; path: string }) => ({
            id: file.id,
            url: file.path
        }));
    } catch (error) {

    }
}
export const saveCourse = async (courseData: CourseModel): Promise<void> => {
    const filesToUpload: UploadFile[] = [];
    let courseDataTemp: CourseModel = {...courseData}
    for (const slide of courseData.slides) {
        for (const element of slide.elements) {
            if (element.type === 'image') {
                const imageElement = element as CourseSlideElementImageModel;
                if (imageElement.url.startsWith('blob:')) { // Sprawdzenie, czy to lokalny plik
                    filesToUpload.push({
                        id: imageElement.uid,
                        file: new File(
                            [await fetch(imageElement.url).then(res => res.blob())],
                            `image-${imageElement.uid}.png`
                        ),
                    });
                }
            }
        }
    }
    const uploadedFiles = filesToUpload.length > 0 ? await uploadFiles(filesToUpload) : [];
    uploadedFiles.forEach(({id, url}: { id: string, url: string }) => {
        courseDataTemp.slides = courseDataTemp.slides.map(slide => {
            const slideCopy = {...slide}
            slideCopy.elements = slideCopy.elements.map(element => {
                let elementCopy = {...element}
                if (element.type === 'image' && element.uid === id) {
                    (elementCopy as CourseSlideElementImageModel).url = url;
                }
                return elementCopy;
            });
            return slideCopy;
        });
    });
    const response = await fetch(`${API_URL}/course`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
        body: JSON.stringify(courseDataTemp),
    });
}


export const updateSlide = async (slideData: CourseSlideModel, courseId: string): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}/course/slide`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify({courseId, slideData})
        });
        return response;
    } catch (error) {

    }
}

export interface UploadFile {
    file: File;
    id: string;
}

export interface FileUploadResponse {
    id: string;
    url: string;
}

export const uploadFilesWithIds = createAsyncThunk<FileUploadResponse[],
    UploadFile[]>(
    'course/files/upload',  // Nazwa akcji
    async (files, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            files.forEach(({file, id}) => {
                formData.append(`file-${id}`, file);
            });

            const response = await fetch(`${API_URL}/course/files/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                return rejectWithValue('Failed to upload files');
            }

            const result = await response.json();


            return result.files.map((file: { id: string; path: string }) => ({
                id: file.id,
                url: file.path
            }));
        } catch (error) {
            return rejectWithValue('An error occurred while uploading files');
        }
    }
);