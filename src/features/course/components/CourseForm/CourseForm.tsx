import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import FormField from "../../../../components/FormField/FormField";
import {CourseModel} from "../../models/courseModel";
import {useSelector} from "react-redux";
import Row from "../../../../components/Row/Row";
import Column from "../../../../components/Column/Column";
import Button from "../../../../components/Button/Button";
import {createCourse,} from "../../actions/courseActions";
import {useAppDispatch} from "../../../../store/store";


const CourseForm = () => {
    const {userInfo} = useSelector((state: any) => state.auth);
    const {register, handleSubmit} = useForm<CourseModel>()
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<CourseModel> = async (data: CourseModel) => {
        console.log('create course')
        data.author = userInfo.email;
        data.createdAt = new Date().toString();
        const formData = new FormData();
        formData.append('author', data.author);
        formData.append('createdAt', data.createdAt)
        formData.append('title', data.title)
        formData.append('description', data.description)
        if (data.thumbnail) {
            formData.append('thumbnail', data.thumbnail[0])
        }
        dispatch(createCourse(formData))


    }
    return (
        <Row padding="t4" justifyContent="center">
            <Column size={5}>
                <h2>Course</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField {...register('title')} placeholder="Title"/>
                    <FormField {...register('description')} type="textarea" placeholder="Description"/>
                    <FormField type="file" {...register('thumbnail')} placeholder="Select thumbnail"/>
                    <Button type="submit">Save</Button>
                </form>
            </Column>
        </Row>
    )
};

export default CourseForm;