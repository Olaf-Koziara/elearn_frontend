import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import FormField from "../../../../components/FormField/FormField";
import {Form} from "react-router-dom";
import {CourseModel} from "../../models/courseModel";
import {useSelector} from "react-redux";
import Row from "../../../../components/Row/Row";
import Column from "../../../../components/Column/Column";

const CourseForm = () => {
    const {userInfo} = useSelector((state: any) => state.auth);
    const {register, handleSubmit} = useForm<CourseModel>()

    const onSubmit: SubmitHandler<CourseModel> = (data: CourseModel) => {
        data.author = userInfo.email;
        data.createdAt = new Date().toString();
    }
    return (
        <Row justifyContent="center">
            <Column size={5}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField {...register('title')} >Tytuł</FormField>
                    <FormField {...register('description')}/>
                    <FormField type="file" {...register('thumbnail')} />
                </form>
            </Column>
        </Row>
    )
};

export default CourseForm;